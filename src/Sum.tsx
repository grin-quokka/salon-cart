import React, { ReactElement, Fragment } from "react";
import { Divider, Typography } from "@material-ui/core";

interface Props {
  calSum: number;
  currency: string | undefined;
}

export default function Sum({ calSum, currency }: Props): ReactElement {
  return (
    <Fragment>
      <Divider light />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant={"subtitle1"} style={{ lineHeight: "3" }}>
          합계
        </Typography>

        <Typography variant={"h4"}>
          {currency === "KRW" ? `${calSum}원` : `$${calSum * 0.00084}`}
        </Typography>
      </div>
    </Fragment>
  );
}
