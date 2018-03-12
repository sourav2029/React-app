import  { createApolloServer } from "meteor/apollo";
import { makeExecutableSchema } from "graphql-tools";
import typeDefs from "./adomian/schema";
import resolvers from "./adomian/resolver";
// import testSchema  from "./schema";
// import testResolver from "./resolver";


const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

console.log("hello");
createApolloServer({schema});