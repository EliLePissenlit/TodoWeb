import { Field, ObjectType, ID, registerEnumType } from "type-graphql";
import { prop as Property, getModelForClass } from "@typegoose/typegoose";

// Définition de l'énumération pour l'état du todo
export enum TodoStatus {
  TODO = "TODO",      // À faire
  DOING = "DOING",    // En cours
  DONE = "DONE"       // Terminé
}

// Enregistrement de l'énumération pour GraphQL
registerEnumType(TodoStatus, {
  name: "TodoStatus",
  description: "Statut d'une tâche (TODO, DOING, DONE)",
});

// Définition du modèle Todo
@ObjectType()
export class Todo {
  @Field(() => ID)
  id!: string;

  @Field()
  @Property({ required: true })
  text!: string;

  @Field(() => TodoStatus)
  @Property({ required: true, enum: TodoStatus, default: TodoStatus.TODO })
  status!: TodoStatus;

  @Field()
  @Property({ default: false })
  completed!: boolean;

  @Field()
  @Property({ default: Date.now })
  createdAt!: Date;
}

// Création du modèle Mongoose
export const TodoModel = getModelForClass(Todo); 