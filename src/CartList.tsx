import React, { ReactElement } from "react";
import { FixedSizeList } from "react-window";
import {
  ListItem,
  ListItemText,
  FormControl,
  Select,
  MenuItem
} from "@material-ui/core";

interface Props {
  selectItem: {
    [itemKey: string]: { count: number; name: string; price: number };
  }[];
  menu: {
    items: {
      [itemKey: string]: { count: number; name: string; price: number };
    };
    discounts: { [discountKey: string]: { name: string; rate: number } };
    currency_code: "string";
  };
}

export default function CartList({ selectItem, menu }: Props): ReactElement {
  const numberSelect: number[] = [];
  for (let i = 1; i <= 10; i++) {
    numberSelect.push(i);
  }

  return (
    <FixedSizeList
      height={500}
      width={"100%"}
      itemSize={70}
      itemCount={selectItem.length}
    >
      {({ index, style }) => (
        <ListItem style={style} key={index} dense divider={true}>
          <ListItemText
            primary={`${Object.values(selectItem[index])[0].name}`}
            secondary={`${Object.values(selectItem[index])[0].price}원`}
          />
          <FormControl>
            <Select
              value={Object.values(selectItem[index])[0].count}
              // TODO: onClose={handleChange}
            >
              <MenuItem value="" disabled>
                {`${Object.values(selectItem[index])[0].name}`}
              </MenuItem>
              {numberSelect.map(value => (
                <MenuItem value={value}>{value}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </ListItem>
      )}
    </FixedSizeList>
  );
}
