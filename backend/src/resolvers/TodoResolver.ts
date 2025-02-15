import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Todo, TodoModel, TodoStatus } from "../models/Todo";

@Resolver()
export class TodoResolver {
  @Query(() => [Todo])
  async todos(): Promise<Todo[]> {
    return await TodoModel.find();
  }

  @Mutation(() => Todo)
  async createTodo(
    @Arg("text") text: string
  ): Promise<Todo> {
    const todo = await TodoModel.create({
      text,
      status: TodoStatus.TODO,
      completed: false
    });
    return todo;
  }

  @Mutation(() => Todo)
  async updateTodoStatus(
    @Arg("id") id: string,
    @Arg("status", () => TodoStatus) status: TodoStatus
  ): Promise<Todo> {
    const todo = await TodoModel.findById(id);
    if (!todo) {
      throw new Error("Todo non trouvé");
    }
    
    todo.status = status;
    // Si le statut est DONE, on marque aussi comme complété
    if (status === TodoStatus.DONE) {
      todo.completed = true;
    }
    
    await todo.save();
    return todo;
  }

  @Mutation(() => Todo)
  async toggleTodo(
    @Arg("id") id: string
  ): Promise<Todo> {
    const todo = await TodoModel.findById(id);
    if (!todo) {
      throw new Error("Todo non trouvé");
    }
    
    todo.completed = !todo.completed;
    // Si on marque comme complété, on met aussi le statut à DONE
    if (todo.completed) {
      todo.status = TodoStatus.DONE;
    }
    
    await todo.save();
    return todo;
  }

  @Mutation(() => Boolean)
  async deleteTodo(
    @Arg("id") id: string
  ): Promise<boolean> {
    const result = await TodoModel.deleteOne({ _id: id });
    return result.deletedCount === 1;
  }
}