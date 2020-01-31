import React, { ReactElement, useState } from "react";
import { FixedSizeList } from "react-window";
import {
  ListItem,
  ListItemText,
  Checkbox,
  Typography,
  Button
} from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import { History, LocationState } from "history";
import { numberComma } from "../cart/Sum";
import { AppState, AppFnc } from "../interface";

interface Props {
  menu: AppState["menu"];
  selectItem: AppState["selectItem"];
  handleItemSelect: AppFnc["handleItemSelect"];
  history: History<LocationState>;
  option: "items" | "discounts";
  selectDiscount: AppState["selectDiscount"];
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
    <React.Fragment>
      {menu !== null && (
        <FixedSizeList
          height={535}
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
                    ? `${numberComma(
                        Number(menu[option][`i_${index + 1}`].price)
                      )}원`
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
      )}

      <Button
        onClick={handleComplete}
        fullWidth
        color="primary"
        variant="outlined"
      >
        <Typography variant={"h6"}>완료</Typography>
      </Button>
    </React.Fragment>
  );
}
