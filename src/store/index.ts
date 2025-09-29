import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from './auth/auth.slice'
import { themeReducer } from './theme/theme.slice'
import { todoListReducer } from './todoList/todoList.slice'
import { sortingTodoListReducer } from './sortingTodoList/sortingTodoList.slice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    todoList: todoListReducer,
    sortingTodoList: sortingTodoListReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
