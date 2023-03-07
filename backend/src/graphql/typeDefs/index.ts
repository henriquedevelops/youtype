import userTypeDefs from "./user";
import conversationTypeDefs from "./conversation";

/* This file combines all type definitions
into an array and then exports this array
to the apollo-server file */

const allTypeDefs = [userTypeDefs, conversationTypeDefs];

export default allTypeDefs;
