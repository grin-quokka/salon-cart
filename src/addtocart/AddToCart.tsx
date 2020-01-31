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
import { AppState, AppFnc } from "../interface";

interface Props extends RouteComponentProps<{ mode: string }> {
  menu: AppState["menu"];
  selectItem: AppState["selectItem"];
  handleItemSelect: AppFnc["handleItemSelect"];
  history: History<LocationState>;
  selectDiscount: AppState["selectDiscount"];
}

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
