import { configureStore } from '@reduxjs/toolkit'
import themeReducer from './theme/theme.slice'
import todoListReducer from './todoList/todoList.slice'
import sortingTodoListReducer from './sortingTodoList/sortingTodoList.slice'

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    todoList: todoListReducer,
    sortingTodoList: sortingTodoListReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
