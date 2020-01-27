import React, { ReactElement } from "react";
import { Container } from "@material-ui/core";
import CartHeader from "./CartHeader";

interface Props {}

export default function Cart({}: Props): ReactElement {
  return (
    <Container maxWidth="xs">
      <CartHeader customerName={"조아라"} />
    </Container>
  );
}
