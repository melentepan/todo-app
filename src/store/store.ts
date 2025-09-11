import { configureStore } from '@reduxjs/toolkit'
import themeReducer from './theme/theme.slice'
import todoListReducer from './todoList/todoList.slice'
import sortingTodoListReducer from './sortingTodoList/sortingTodoList.slice'
import authReducer from './auth/auth.slice'

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    todoList: todoListReducer,
    sortingTodoList: sortingTodoListReducer,
    auth: authReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
