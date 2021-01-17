import React from "react";
import { Box } from "rebass";

const Container = (props) => (
  <Box
    {...props}
    sx={{
      maxWidth: 800,
      mx: "auto",
    }}
  />
);

export default Container;
