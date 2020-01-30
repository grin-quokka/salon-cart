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
    arr:
      | {
          [itemKey: string]: { count: number; name: string; price: number };
        }[]
      | {
          [discountKey: string]: {
            name: string;
            rate: number;
            items: string[];
          };
        }[],
    arrName: string
  ) => void;
  history: History<LocationState>;
  option: "items" | "discounts";
  selectDiscount: {
    [discountKey: string]: { name: string; rate: number; items: string[] };
  }[];
}

// tslint:disable-next-line: max-func-body-length
export default function CheckList({
  menu,
  selectItem,
  handleItemSelect,
  history,
  option,
  selectDiscount
}: Props): ReactElement {
  const [itemArr, setItemArr] = useState([...selectItem]);
  const [disCntArr, setDisCntArr] = useState([...selectDiscount]);

  const handleChange = (
    { target }: React.ChangeEvent<HTMLInputElement>,
    option: Props["option"]
  ) => {
    if (target.checked && menu !== null) {
      option === "items"
        ? setItemArr([
            ...itemArr,
            {
              [target.id]: {
                count: 1,
                name: menu.items[target.id].name,
                price: menu.items[target.id].price
              }
            }
          ])
        : setDisCntArr([
            ...disCntArr,
            {
              [target.id]: {
                name: menu.discounts[target.id].name,
                rate: menu.discounts[target.id].rate,
                items: itemArr.map(ele => Object.keys(ele)[0])
              }
            }
          ]);
    } else {
      if (option === "items") {
        const temp = [...itemArr];
        temp.some((ele, index) => {
          if (target.id in ele) {
            temp.splice(index, 1);
            return true;
          }

          return false;
        });
        setItemArr(temp);
      } else {
        const temp = [...disCntArr];
        temp.some((ele, index) => {
          if (target.id in ele) {
            temp.splice(index, 1);
            return true;
          }

          return false;
        });
        setDisCntArr(temp);
      }
    }
  };

  const sortArrKey = (arr: Props["selectItem"] | Props["selectDiscount"]) => {
    return arr.sort((a: any, b: any) => {
      if (
        Number(Object.keys(a)[0].slice(2)) > Number(Object.keys(b)[0].slice(2))
      ) {
        return 1;
      }
      if (
        Number(Object.keys(a)[0].slice(2)) < Number(Object.keys(b)[0].slice(2))
      ) {
        return -1;
      }
      return 0;
    });
  };

  const handleComplete = () => {
    const sorted =
      option === "items" ? sortArrKey(itemArr) : sortArrKey(disCntArr);
    const arrName = option === "items" ? "selectItem" : "selectDiscount";
    handleItemSelect(sorted, arrName);
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
              checked={
                option === "items"
                  ? itemArr.some(ele => `i_${index + 1}` in ele)
                  : disCntArr.some(ele => `d_${index + 1}` in ele)
              }
              onChange={e => handleChange(e, option)}
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
