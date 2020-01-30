import React, { ReactElement } from "react";
import { FixedSizeList } from "react-window";
import {
  ListItem,
  ListItemText,
  FormControl,
  Select,
  MenuItem,
  Typography
} from "@material-ui/core";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
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

export default function CartList({
  selectItem,
  hadleItemEdit,
  handleItemRemove,
  selectDiscount,
  menu
}: Props): ReactElement {
  const numberSelect: number[] = [];
  for (let i = 1; i <= 10; i++) {
    numberSelect.push(i);
  }

  const findItem = (iKey: string, selectItem: Props["selectItem"]) => {
    let itemObj = { count: 0, name: "", price: 0 };
    selectItem.some(ele => {
      itemObj = Object.values(ele)[0];
      return Object.keys(ele)[0] === iKey;
    });

    return itemObj;
  };

  const calDiscounts = (rate: number, dicountsItems: string[]) => {
    let sum = 0;
    dicountsItems.forEach((ele, index) => {
      sum +=
        findItem(ele, selectItem).count *
        findItem(ele, selectItem).price *
        rate;
    });
    return sum;
  };

  return (
    <>
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
        <ListItem key={index} dense divider={true} alignItems="flex-start">
          <ListItemText
            primary={`${Object.values(ele)[0].name}`}
            secondary={
              <>
                {`${Object.values(ele)[0]
                  .items.map(
                    iKey =>
                      `${menu?.items[iKey].name} ${
                        findItem(iKey, selectItem).count === 1
                          ? ""
                          : `x ${findItem(iKey, selectItem).count}`
                      }`
                  )
                  .join(" , ")}`}
                <Typography color="primary">{`-${calDiscounts(
                  Object.values(ele)[0].rate,
                  Object.values(ele)[0].items
                )}원(${(
                  Object.values(ele)[0].rate * 100
                ).toFixed()}%)`}</Typography>
              </>
            }
          />
        </ListItem>
      ))}
    </>
  );
}
