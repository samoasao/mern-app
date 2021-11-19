import cors from "cors";
import dotenv from "dotenv";
import findConfig from "find-config";
import express from "express";

dotenv.config({ path: findConfig("config.env")! });

import dbo from "./db/conn";
import recordRoutes from "./routes/record";

const app = express();

const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(recordRoutes);
// get driver connection

app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err: any) {
    if (err) console.error(err);
  });
  console.log(`Server is running on port: ${port}`);
});
