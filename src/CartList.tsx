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
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import DiscountDialog from "./DiscountDialog";
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
  return sum;
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
      {selectItem.map((ele, index) => (
        <ListItem key={index} dense divider={true}>
          <ListItemText
            primary={`${Object.values(selectItem[index])[0].name}`}
            secondary={`${Object.values(selectItem[index])[0].price}원`}
          />
          <FormControl>
            <Select
              value={Object.values(selectItem[index])[0].count}
              onChange={(
                event: React.ChangeEvent<{ name?: string; value: unknown }>
              ) => {
                hadleItemEdit(
                  Object.keys(selectItem[index])[0],
                  Number(event.target.value)
                );
              }}
            >
              <MenuItem value="" disabled>
                {`${Object.values(selectItem[index])[0].name}`}
              </MenuItem>
              {numberSelect.map(value => (
                <MenuItem value={value}>{value}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <HighlightOffIcon
            onClick={() => handleItemRemove(Object.keys(selectItem[index])[0])}
          />
        </ListItem>
      ))}
      {selectDiscount.map((ele, index) => (
        <ListItem key={index} dense divider={true}>
          <ListItemText
            primary={`${Object.values(ele)[0].name}`}
            secondary={
              <React.Fragment>
                {`${Object.values(ele)[0]
                  .items.map(
                    iKey =>
                      `${findItem(iKey, selectItem).name} ${
                        findItem(iKey, selectItem).count === 1
                          ? ""
                          : `x ${findItem(iKey, selectItem).count}`
                      }`
                  )
                  .join(" , ")}`}
                <Typography color="primary">{`-${calDiscounts(
                  Object.values(ele)[0].rate,
                  Object.values(ele)[0].items,
                  selectItem
                )}원(${(
                  Object.values(ele)[0].rate * 100
                ).toFixed()}%)`}</Typography>
              </React.Fragment>
            }
          />

          <DiscountDialog
            singleDiscount={Object.values(ele)[0]}
            selectItem={selectItem}
            disKey={Object.keys(ele)[0]}
            handleDisEdit={handleDisEdit}
            handleDisRemove={handleDisRemove}
          />
        </ListItem>
      ))}
    </List>
  );
}
