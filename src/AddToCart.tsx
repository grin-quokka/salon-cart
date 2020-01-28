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

interface Props {
  mode: string;
  menu: {
    items: {
      [itemKey: string]: { count: number; name: string; price: number };
    };
    discounts: { [discountKey: string]: { name: string; rate: number } };
    currency_code: "string";
  } | null;
}

export default function AddToCart({ mode, menu }: Props): ReactElement {
  let itemArr: string[] = [];
  //const [itemArr, setItemArr] = useState<string[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.checked);
    console.log(event.target.id);
    // setItemArr([...itemArr, event.target.id]);
    itemArr = [...itemArr, event.target.id];
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
              <ListItem button style={style} key={index} divider={true}>
                <ListItemText
                  primary={menu.items[`i_${index + 1}`].name}
                  secondary={`${menu.items[`i_${index + 1}`].price}원`}
                />
                <Checkbox
                  onChange={handleChange}
                  value="primary"
                  inputProps={{ "aria-label": "Item checkbox" }}
                  id={`${index}`}
                  checkedIcon={<CheckIcon />}
                />
              </ListItem>
            )}
          </FixedSizeList>
        )}

        <Typography variant={"h6"}>완료</Typography>
      </Paper>
    </Container>
  );
}
