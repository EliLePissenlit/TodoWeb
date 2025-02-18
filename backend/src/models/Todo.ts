import { Field, ObjectType, ID, registerEnumType } from "type-graphql";
import { prop as Property, getModelForClass } from "@typegoose/typegoose";

export enum TodoStatus {
  TODO = "TODO",      
  DOING = "DOING",   
  DONE = "DONE"     
}

registerEnumType(TodoStatus, {
  name: "TodoStatus",
  description: "Statut d'une tâche (TODO, DOING, DONE)",
});

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

export const TodoModel = getModelForClass(Todo); 