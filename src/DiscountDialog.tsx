import React, { ReactElement, useState } from "react";
import {
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  Button
} from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";

interface Props {
  singleDiscount: { name: string; rate: number; items: string[] };
  selectItem: {
    [itemKey: string]: {
      count: number;
      name: string;
      price: number;
    };
  }[];
  disKey: string;
  handleDisEdit: (
    disKey: string,
    discountsObj: { name: string; rate: number; items: string[] }
  ) => void;
  handleDisRemove: (disKey: string) => void;
}

export default function DiscountDialog({
  singleDiscount,
  selectItem,
  disKey,
  handleDisEdit,
  handleDisRemove
}: Props): ReactElement {
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
      >
        <DialogTitle id="simple-dialog-title">{discountsObj.name}</DialogTitle>
        <List>
          {selectItem.map((ele, index) => (
            <ListItem key={index} dense>
              <ListItemText
                primary={`${`${Object.values(selectItem[index])[0].name} ${
                  Object.values(selectItem[index])[0].count === 1
                    ? ""
                    : `x ${Object.values(selectItem[index])[0].count}`
                }`}`}
                secondary={`${Object.values(selectItem[index])[0].price}원`}
              />
              <Checkbox
                checked={discountsObj.items.includes(Object.keys(ele)[0])}
                onChange={handleChange}
                value="primary"
                inputProps={{ "aria-label": "Item checkbox" }}
                id={Object.keys(ele)[0]}
                checkedIcon={<CheckIcon />}
              />
            </ListItem>
          ))}
          <ListItem button onClick={() => handleDisRemove(disKey)}>
            <ListItemText primary="할인 삭제" color="primary" />
          </ListItem>
        </List>
      </Dialog>
    </React.Fragment>
  );
}
