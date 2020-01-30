import React, { ReactElement } from "react";
import { Container, Paper } from "@material-ui/core";
import CartHeader from "./CartHeader";
import AddBtnGroup from "./AddBtnGroup";
import CartList from "./CartList";
import Sum from "./Sum";

interface Props {
  selectItem: {
    [itemKey: string]: { count: number; name: string; price: number };
  }[];
  hadleItemEdit: (itemKey: string, count: number) => void;
  handleItemRemove: (itemKey: string) => void;
  selectDiscount: {
    [discountKey: string]: { name: string; rate: number; items: string[] };
  }[];
  menu: {
    items: {
      [itemKey: string]: { count: number; name: string; price: number };
    };
    discounts: { [discountKey: string]: { name: string; rate: number } };
    currency_code: "string";
  } | null;
}

export default function Cart({
  selectItem,
  hadleItemEdit,
  handleItemRemove,
  selectDiscount,
  menu
}: Props): ReactElement {
  return (
    <Container maxWidth="xs">
      <Paper elevation={3}>
        <CartHeader customerName={"조아라"} />
        <AddBtnGroup />
        <CartList
          selectItem={selectItem}
          hadleItemEdit={hadleItemEdit}
          handleItemRemove={handleItemRemove}
          selectDiscount={selectDiscount}
          menu={menu}
        />
        <Sum calSum={183000} />
      </Paper>
    </Container>
  );
}
