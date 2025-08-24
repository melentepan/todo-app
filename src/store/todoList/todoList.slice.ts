import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { loadTodosList, saveTodosList } from '../../utils/localStorage'
import type { Todo } from '../../types'

interface TodoListState {
  todoList: Todo[]
  editingTodo: Todo | null
}

const initialState: TodoListState = {
  todoList: loadTodosList(),
  editingTodo: null,
}

const todoListSlice = createSlice({
  name: 'todoList',
  initialState,
  reducers: {
    addTodo(state, action: PayloadAction<Todo>) {
      state.todoList.push(action.payload)
      saveTodosList(state.todoList)
    },
    removeTodo(state, action: PayloadAction<number>) {
      state.todoList = state.todoList.filter(
        (todoItem) => todoItem.id !== action.payload
      )
      saveTodosList(state.todoList)
    },
    toggleTodo(state, action: PayloadAction<number>) {
      const todo = state.todoList.find(
        (todoItem) => todoItem.id === action.payload
      )
      if (todo) {
        todo.completed = !todo.completed
      }
      saveTodosList(state.todoList)
    },
    updateTodo(state, action: PayloadAction<string>) {
      const todo = state.todoList.find(
        (todoItem) => todoItem.id === state.editingTodo?.id
      )
      if (todo) {
        todo.text = action.payload
      }
      saveTodosList(state.todoList)
      state.editingTodo = null
    },

    setEditingTodo(state, action: PayloadAction<Todo | null>) {
      state.editingTodo = action.payload
    },
  },
})

export default todoListSlice.reducer

export const { addTodo, removeTodo, toggleTodo, updateTodo, setEditingTodo } =
  todoListSlice.actions
