---
title: Running Redis Cluster on Kubernetes
date: "2017-05-30"
description: "If a single-node Redis is not enough for your scaling needs, consider using Redis Cluster. Note: this guide is probably outdated."
tags:
  - Software Engineering
aliases:
  - /running-redis-cluster-on-kubernetes-e451bda76cad
---

{{< alert >}}
**Note**: This guide is probably outdated.
{{< /alert >}}

After successfully running a single Redis GCE instance to manage our inter-service communication for a couple of years, we finally started to run into scaling issues. To solve these, we started working out a way to reliably run a set of Redis instances as a cluster in our Kubernetes cluster.

![An applicable meme](yo-dawg.jpeg)

As you may or may not know, Redis Cluster is a set of Redis instances working together to make your data storage scale across nodes while also making it a bit more resilient. Data is automatically split across nodes and it supports a master/slave setup for increased availability in case of a failure. For more information, [check their excellent tutorial](https://redis.io/topics/cluster-tutorial).

Getting Redis Cluster to work in Kubernetes can become a bit cumbersome, though, as each Redis instance relies on a configuration file that keeps track of other cluster instances and their roles. This means that instances have a certain amount of state, which does not fit easily into the stateless paradigm of Kubernetes pods. Luckily, a combination of Kubernetes’ [StatefulSets](https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/) and [PersistentVolumes](https://kubernetes.io/docs/concepts/storage/persistent-volumes/) gets us a long way.

## Kubernetes setup

Initially, we set up a group of individual Redis servers in cluster mode using a StatefulSet, each configured to receive their own PersistentVolumeClaim. These claims are automatically provisioned through a `volumeClaimTemplate` , and will be forever linked to that specific instance of the Redis cluster. So, should one or more instances crash, be moved or even removed during scale operations, when they come back they will still be part of the cluster and will update automatically.

```yaml
apiVersion: apps/v1beta1
kind: StatefulSet
metadata:
  name: redis-cluster
  labels:
    app: redis-cluster
spec:
  serviceName: redis-cluster
  replicas: 6
  selector:
    matchLabels:
      app: redis-cluster
  template:
    metadata:
      labels:
        app: redis-cluster
    spec:
      containers:
        - name: redis-cluster
          image: redis:5.0-rc
          ports:
            - containerPort: 6379
              name: client
            - containerPort: 16379
              name: gossip
          command: ["/conf/fix-ip.sh", "redis-server", "/conf/redis.conf"]
          readinessProbe:
            exec:
              command:
                - sh
                - -c
                - "redis-cli -h $(hostname) ping"
            initialDelaySeconds: 15
            timeoutSeconds: 5
          livenessProbe:
            exec:
              command:
                - sh
                - -c
                - "redis-cli -h $(hostname) ping"
            initialDelaySeconds: 20
            periodSeconds: 3
          volumeMounts:
            - name: conf
              mountPath: /conf
              readOnly: false
            - name: data
              mountPath: /data
              readOnly: false
      volumes:
        - name: conf
          configMap:
            name: redis-cluster
            defaultMode: 0755
  volumeClaimTemplates:
    - metadata:
        name: data
        labels:
          name: redis-cluster
      spec:
        accessModes: ["ReadWriteOnce"]
        resources:
          requests:
            storage: 100Mi
```

Note that we use the built-in `redis-cli` tool for our health- and readiness probes to make sure our pods are working as intended. Kubernetes also wants us to define a `serviceName` to bind to, which makes it a lot easier for cluster-friendly Redis clients to connect to our cluster: since they only need a single node for the discovery, they can just use the Kubernetes service name as host!

In order to [fix a known bug in Redis](https://github.com/antirez/redis/issues/4645), we also include the following entry point script that fixes its own IP address in the local `nodes.conf`, which is needed for the cluster to remain stable in case a Pod is rescheduled:

```bash
#!/bin/sh
CLUSTER_CONFIG="/data/nodes.conf"
if [ -f ${CLUSTER_CONFIG} ]; then
    if [ -z "${POD_IP}" ]; then
        echo "Unable to determine Pod IP address!"
        exit 1
    fi
    echo "Updating my IP to ${POD_IP} in ${CLUSTER_CONFIG}"
    sed -i.bak -e '/myself/ s/[0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}/${POD_IP}/' ${CLUSTER_CONFIG}
fi
exec "$@"
```

## Redis setup

Configuration of the Redis cluster is also done through the `redis-cli`, which helps you set up the cluster, as well as manage which instances contain which slots. This makes creating a cluster from a group of Redis instances as easy as this oneliner:

```bash
kubectl exec -it redis-cluster-0 -- redis-cli --cluster create --cluster-replicas 1 \
$(kubectl get pods -l app=redis-cluster -o jsonpath='{range.items[*]}{.status.podIP}:6379 ')
```

Since we created the StatefulSet with 6 replicas, this command will create a cluster with 3 master and 3 slave nodes due to the `--cluster-replicas 1` flag. After that, the cluster pretty much manages itself. Should one of the master pods fail, its replicated slave node will automatically be appointed as a new master node, making sure no data is lost. When the failing pod comes back, it will automatically replicate the newly appointed master and run in slave mode.

The only thing that has to be done manually is scaling up and down, because new pods will not automatically join the cluster (and even if they did, there is no way (yet) to auto-balance the cluster, so new pods will not receive any shards anyway). These steps are documented [in the example](https://github.com/sanderploegsma/redis-cluster#adding-nodes).

## Notes

- If you would like to try this for yourself, you can check out the full [example on GitHub](https://github.com/sanderploegsma/redis-cluster), which you can run using the excellent [minikube](https://kubernetes.io/docs/getting-started-guides/minikube/) platform or by starting a Kubernetes cluster in the newer versions of Docker for Mac/Windows.
- Although this setup works great if you just store values, you will run into scaling issues as soon as you start using Redis PubSub. This is because PubSub channels are not hashed the way normal keys are, but _every message is automatically published to every node_. There is some [discussion](https://github.com/antirez/redis/issues/2672) going on about this and it might be solved in [Redis 4.0](https://github.com/antirez/redis/pull/3381), but until then there is no good way of combining PubSub with Redis Cluster if you have a lot of messages going through.
- Update (2018–08–22): as some people pointed out in the comments, the cluster breaks when one of the nodes is restarted and gets a new IP address assigned. I updated the post with a script that should fix this.
- Update (2018–08–22): [@riaan53](https://github.com/riaan53) pointed out that the cluster commands previously handled by `redis-trib` will become part of the official `redis-cli` in Redis 5.0. I updated the example to use the latest 5.0 RC instead of a custom image.

This post was originally [published on Medium](https://medium.com/@sanderp91/running-redis-cluster-on-kubernetes-e451bda76cad).
