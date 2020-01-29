import React, { ReactElement } from "react";
import { FixedSizeList } from "react-window";
import {
  ListItem,
  ListItemText,
  FormControl,
  Select,
  MenuItem
} from "@material-ui/core";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
interface Props {
  selectItem: {
    [itemKey: string]: { count: number; name: string; price: number };
  }[];
  hadleItemEdit: (itemKey: string, count: number) => void;
  handleItemRemove: (itemKey: string) => void;
  selectDiscount: { [discountKey: string]: { name: string; rate: number } }[];
}

export default function CartList({
  selectItem,
  hadleItemEdit,
  handleItemRemove,
  selectDiscount
}: Props): ReactElement {
  const numberSelect: number[] = [];
  for (let i = 1; i <= 10; i++) {
    numberSelect.push(i);
  }

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
        <ListItem key={index} dense divider={true}>
          <ListItemText
            primary={`${Object.values(ele)[0].name}`}
            secondary={`${(Object.values(ele)[0].rate * 100).toFixed()}%`}
          />
        </ListItem>
      ))}
    </>
  );
}
