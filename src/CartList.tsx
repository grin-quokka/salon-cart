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
}

export default function CartList({
  selectItem,
  hadleItemEdit,
  handleItemRemove
}: Props): ReactElement {
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
      )}
    </FixedSizeList>
  );
}
