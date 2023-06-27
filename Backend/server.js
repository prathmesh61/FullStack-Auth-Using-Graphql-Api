const { ApolloServer, ApolloError, gql } = require("apollo-server");

const userModle = require("./modles/userModle");
const { connect } = require("./MongoConnection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
require("dotenv").config();
// mongo connection

exports.typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
  }

  type Query {
    getUsers: [User!]!
    getUser(id: ID!): User!
  }

  type Mutation {
    createUser(name: String!, email: String!, password: String!): User!
    login(email: String!, password: String!): User!
    deleteUser(id: ID!): User!
  }
`;

exports.resolvers = {
  Query: {
    getUsers: async (parent, args) => {
      await connect();
      const { name, email, password } = args;
      try {
        const users = await userModle.find();
        return users;
      } catch (error) {
        new ApolloError(error, 500);
      }
    },
    getUser: async (parent, args) => {
      await connect();
      const { name, email, password } = args;
      try {
        const user = await userModle.findById(args.id).exec();
        return user;
      } catch (error) {
        new ApolloError(error, 500);
      }
    },
  },

  Mutation: {
    createUser: async (parent, args) => {
      await connect();
      const { name, email, password } = args;

      // find the user in the database
      const user = await userModle.findOne({ email });
      if (user) {
        throw new ApolloError("user already exist", 500);
      }

      // hash the password
      const hashPassword = await bcrypt.hash(password, 10);
      // jwt token

      try {
        // create newuser and save it
        const newUser = new userModle({
          email,
          name,
          password: hashPassword,
        });

        await newUser.save();
        return newUser;
      } catch (error) {
        new ApolloError(error, 500);
      }
    },

    login: async (parent, args) => {
      await connect();
      const { name, email, password } = args;

      // find the user in the database
      const user = await userModle.findOne({ email });
      if (!user) {
        throw new ApolloError("user not exist", 500);
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new ApolloError("password is incorrect", 500);
      }

      try {
        const user = await userModle.findOne({ email });
        return newUser;
      } catch (error) {
        new ApolloError(error, 500);
      }
    },
    deleteUser: async (parent, args) => {
      await connect();
      const { id } = args;

      try {
        await userModle.findByIdAndDelete(id);
        return "user deleted";
      } catch (error) {
        new ApolloError(error, 500);
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs: exports.typeDefs,
  resolvers: exports.resolvers,
});

server
  .listen({ port: 9100 })
  .then(({ url }) => console.log(`Server running at ${url}`));
