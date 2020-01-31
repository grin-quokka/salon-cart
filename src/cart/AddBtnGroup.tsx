import React, { ReactElement, useState } from "react";
import { Button, Theme, makeStyles, createStyles } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { Link } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import { AppState, AppFnc } from "../interface";
import { History, LocationState } from "history";
import { withRouter } from "react-router-dom";
import { RouteComponentProps } from "react-router";

interface Props extends RouteComponentProps {
  selectItem: AppState["selectItem"];
  history: History<LocationState>;
}

const btnBroupStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "space-around",
      marginTop: 10
    },
    btnContainer: {
      width: "40%"
    },
    link: {
      textDecoration: "none"
    }
  })
);

const AddBtnGroup = withRouter(
  ({ selectItem, history }: Props): ReactElement => {
    const classes = btnBroupStyles();
    const [open, setOpen] = useState(false);

    const handleClose = () => {
      setOpen(false);
    };

    const handleDiscountBtn = () => {
      if (selectItem.length === 0) {
        setOpen(true);
        return;
      }

      history.push("/addtocart/discounts");
    };

    return (
      <div className={classes.root}>
        <div className={classes.btnContainer}>
          <Link to={"/addtocart/items"} className={classes.link}>
            <Button variant="outlined" color="primary" fullWidth>
              <AddIcon />
              시술
            </Button>
          </Link>
        </div>
        <div className={classes.btnContainer}>
          <Snackbar
            anchorOrigin={{
              vertical: "top",
              horizontal: "center"
            }}
            open={open}
            autoHideDuration={3000}
            message="시술 메뉴를 먼저 선택해주세요."
            onClose={handleClose}
          />

          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            onClick={handleDiscountBtn}
          >
            <AddIcon /> 할인
          </Button>
        </div>
      </div>
    );
  }
);

export default AddBtnGroup;
