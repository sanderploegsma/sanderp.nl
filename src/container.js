/** @jsx jsx */
import { jsx } from "theme-ui";

const Container = ({ sx, ...props }) => (
  <div
    {...props}
    sx={{
      ...sx,
      mx: "auto",
      maxWidth: 800,
    }}
  />
);

export default Container;
