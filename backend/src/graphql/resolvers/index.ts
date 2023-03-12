/* This file combines all resolvers
into an object and then exports this object
to the apollo-server file */

import userResolvers from "./user";
import conversationResolvers from "./conversation";
import messageResolvers from "./message";

import merge from "lodash.merge";

const allResolvers = merge(
  {},
  userResolvers,
  conversationResolvers,
  messageResolvers
);

export default allResolvers;
