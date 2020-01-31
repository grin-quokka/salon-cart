import React, { ReactElement } from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
interface Props {
  customerName: string;
}

export default function CartHeader({ customerName }: Props): ReactElement {
  return (
    <AppBar position="static" style={{ backgroundColor: "#9b86ee" }}>
      <Toolbar>
        <Typography variant="h6">{customerName}</Typography>
      </Toolbar>
    </AppBar>
  );
}
