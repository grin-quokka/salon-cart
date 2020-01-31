import React, { ReactElement, Fragment } from "react";
import {
  Divider,
  Typography,
  createStyles,
  Theme,
  makeStyles
} from "@material-ui/core";

interface Props {
  calSum: number;
  currency: string | undefined;
}

const sumStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "space-between"
    },
    title: { lineHeight: "3", paddingLeft: 15 }
  })
);

export const numberComma = (money: number) => {
  let numberArr = money
    .toString()
    .split("")
    .reverse();
  const commaMoney: string[] = [];

  numberArr.forEach((ele, index) => {
    commaMoney.push(`${ele}`);

    if ((index + 1) % 3 === 0) {
      commaMoney.push(`,`);
    }
  });

  if (commaMoney[commaMoney.length - 1] === ",") {
    commaMoney.pop();
  }
  return commaMoney.reverse().join("");
};

export default function Sum({ calSum, currency }: Props): ReactElement {
  const usd = (calSum * 0.00084).toString().split(".");
  const classes = sumStyles();
  return (
    <Fragment>
      <Divider light />
      <div className={classes.root}>
        <Typography variant={"subtitle1"} className={classes.title}>
          합계
        </Typography>

        <Typography variant={"h4"}>
          {currency === "KRW"
            ? `${numberComma(calSum)}원`
            : `$${numberComma(Number(usd[0]))}.${usd[1]}`}
        </Typography>
      </div>
    </Fragment>
  );
}
