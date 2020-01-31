import React, { ReactElement } from "react";
import { Container, Paper } from "@material-ui/core";
import CartHeader from "./CartHeader";
import AddBtnGroup from "./AddBtnGroup";
import CartList, { calDiscounts } from "./CartList";
import Sum from "./Sum";
import { AppState, AppFnc } from "../interface";
interface Props {
  selectItem: AppState["selectItem"];
  hadleItemEdit: AppFnc["hadleItemEdit"];
  handleItemRemove: AppFnc["handleItemRemove"];
  selectDiscount: AppState["selectDiscount"];
  handleDisEdit: AppFnc["handleDisEdit"];
  handleDisRemove: AppFnc["handleDisRemove"];
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
