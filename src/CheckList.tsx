import React, { ReactElement, useState } from "react";
import { FixedSizeList } from "react-window";
import {
  ListItem,
  ListItemText,
  Checkbox,
  Typography
} from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import { History, LocationState } from "history";

interface Props {
  menu: {
    items: {
      [itemKey: string]: { count: number; name: string; price: number };
    };
    discounts: { [discountKey: string]: { name: string; rate: number } };
    currency_code: "string";
  };
  selectItem: {
    [itemKey: string]: { count: number; name: string; price: number };
  }[];
  handleItemSelect: (
    itemArr: {
      [itemKey: string]: { count: number; name: string; price: number };
    }[]
  ) => void;
  history: History<LocationState>;
  option: "items" | "discounts";
}

export default function CheckList({
  menu,
  selectItem,
  handleItemSelect,
  history,
  option
}: Props): ReactElement {
  const [itemArr, setItemArr] = useState([...selectItem]);

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    if (target.checked && menu !== null) {
      setItemArr([
        ...itemArr,
        {
          [target.id]: {
            count: 1,
            name: menu.items[target.id].name,
            price: menu.items[target.id].price
          }
        }
      ]);
    } else {
      const temp = [...itemArr];
      temp.some((ele, index) => {
        if (target.id in ele) {
          temp.splice(index, 1);
          return true;
        }

        return false;
      });
      setItemArr(temp);
    }
  };

  const handleComplete = () => {
    const sorted = itemArr.sort((a, b) => {
      if (Object.keys(a)[0].slice(2) > Object.keys(b)[0].slice(2)) {
        return 1;
      }
      if (Object.keys(a)[0].slice(2) < Object.keys(b)[0].slice(2)) {
        return -1;
      }
      return 0;
    });
    handleItemSelect(itemArr);
    history.push("/");
  };

  return (
    <>
      <FixedSizeList
        height={500}
        width={"100%"}
        itemSize={70}
        itemCount={Object.keys(menu[option]).length}
      >
        {({ index, style }) => (
          <ListItem style={style} key={index} dense divider={true}>
            <ListItemText
              primary={menu[option][`${option[0]}_${index + 1}`].name}
              secondary={
                option === "items"
                  ? `${menu[option][`i_${index + 1}`].price}원`
                  : `${(
                      menu.discounts[`d_${index + 1}`].rate * 100
                    ).toFixed()}%`
              }
            />
            <Checkbox
              checked={itemArr.some(ele => `i_${index + 1}` in ele)}
              onChange={handleChange}
              value="primary"
              inputProps={{ "aria-label": "Item checkbox" }}
              id={`${option[0]}_${index + 1}`}
              checkedIcon={<CheckIcon />}
            />
          </ListItem>
        )}
      </FixedSizeList>

      <button onClick={handleComplete}>
        <Typography variant={"h6"}>완료</Typography>
      </button>
    </>
  );
}
