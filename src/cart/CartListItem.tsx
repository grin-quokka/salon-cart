import React, { ReactElement } from "react";
import {
  ListItem,
  ListItemText,
  FormControl,
  Select,
  MenuItem,
  createStyles,
  makeStyles
} from "@material-ui/core";
import { numberComma } from "./Sum";
import BackspaceOutlinedIcon from "@material-ui/icons/BackspaceOutlined";
import { AppFnc } from "../interface";

interface Props {
  itemKey: string;
  values: { count: number; name: string; price: number };
  index: number;
  hadleItemEdit: AppFnc["hadleItemEdit"];
  handleItemRemove: AppFnc["handleItemRemove"];
}

const listItemStyles = makeStyles(() =>
  createStyles({
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

export default function CartListItem({
  itemKey,
  values,
  index,
  hadleItemEdit,
  handleItemRemove
}: Props): ReactElement {
  const classes = listItemStyles();

  const numberSelect: number[] = [];
  for (let i = 1; i <= 10; i++) {
    numberSelect.push(i);
  }

  return (
    <ListItem key={index} dense divider={true} className={classes.listItem}>
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
}
