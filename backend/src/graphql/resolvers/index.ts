/* This file combines all resolvers
into an object and then exports this object
to the apollo-server file */

import userResolvers from "./user";
import conversationResolvers from "./conversation";

import merge from "lodash.merge";

const allResolvers = merge({}, userResolvers, conversationResolvers);

export default allResolvers;
