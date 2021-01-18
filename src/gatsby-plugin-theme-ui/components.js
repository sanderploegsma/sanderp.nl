import Prism from "@theme-ui/prism";
import Link from "../link";

export default {
  pre: (props) => props.children,
  code: Prism,
  a: Link,
};
