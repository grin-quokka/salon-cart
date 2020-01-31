import React, { ReactElement } from "react";
import {
  ListItem,
  ListItemText,
  Typography,
  createStyles,
  Theme,
  makeStyles,
  List
} from "@material-ui/core";
import DiscountDialog from "./DiscountDialog";
import { numberComma } from "./Sum";
import { AppState, AppFnc } from "../interface";
import CartListItem from "./CartListItem";

interface Props {
  selectItem: AppState["selectItem"];
  hadleItemEdit: AppFnc["hadleItemEdit"];
  handleItemRemove: AppFnc["handleItemRemove"];
  selectDiscount: AppState["selectDiscount"];
  handleDisEdit: AppFnc["handleDisEdit"];
  handleDisRemove: AppFnc["handleDisRemove"];
}

export const findItem = (iKey: string, selectItem: Props["selectItem"]) => {
  let itemObj = { count: 0, name: "", price: 0 };
  selectItem.some(ele => {
    itemObj = Object.values(ele)[0];
    return Object.keys(ele)[0] === iKey;
  });

  return itemObj;
};

export const calDiscounts = (
  rate: number,
  dicountsItems: string[],
  selectItem: Props["selectItem"]
) => {
  let sum = 0;
  dicountsItems.forEach(ele => {
    sum +=
      findItem(ele, selectItem).count * findItem(ele, selectItem).price * rate;
  });
  return Math.round(sum);
};

const listStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      backgroundColor: theme.palette.background.paper,
      position: "relative",
      overflow: "auto",
      height: 500,
      padding: 0
    },
    listItem: {
      display: "flex",
      justifyContent: "space-between"
    },
    itemText: {
      maxWidth: "70%"
    },
    selectItem: {
      display: "flex",
      justifyContent: "center"
    }
  })
);

export default function CartList({
  selectItem,
  hadleItemEdit,
  handleItemRemove,
  selectDiscount,
  handleDisEdit,
  handleDisRemove
}: Props): ReactElement {
  const classes = listStyles();

  return (
    <List className={classes.root}>
      {selectItem.map((ele, index) => {
        const itemKey = Object.keys(ele)[0];
        const values = Object.values(ele)[0];

        return (
          <CartListItem
            index={index}
            itemKey={itemKey}
            values={values}
            hadleItemEdit={hadleItemEdit}
            handleItemRemove={handleItemRemove}
          />
        );
      })}
      {selectDiscount.map((ele, index) => {
        const discountKey = Object.keys(ele)[0];
        const values = Object.values(ele)[0];

        if (values.items.length === 0) {
          handleDisRemove(discountKey);
          return;
        }

        return (
          <ListItem
            key={index}
            dense
            divider={true}
            className={classes.listItem}
          >
            <ListItemText
              className={classes.itemText}
              primary={`${values.name}`}
              secondary={
                <React.Fragment>
                  {`${values.items
                    .map(
                      iKey =>
                        `${
                          findItem(iKey, selectItem).name.length > 10
                            ? `${findItem(iKey, selectItem).name.slice(
                                0,
                                6
                              )}...`
                            : findItem(iKey, selectItem).name
                        } ${
                          findItem(iKey, selectItem).count === 1
                            ? ""
                            : `x ${findItem(iKey, selectItem).count}`
                        }`
                    )
                    .join(" , ")}`}
                  <Typography color="secondary">{`-${numberComma(
                    calDiscounts(values.rate, values.items, selectItem)
                  )}원(${(values.rate * 100).toFixed()}%)`}</Typography>
                </React.Fragment>
              }
            />

            <DiscountDialog
              singleDiscount={values}
              selectItem={selectItem}
              disKey={discountKey}
              handleDisEdit={handleDisEdit}
              handleDisRemove={handleDisRemove}
            />
          </ListItem>
        );
      })}
    </List>
  );
}
