import { ApolloServer } from "apollo-server-express";
import express from "express";

import typeDefs from "./typeDefs";
import resolvers from "./resolvers";
import { init } from "./models/database";
init();
import models from "./models/";

const app = express();

const PORT = process.env.PORT || 4000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({
    models,
  }),
});

server.applyMiddleware({ app });

app.get("health", (_, res) => res.send("OK"));

app.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
});
