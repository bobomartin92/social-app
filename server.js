const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const path = require("path");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

const port = process.env.PORT || process.env.LOCAl_PORT;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => req,
});

mongoose.connect(process.env.CLOUD_URI, { useNewUrlParser: true }).then(() => {
  console.log("connected to database");
  server
    .listen({ port })
    .then((res) => console.log(`server running on ${res.url}`));
});
