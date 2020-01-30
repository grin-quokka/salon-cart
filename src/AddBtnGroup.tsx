import React, { ReactElement } from "react";
import { Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { Link } from "react-router-dom";

interface Props {}

export default function AddBtnGroup({}: Props): ReactElement {
  return (
    <div style={{ display: "inline" }}>
      <Link to={"/addtocart/items"}>
        <Button variant="outlined" color="primary">
          <AddIcon />
          시술
        </Button>
      </Link>
      <Link to={"/addtocart/discounts"}>
        <Button variant="outlined" color="secondary">
          <AddIcon /> 할인
        </Button>
      </Link>
    </div>
  );
}
