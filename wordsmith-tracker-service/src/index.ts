import { ApolloServer } from "apollo-server-express";
import express, { Application } from "express";
import connectToDatabase from "./databaseConnection";
import cors from "cors";
import userSchema from "./schemas/userSchema";
import userResolvers from "./resolvers/userResolvers";
import wordSchema from "./schemas/wordSchema";
import wordResolvers from "./resolvers/wordResolvers";
import languageSchema from "./schemas/languageSchema";
import languageResolver from "./resolvers/languageResolvers";
import seedLanguages from "./helper/languageSeeding"; 
import dotenv from "dotenv";  
dotenv.config();
const PORT: string = process.env.PORT || "3000";

const server = new ApolloServer({
  typeDefs: [userSchema, wordSchema, languageSchema],
  resolvers: [userResolvers, wordResolvers, languageResolver],
});

const startServer = async () => {
  await connectToDatabase();
  try {
    await seedLanguages();
    const app: Application = express();
    app.use(cors());
    await server.start();   
    server.applyMiddleware({ app: app as any });
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}${server.graphqlPath}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1); 
  }
};

startServer();
