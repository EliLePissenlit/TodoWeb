// reflect-metadata doit être importé en premier
import "reflect-metadata";
// On importe les outils dont on a besoin
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { TodoResolver } from "./resolvers/TodoResolver";
import { connectDatabase } from "./config/database";

// Fonction principale qui démarre notre serveur
async function startServer() {
  // Connexion à la base de données
  await connectDatabase();

  // On construit notre schéma GraphQL
  // Le schéma définit quelles opérations sont possibles dans notre API
  const schema = await buildSchema({
    // On dit à GraphQL d'utiliser notre TodoResolver
    resolvers: [TodoResolver],
    // On active l'émission du schéma pour pouvoir le consulter
    emitSchemaFile: true,
  });

  // On crée notre serveur Apollo
  // Apollo est un outil qui nous aide à utiliser GraphQL
  const server = new ApolloServer({
    schema,
  });

  // On démarre le serveur Apollo
  const { url } = await server.listen(4000);
  console.log(`🚀 Le serveur est démarré sur ${url}`);
}

// On démarre le serveur et on gère les erreurs possibles
startServer().catch((error) => {
  console.error("❌ Erreur au démarrage du serveur:", error);
}); 