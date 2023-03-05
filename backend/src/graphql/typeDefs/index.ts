/* This file combines all type definitions
into an array and then exports this array
to the apollo-server file */

import userTypeDefs from "./user";

const allTypeDefs = [userTypeDefs];

export default allTypeDefs;
