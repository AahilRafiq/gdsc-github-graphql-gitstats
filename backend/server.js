import express from "express";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";
import {
  reqAccessTokenBody,
  graphqlQueryBody,
} from "./controllers/reqbodies.js";
import axios from "axios";
import "dotenv/config";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors())
const currentDate = new Date();
const oneYearAgo = new Date(currentDate);
oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

const fromDate = oneYearAgo.toISOString();
const toDate = currentDate.toISOString();

//GraphQL schema
const schema = buildSchema(`
  type Query {
    userQuery(code: String): String
  }
`);

// Resolver logic
const root = {
  userQuery: async ({ code }) => {
    try {
      // 1. Get access token from GitHub
      const response = await axios(reqAccessTokenBody(code));
      const userToken = response.data.access_token;

      // 2. Get user data from GitHub
      const response2 = await axios(graphqlQueryBody(userToken));
      console.log(response2.data);

      // 3. Return user data to client
      return JSON.stringify(response2.data);
      
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

app.listen(process.env.PORT || 5000, () => {
  console.log("GraphQL server is running on http://localhost:5000/");
});
