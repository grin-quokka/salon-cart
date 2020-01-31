import React, { ReactElement } from "react";
import { Button, Theme, makeStyles, createStyles } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { Link } from "react-router-dom";

const btnBroupStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "space-around",
      marginTop: 10
    },
    btnContainer: {
      width: "40%"
    }
  })
);

export default function AddBtnGroup(): ReactElement {
  const classes = btnBroupStyles();
  return (
    <div className={classes.root}>
      <div className={classes.btnContainer}>
        <Link to={"/addtocart/items"}>
          <Button variant="outlined" color="primary" fullWidth>
            <AddIcon />
            시술
          </Button>
        </Link>
      </div>
      <div className={classes.btnContainer}>
        <Link to={"/addtocart/discounts"}>
          <Button variant="outlined" color="secondary" fullWidth>
            <AddIcon /> 할인
          </Button>
        </Link>
      </div>
    </div>
  );
}
