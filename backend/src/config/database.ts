import mongoose from "mongoose";

// Options de configuration pour MongoDB
const mongoOptions = {
  // Utilise le nouveau moteur d'analyse d'URL
  useNewUrlParser: true,
  // Utilise la nouvelle topologie du moteur
  useUnifiedTopology: true,
  // Délai maximum de tentative de connexion (en millisecondes)
  serverSelectionTimeoutMS: 5000,
  // Délai maximum d'inactivité d'une connexion (en millisecondes)
  socketTimeoutMS: 45000,
};

// URL de connexion à MongoDB
const MONGODB_URL = 'mongodb://localhost:27017/todo-app';

// Fonction de connexion à la base de données
export async function connectDatabase() {
  try {
    await mongoose.connect('mongodb://localhost:27017/todo-app');
    console.log('✅ Connecté à la base de données MongoDB');
  } catch (error) {
    console.error('❌ Erreur de connexion à MongoDB:', error);
    process.exit(1);
  }
} 