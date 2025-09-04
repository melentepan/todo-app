import { loadTodosList, saveTodosList } from '@/utils/localStorage'
import type { Todo } from '@/types'
import {
  addTodo,
  changeTodo,
  deleteTodo,
  fetchTodos,
  toggleTodo,
} from '@/api/todos'
import { createSlice, type PayloadAction } from '@reduxjs/toolkit/react'

interface TodoListState {
  todoList: Todo[]
  editingTodo: Todo | null
  loading: boolean
  error: string | null
  page: number
  limit: number
  total: number
}

const initialState: TodoListState = {
  todoList: loadTodosList(),
  editingTodo: null,
  loading: false,
  error: null,
  page: 1,
  limit: 5,
  total: 0,
}

const todoListSlice = createSlice({
  name: 'todoList',
  initialState,
  reducers: {
    setEditingTodo(state, action: PayloadAction<Todo | null>) {
      state.editingTodo = action.payload
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload
    },
    setLimit(state, action: PayloadAction<number>) {
      state.limit = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false
        state.todoList = action.payload.data.reverse()
        state.total = action.payload.total
        saveTodosList(state.todoList)
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload ?? 'Ошибка загрузки'
      })
      .addCase(addTodo.pending, (state) => {
        state.error = null
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.todoList.push(action.payload)

        saveTodosList(state.todoList)
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.error = action.payload ?? 'Ошибка загрузки'
      })
      .addCase(changeTodo.pending, (state, action) => {
        const todo = state.todoList.find(
          (todo) => todo.id === action.meta.arg.id
        )
        if (todo) todo.loading = true
        state.error = null
        state.editingTodo = null
      })
      .addCase(changeTodo.fulfilled, (state, action) => {
        const todo = state.todoList.find(
          (todoItem) => todoItem.id === action.meta.arg.id
        )
        if (todo) {
          todo.text = action.payload.text
          delete todo.loading
        }
        saveTodosList(state.todoList)
      })
      .addCase(changeTodo.rejected, (state, action) => {
        const todo = state.todoList.find(
          (todo) => todo.id === action.meta.arg.id
        )
        if (todo) delete todo.loading
        state.error = action.payload ?? 'Ошибка загрузки'
      })
      .addCase(deleteTodo.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.loading = false

        state.todoList = state.todoList.filter(
          (todoItem) => todoItem.id !== action.payload
        )
        saveTodosList(state.todoList)
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload ?? 'Ошибка загрузки'
      })
      .addCase(toggleTodo.pending, (state, action) => {
        const todo = state.todoList.find((todo) => todo.id === action.meta.arg)
        if (todo) todo.loading = true
        state.error = null
      })
      .addCase(toggleTodo.fulfilled, (state, action) => {
        const todo = state.todoList.find(
          (todoItem) => todoItem.id === action.payload.id
        )
        if (todo) {
          todo.completed = action.payload.completed
          delete todo.loading
        }
        saveTodosList(state.todoList)
      })
      .addCase(toggleTodo.rejected, (state, action) => {
        const todo = state.todoList.find((todo) => todo.id === action.meta.arg)
        if (todo) todo.loading = false

        state.error = action.payload ?? 'Ошибка загрузки'
      })
  },
})

export default todoListSlice.reducer
export const { setEditingTodo, setPage, setLimit } = todoListSlice.actions
