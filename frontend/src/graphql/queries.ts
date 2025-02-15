import { gql } from '@apollo/client';

export const GET_TODOS = gql`
  query GetTodos {
    todos {
      id
      text
      status
      completed
      createdAt
    }
  }
`;

export const DELETE_TODO = gql`
  mutation DeleteTodo($id: String!) {
    deleteTodo(id: $id)
  }
`;

export const UPDATE_TODO_STATUS = gql`
  mutation UpdateTodoStatus($id: String!, $status: TodoStatus!) {
    updateTodoStatus(id: $id, status: $status) {
      id
      text
      status
      completed
    }
  }
`;

export const CREATE_TODO = gql`
  mutation CreateTodo($text: String!) {
    createTodo(text: $text) {
      id
      text
      status
      completed
      createdAt
    }
  }
`; 