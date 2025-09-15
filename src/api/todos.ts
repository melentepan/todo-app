import { createAsyncThunk } from '@reduxjs/toolkit'
import { privateApi } from './privateApi'
import type { AddTodoBody, Todo, TodoResponse, UpdateTodoBody } from '@/types'
import type { AppDispatch, RootState } from '@/store/store'
import axios from 'axios'

export const fetchTodos = createAsyncThunk<
  TodoResponse,
  { page: number; limit: number },
  { rejectValue: string }
>('todos/fetchTodos', async ({ page, limit }, { rejectWithValue }) => {
  try {
    const response = await privateApi.get<TodoResponse>('/todos', {
      params: { page, limit },
    })
    return response.data
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      return rejectWithValue(err.response?.data?.message || 'Ошибка запроса')
    }
    return rejectWithValue('Произошла неизвестная ошибка')
  }
})

export const addTodo = createAsyncThunk<
  Todo,
  AddTodoBody,
  { state: RootState; rejectValue: string; dispatch: AppDispatch }
>('todos/addTodo', async (body, { getState, rejectWithValue, dispatch }) => {
  try {
    const response = await privateApi.post<Todo>('/todos', body)

    const state = getState()
    const { limit, page } = state.todoList
    dispatch(fetchTodos({ limit, page }))

    return response.data
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      return rejectWithValue(err.response?.data?.message || 'Ошибка запроса')
    }
    return rejectWithValue('Произошла неизвестная ошибка')
  }
})

export const changeTodo = createAsyncThunk<
  Todo,
  { id: number; body: UpdateTodoBody },
  { rejectValue: string }
>('todos/changeTodo', async ({ id, body }, { rejectWithValue }) => {
  try {
    const response = await privateApi.put<Todo>(`/todos/${id}`, body)
    return response.data
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      return rejectWithValue(err.response?.data?.message || 'Ошибка запроса')
    }
    return rejectWithValue('Произошла неизвестная ошибка')
  }
})

export const deleteTodo = createAsyncThunk<
  number,
  number,
  { state: RootState; rejectValue: string; dispatch: AppDispatch }
>('todos/deleteTodo', async (id, { getState, rejectWithValue, dispatch }) => {
  try {
    await privateApi.delete(`/todos/${id}`)

    const state = getState()
    const { limit, page } = state.todoList
    dispatch(fetchTodos({ limit, page }))

    return id
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      return rejectWithValue(err.response?.data?.message || 'Ошибка запроса')
    }
    return rejectWithValue('Произошла неизвестная ошибка')
  }
})

export const toggleTodo = createAsyncThunk<
  Todo,
  number,
  { rejectValue: string }
>('todos/toggleTodo', async (id, { rejectWithValue }) => {
  try {
    const response = await privateApi.patch<Todo>(`/todos/${id}/toggle`)
    return response.data
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      return rejectWithValue(err.response?.data?.message || 'Ошибка запроса')
    }
    return rejectWithValue('Произошла неизвестная ошибка')
  }
})
