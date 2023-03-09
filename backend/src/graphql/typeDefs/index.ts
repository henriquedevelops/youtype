import userTypeDefs from "./user";
import conversationTypeDefs from "./conversation";
import messageTypeDefs from "./message";

/* This file combines all type definitions
into an array and then exports this array
to the apollo-server file */

const allTypeDefs = [userTypeDefs, conversationTypeDefs, messageTypeDefs];

export default allTypeDefs;
