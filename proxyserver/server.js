import express from "express";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";
import {
  reqAccessTokenBody,
  graphqlQueryBody,
} from "./utilityFuns/reqbodies.js";
import root from "./utilityFuns/resolvers.js";
import "dotenv/config";
import cors from "cors";
import { encryptMessage , decryptMessage } from "./utilityFuns/encryptors.js";

const app = express();
app.use(express.json());
app.use(cors())


//GraphQL schema
const schema = buildSchema(`
  type Query {
    userToken(code: String): String
    userQuery(clientToken: String , username : String): String
  }
`);

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root, // Resolver logic is in utilityFuns/resolvers.js
    graphiql: true,
  })
);

app.listen(process.env.PORT || 5000, () => {
  console.log("Gitstats server is running!");
});
