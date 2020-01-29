import React, { ReactElement } from "react";
import {
  Container,
  Paper,
  Toolbar,
  Typography,
  Divider
} from "@material-ui/core";
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
    arr:
      | {
          [itemKey: string]: { count: number; name: string; price: number };
        }[]
      | { [discountKey: string]: { name: string; rate: number } }[],
    arrName: string
  ) => void;
  history: History<LocationState>;
  selectDiscount: { [discountKey: string]: { name: string; rate: number } }[];
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
  },
  selectDiscount
}: Props): ReactElement {
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
            selectDiscount={selectDiscount}
          />
        )}

        {menu !== null && mode === "discounts" && (
          <CheckList
            option={"discounts"}
            menu={menu}
            selectItem={selectItem}
            handleItemSelect={handleItemSelect}
            history={history}
            selectDiscount={selectDiscount}
          />
        )}
      </Paper>
    </Container>
  );
}
