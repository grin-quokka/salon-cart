import React, { ReactElement } from "react";
import { Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

interface Props {}

export default function AddBtnGroup({}: Props): ReactElement {
  return (
    <div style={{ display: "inline" }}>
      <Button variant="outlined" color="primary">
        <AddIcon />
        시술
      </Button>
      <Button variant="outlined" color="secondary">
        <AddIcon /> 할인
      </Button>
    </div>
  );
}
