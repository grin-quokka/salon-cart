import React, { ReactElement } from "react";
import { Container, Paper } from "@material-ui/core";
import CartHeader from "./CartHeader";
import AddBtnGroup from "./AddBtnGroup";
import CartList, { calDiscounts } from "./CartList";
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
  handleDisEdit: (
    disKey: string,
    discountsObj: { name: string; rate: number; items: string[] }
  ) => void;
  handleDisRemove: (disKey: string) => void;
  currency: string | undefined;
}

export default function Cart({
  selectItem,
  hadleItemEdit,
  handleItemRemove,
  selectDiscount,
  handleDisEdit,
  handleDisRemove,
  currency
}: Props): ReactElement {
  const calSum = () => {
    let sum = 0;
    selectItem.forEach(ele => {
      sum += Object.values(ele)[0].count * Object.values(ele)[0].price;
    });
    selectDiscount.forEach(ele => {
      sum -= calDiscounts(
        Object.values(ele)[0].rate,
        Object.values(ele)[0].items,
        selectItem
      );
    });

    return sum;
  };

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
          handleDisEdit={handleDisEdit}
          handleDisRemove={handleDisRemove}
        />
        <Sum calSum={calSum()} currency={currency} />
      </Paper>
    </Container>
  );
}
