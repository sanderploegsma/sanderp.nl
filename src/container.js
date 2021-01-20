/** @jsx jsx */
import { jsx } from "theme-ui";

const Container = ({ sx, ...props }) => (
  <div
    {...props}
    sx={{
      ...sx,
      mx: "auto",
      px: [2, 3],
      maxWidth: [800, 960],
    }}
  />
);

export default Container;
