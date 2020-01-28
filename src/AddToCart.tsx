import React, { ReactElement } from "react";
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
  match: { path: string };
}

export default function AddToCart({ match: { path } }: Props): ReactElement {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.checked);
    console.log(event.target.id);
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3}>
        <Toolbar>
          <Typography variant="h6">
            {path === "/addtocart/item" ? "시술 메뉴" : "할인"}
          </Typography>
        </Toolbar>
        <Divider light />
        <FixedSizeList height={400} width={"100%"} itemSize={46} itemCount={16}>
          {({ index, style }) => (
            <ListItem button style={style} key={index}>
              <ListItemText primary={`Item ${index + 1}`} secondary={"가격"} />
              <Checkbox
                // checked={checked}
                onChange={handleChange}
                value="primary"
                inputProps={{ "aria-label": "Item checkbox" }}
                id={`${index}`}
                checkedIcon={<CheckIcon />}
              />
            </ListItem>
          )}
        </FixedSizeList>
        <Typography variant={"h6"}>완료</Typography>
      </Paper>
    </Container>
  );
}
