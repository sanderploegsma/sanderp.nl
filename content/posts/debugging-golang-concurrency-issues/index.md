+++
author = "Sander Ploegsma"
date = 2017-09-14T08:00:00Z
aliases = ["/debugging-golang-concurrency-issues-c979c588f9ea"]
description = "Today I Learned: Go has a built-in \"race detector\" which helps you catch race conditions in production code. The Go toolchain really is awesome!"
tags = ["Software Engineering"]
title = "Debugging Go concurrency issues"

+++

{{< image src="gopher.png" position="center" >}}

Recently I’ve been working on a Go application that uses Google Cloud Pub/Sub to migrate large amounts of Google Cloud Datastore entities efficiently and resiliently. Basically, a master process queries entities and publishes them to a Pub/Sub topic, ready to be consumed by multiple workers.

To make sure the Pub/Sub topic and subscription are cleaned up afterwards, I made sure the master waits until all entities are processed before cleaning up and exiting. The following snippet contains the code I used to do just that.

```go
// waitUntilQueueEmpty subscribes on the queue and returns when no messages arrive for more than 5 seconds
// all received messages are not acknowledged in order to return them to the queue so that workers can process them
func (m *master) waitUntilQueueEmpty(ctx context.Context, sub *pubsub.Subscription) error {
    var mu sync.Mutex
    lastMessageTimestamp := time.Now()
    // Use cancellable context for the subscription
    ctx, cancelSubscribe := context.WithCancel(ctx)
    // Check if the last message was received more than 5 seconds ago. If so, cancel the subscription context
    go func() {
        for {
            if lastMessageTimestamp.Add(5 * time.Second).Before(time.Now()) {
                cancelSubscribe()
                break
            }
            time.Sleep(1 * time.Second)
        }
    }()
    log.Println("Waiting for queue to become empty")
    return sub.Receive(ctx, func(ctx context2.Context, msg *pubsub.Message) {
        mu.Lock()
        defer mu.Unlock()
        lastMessageTimestamp = time.Now()
        msg.Nack()
    })
}
```

This all worked great, the master process ran for as long as it took the workers to process all entities, after which it exited with everything cleaned up nicely. Or so I thought.

While writing my integration tests that run the entire process against the Datastore and Pub/Sub emulators I noticed that sometimes not all entities were processed correctly. Me being suspicious, I tried running the tests using the `-race` flag, which gave me the following output (I removed the file paths for brevity and possible NDA-ness):

    ❯ go test -v -race ./...
    [...]
    WARNING: DATA RACE
    Write at 0x00c420160d40 by goroutine 189:
    app/migration.(*master).waitUntilQueueEmpty.func2()
    app/vendor/cloud.google.com/go/pubsub.(*Subscription).receive.func2()
    Previous read at 0x00c420160d40 by goroutine 184:
    app/migration.(*master).waitUntilQueueEmpty.func1()
    Goroutine 189 (running) created at:
    app/vendor/cloud.google.com/go/pubsub.(*Subscription).receive()
    app/vendor/cloud.google.com/go/pubsub.(*Subscription).Receive.func2()
    app/vendor/golang.org/x/sync/errgroup.(*Group).Go.func1()
    Goroutine 184 (running) created at:
    app/migration.(*master).waitUntilQueueEmpty()
    app/migration.(*master).Run()
    ==================
    --- FAIL: TestMigration (20.56s)
    testing.go:699: race detected during execution of test
    FAIL
    FAIL app/test 20.607s

Looking at the code I realized that I made the exact same mistake they showed in Go's own [blog post on race detection](https://blog.golang.org/race-detector): I was reading and writing the `lastMessageTimestamp` in two different goroutines. Luckily for me, the fix used in the blog post was just as usable for me. Using the code below the race detector was happy and my random failures disappeared.

```go
// waitUntilQueueEmpty subscribes on the queue and returns when no messages arrive for more than 5 seconds
// all received messages are not acknowledged in order to return them to the queue so that workers can process them
func (m *master) waitUntilQueueEmpty(ctx context.Context, sub *pubsub.Subscription) error {
    // Use cancellable context for the subscription
    ctx, cancelSubscribe := context.WithCancel(ctx)
    messageReceived := make(chan bool)
    go func() {
        // keep checking if we received a message in the last 5 seconds
        // if not, cancel the subscription
        for {
            select {
            case <-messageReceived:
                continue
            case <-time.After(5 * time.Second):
                cancelSubscribe()
                break
            }
        }
    }()

    log.Println("Waiting for queue to become empty")
    return sub.Receive(ctx, func(ctx context2.Context, msg *pubsub.Message) {
        messageReceived <- true
        msg.Nack()
    })
}
```

So if you haven’t already, just try running your app or tests using the `-race` flag. Who knows, you might find that nasty bug you’ve been debugging for days!

This post was originally [published on Medium](https://medium.com/@sanderp91/debugging-golang-concurrency-issues-c979c588f9ea).
