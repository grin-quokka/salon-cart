import React, { ReactElement, useState } from "react";
import {
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  Button,
  ButtonGroup,
  createStyles,
  Theme,
  makeStyles
} from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import { numberComma } from "./Sum";
import { AppState, AppFnc } from "./interface";

interface Props {
  singleDiscount: { name: string; rate: number; items: string[] };
  selectItem: AppState["selectItem"];
  disKey: string;
  handleDisEdit: AppFnc["handleDisEdit"];
  handleDisRemove: AppFnc["handleDisRemove"];
}

const dialogStyles = makeStyles((theme: Theme) =>
  createStyles({
    dialogContent: {
      paddingRight: 0,
      paddingLeft: 0,
      overflow: "auto",
      height: 400
    },
    listItemText: {
      paddingLeft: 30
    },
    checkbox: {
      paddingRight: 30
    }
  })
);
// tslint:disable-next-line: max-func-body-length
export default function DiscountDialog({
  singleDiscount,
  selectItem,
  disKey,
  handleDisEdit,
  handleDisRemove
}: Props): ReactElement {
  const classes = dialogStyles();

  const [open, setOpen] = React.useState(false);

  const [discountsObj, setDiscountsObj] = useState(
    Object.assign({}, singleDiscount)
  );
  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    if (target.checked) {
      setDiscountsObj({
        ...discountsObj,
        items: [...discountsObj.items, target.id]
      });
    } else {
      const temp = [...discountsObj.items];
      temp.splice(temp.indexOf(target.id), 1);
      setDiscountsObj({
        ...discountsObj,
        items: temp
      });
    }
  };

  const handleDailogClose = () => {
    handleDisEdit(disKey, discountsObj);
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <React.Fragment>
      <Button
        variant="outlined"
        color="primary"
        onClick={handleClickOpen}
        size="small"
      >
        수정
      </Button>
      <Dialog
        onClose={handleDailogClose}
        aria-labelledby="simple-dialog-title"
        open={open}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle id="simple-dialog-title">{discountsObj.name}</DialogTitle>

        <List className={classes.dialogContent}>
          {selectItem.map((ele, index) => {
            const itemKey = Object.keys(ele)[0];
            const values = Object.values(ele)[0];

            return (
              <ListItem key={index} dense divider>
                <ListItemText
                  className={classes.listItemText}
                  primary={`${`${
                    values.name.length > 10
                      ? `${values.name.slice(0, 6)}...`
                      : values.name
                  } ${values.count === 1 ? "" : `x ${values.count}`}`}`}
                  secondary={`${numberComma(Number(values.price))}원`}
                />
                <Checkbox
                  className={classes.checkbox}
                  checked={discountsObj.items.includes(itemKey)}
                  onChange={handleChange}
                  value="primary"
                  inputProps={{ "aria-label": "Item checkbox" }}
                  id={itemKey}
                  checkedIcon={<CheckIcon />}
                />
              </ListItem>
            );
          })}
        </List>

        <ButtonGroup
          fullWidth
          color="primary"
          aria-label="outlined primary button group"
        >
          <Button onClick={() => handleDisRemove(disKey)}>삭제</Button>
          <Button onClick={handleDailogClose}>완료</Button>
        </ButtonGroup>
      </Dialog>
    </React.Fragment>
  );
}
