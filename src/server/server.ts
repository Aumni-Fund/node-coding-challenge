import express, { Request, Response } from "express";

const app = express();
const port = 3000;

export default () => {
  app.get("/", (_req: Request, res: Response) => {
    res.send("Hello World!");
  });

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
};