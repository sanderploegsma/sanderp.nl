import React from "react";
import CodeBlock from "@theme-ui/prism";
import Prism from "prismjs/components/prism-core";

import "prismjs/components/prism-bash";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-fsharp";
import "prismjs/components/prism-go";
import "prismjs/components/prism-java";
import "prismjs/components/prism-yaml";

import Link from "../link";

export default {
  pre: (props) => props.children,
  code: (props) => <CodeBlock {...props} Prism={Prism} />,
  a: Link,
};
