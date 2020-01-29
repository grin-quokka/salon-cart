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
interface Props {
  mode: string;
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

export default function AddToCart({
  mode,
  menu,
  selectItem,
  handleItemSelect,
  history
}: Props): ReactElement {
  const [itemArr, setItemArr] = useState([...selectItem]);

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

      // temp.splice(Object.keys(temp).indexOf(target.id), 1);
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
      // a must be equal to b
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
            {mode === "item" ? "시술 메뉴" : "할인"}
          </Typography>
        </Toolbar>
        <Divider light />
        {menu !== null && (
          <FixedSizeList
            height={500}
            width={"100%"}
            itemSize={70}
            itemCount={Object.keys(menu.items).length}
          >
            {({ index, style }) => (
              <ListItem style={style} key={index} dense divider={true}>
                <ListItemText
                  primary={menu.items[`i_${index + 1}`].name}
                  secondary={`${menu.items[`i_${index + 1}`].price}원`}
                />
                <Checkbox
                  checked={itemArr.some(ele => `i_${index + 1}` in ele)}
                  onChange={handleChange}
                  value="primary"
                  inputProps={{ "aria-label": "Item checkbox" }}
                  id={`i_${index + 1}`}
                  checkedIcon={<CheckIcon />}
                />
              </ListItem>
            )}
          </FixedSizeList>
        )}

        <button onClick={handleComplete}>
          <Typography variant={"h6"}>완료</Typography>
        </button>
      </Paper>
    </Container>
  );
}
