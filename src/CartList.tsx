import React, { ReactElement } from "react";
import { FixedSizeList } from "react-window";
import { ListItem, ListItemText } from "@material-ui/core";

interface Props {}

export default function CartList({}: Props): ReactElement {
  return (
    <FixedSizeList height={400} width={"100%"} itemSize={46} itemCount={30}>
      {({ index, style }) => (
        <ListItem button style={style} key={index}>
          <ListItemText primary={`Item ${index + 1}`} />
        </ListItem>
      )}
    </FixedSizeList>
  );
}
