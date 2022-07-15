require("dotenv").config({ path: `.env.${process.env.NODE_ENV || "dev"}` });
import { ApolloServer } from "apollo-server-express";
import bodyParser from "body-parser";
import compression from "compression";
import cors from "cors";
import express from "express";
import jwt from "jsonwebtoken";
import { plugins } from "./config/apollo";
import logger from "./middlewares/logger";
import models from "./models/";
import { init } from "./models/database";
import resolvers from "./resolvers";
import initRoutes from "./routes";
import typeDefs from "./typeDefs";
// Init database
init();

const app = express();
const PORT = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET;
function getLoginUser(req: express.Request) {
  const token = req.headers["x-auth-token"] as string;
  if (token) {
    try {
      return jwt.verify(token, JWT_SECRET as string);
    } catch (error) {
      throw Error("Session Expired!!");
    }
  }
}

function shouldCompress(req: express.Request, res: express.Response) {
  return req.headers["cache-control"] === "no-cache"
    ? false
    : compression.filter(req, res);
}

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
app.use(express.static("public"));

initRoutes(app);

async function startServer() {
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({
      secret: JWT_SECRET,
      models,
      me: getLoginUser(req),
    }),
    plugins: plugins,
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
  app.listen(PORT, () => {
    console.log(
      `🚀 Server ready at http://localhost:4000${apolloServer.graphqlPath}`
    );
  });
}
startServer();
