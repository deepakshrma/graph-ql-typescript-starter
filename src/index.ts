require("dotenv").config({ path: `.env.${process.env.NODE_ENV || "dev"}` });
import { ApolloServer } from "apollo-server-express";

import express from "express";
import cors from "cors";
import compression from "compression";
import bodyParser from "body-parser";

import typeDefs from "./typeDefs";
import resolvers from "./resolvers";
import { init } from "./models/database";
// Init database
init();

import models from "./models/";
import logger from "./middlewares/logger";
import initRoutes from "./routes";

const app = express();

const PORT = process.env.PORT || 4000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({
    models,
  }),
});

if (process.env.NODE_ENV === "dev") {
  // Do something extra here

  app.use(logger);
  app.get("/health", (_, res) => {
    res.send({
      uptime: process.uptime(),
      message: "OK",
      timestamp: Date.now(),
    });
  });
}
app.use(cors());
app.use(compression({ filter: shouldCompress }));
app.use(bodyParser.json());

initRoutes(app);
server.applyMiddleware({ app });

app.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
});
function shouldCompress(req: express.Request, res: express.Response) {
  return req.headers["cache-control"] === "no-cache"
    ? false
    : compression.filter(req, res);
}
