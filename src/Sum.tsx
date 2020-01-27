import React, { ReactElement, Fragment } from "react";
import { Divider, Typography } from "@material-ui/core";

interface Props {
  calSum: number;
}

export default function Sum({ calSum }: Props): ReactElement {
  return (
    <Fragment>
      <Divider light />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant={"subtitle1"} style={{ lineHeight: "3" }}>
          합계
        </Typography>

        <Typography variant={"h4"}>{calSum}원</Typography>
      </div>
    </Fragment>
  );
}
