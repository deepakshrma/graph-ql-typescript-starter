import morgan from "morgan";
import express from "express";
import chalk from "chalk";
enum HTTP_STATUS {
  OK,
  WARN,
  ERROR,
}
export default morgan(
  (
    tokens: morgan.TokenIndexer<express.Request, express.Response>,
    req: express.Request,
    res: express.Response
  ) => {
    const status = Number(tokens.status(req, res));
    let st = HTTP_STATUS.OK;
    let color = "#34ace0";
    if (status >= 300 && status < 400) {
      st = HTTP_STATUS.WARN;
      color = "#ffb142";
    } else if (status >= 400) {
      st = HTTP_STATUS.ERROR;
      color = "#ff0000";
    }
    return [
      st == HTTP_STATUS.OK ? "✅" : st == HTTP_STATUS.WARN ? "⚠️" : "❌",
      chalk.hex(color).bold(tokens.method(req, res)),
      chalk.hex(color).bold(status),
      chalk.hex(color).bold(tokens.url(req, res)),
      chalk.hex("#2ed573").bold(`${tokens["response-time"](req, res)} ms`),
      chalk.hex("#f78fb3").bold(`@${tokens.date(req, res)}`),
    ].join(" ");
  }
);
