import React, { ReactElement, useState } from "react";
import {
  Container,
  Paper,
  Toolbar,
  Typography,
  ListItem,
  ListItemText,
  Divider,
  Checkbox
} from "@material-ui/core";
import { FixedSizeList } from "react-window";
import CheckIcon from "@material-ui/icons/Check";
import { History, LocationState } from "history";
import { RouteComponentProps } from "react-router";
import CheckList from "./CheckList";

interface Props extends RouteComponentProps<{ mode: string }> {
  menu: {
    items: {
      [itemKey: string]: { count: number; name: string; price: number };
    };
    discounts: { [discountKey: string]: { name: string; rate: number } };
    currency_code: "string";
  } | null;
  selectItem: {
    [itemKey: string]: { count: number; name: string; price: number };
  }[];
  handleItemSelect: (
    itemArr: {
      [itemKey: string]: { count: number; name: string; price: number };
    }[]
  ) => void;
  history: History<LocationState>;
}

// tslint:disable-next-line: max-func-body-length
export default function AddToCart({
  menu,
  selectItem,
  handleItemSelect,
  history,
  location,
  match: {
    params: { mode }
  }
}: Props): ReactElement {
  const [itemArr, setItemArr] = useState([...selectItem]);
  // const [discntArr, setDiscntArr] = useState([...discntArr]);

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
    <Container maxWidth="xs">
      <Paper elevation={3}>
        <Toolbar>
          <Typography variant="h6">
            {mode === "items" ? "시술 메뉴" : "할인"}
          </Typography>
        </Toolbar>
        <Divider light />
        {menu !== null && mode === "items" && (
          <CheckList
            option={"items"}
            menu={menu}
            selectItem={selectItem}
            handleItemSelect={handleItemSelect}
            history={history}
          />
        )}

        {menu !== null && mode === "discounts" && (
          <CheckList
            option={"discounts"}
            menu={menu}
            selectItem={selectItem}
            handleItemSelect={handleItemSelect}
            history={history}
          />
        )}
      </Paper>
    </Container>
  );
}
