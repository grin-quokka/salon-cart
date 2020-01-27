import React, { ReactElement } from "react";
import { Container, Paper } from "@material-ui/core";
import CartHeader from "./CartHeader";
import AddBtnGroup from "./AddBtnGroup";
import CartList from "./CartList";

interface Props {}

export default function Cart({}: Props): ReactElement {
  return (
    <Container maxWidth="xs">
      <Paper elevation={3}>
        <CartHeader customerName={"조아라"} />
        <AddBtnGroup />
        <CartList />
      </Paper>
    </Container>
  );
}
