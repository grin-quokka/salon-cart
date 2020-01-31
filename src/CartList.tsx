import React, { ReactElement } from "react";
import {
  ListItem,
  ListItemText,
  FormControl,
  Select,
  MenuItem,
  Typography,
  createStyles,
  Theme,
  makeStyles,
  List
} from "@material-ui/core";
import BackspaceOutlinedIcon from "@material-ui/icons/BackspaceOutlined";
import DiscountDialog from "./DiscountDialog";
import { numberComma } from "./Sum";
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

// tslint:disable-next-line: max-func-body-length
export default function CartList({
  selectItem,
  hadleItemEdit,
  handleItemRemove,
  selectDiscount,
  handleDisEdit,
  handleDisRemove
}: Props): ReactElement {
  const numberSelect: number[] = [];
  for (let i = 1; i <= 10; i++) {
    numberSelect.push(i);
  }

  const classes = listStyles();

  return (
    <List className={classes.root}>
      {selectItem.map((ele, index) => {
        const itemKey = Object.keys(ele)[0];
        const values = Object.values(ele)[0];

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
              secondary={`${numberComma(Number(values.price))}원`}
            />
            <FormControl>
              <Select
                value={values.count}
                onChange={({ target: { value } }) => {
                  hadleItemEdit(itemKey, Number(value));
                }}
              >
                <MenuItem value="" disabled>
                  {`${
                    values.name.length > 10
                      ? `${values.name.slice(0, 10)}...`
                      : values.name
                  }`}
                </MenuItem>
                {numberSelect.map(value => (
                  <MenuItem className={classes.selectItem} value={value}>
                    {value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <BackspaceOutlinedIcon
              color="primary"
              onClick={() => handleItemRemove(itemKey)}
            />
          </ListItem>
        );
      })}
      {selectDiscount.map((ele, index) => {
        const discountKey = Object.keys(ele)[0];
        const values = Object.values(ele)[0];

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
