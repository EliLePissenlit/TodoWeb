import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { TodoResolver } from "./resolvers/TodoResolver";
import { connectDatabase } from "./config/database";

async function startServer() {
  await connectDatabase();

  const schema = await buildSchema({
    resolvers: [TodoResolver],
    emitSchemaFile: true,
  });

  const server = new ApolloServer({
    schema,
  });

  const { url } = await server.listen(4000);
  console.log(`🚀 Le serveur est démarré sur ${url}`);
}

startServer().catch((error) => {
  console.error("❌ Erreur au démarrage du serveur:", error);
}); 