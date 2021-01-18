/** @jsx jsx */
import { useRef, useEffect } from "react";
import { jsx, useColorMode } from "theme-ui";

export default (props) => {
  const [colorMode] = useColorMode();
  const commentBox = useRef();

  useEffect(() => {
    const theme = colorMode === "default" ? "github-light" : "github-dark";
    const scriptEl = document.createElement("script");
    scriptEl.setAttribute("src", "https://utteranc.es/client.js");
    scriptEl.setAttribute("crossorigin", "anonymous");
    scriptEl.setAttribute("async", true);
    scriptEl.setAttribute("repo", "sanderploegsma/sanderp.nl");
    scriptEl.setAttribute("issue-term", "pathname");
    scriptEl.setAttribute("theme", theme);
    commentBox.current.appendChild(scriptEl);

    return () => {
      commentBox.current.removeChild(commentBox.current.firstChild);
    };
  }, [commentBox, colorMode]);

  return <div {...props} ref={commentBox} />;
};
