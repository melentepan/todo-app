import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import type { AddTodoBody, Todo, TodoResponse, UpdateTodoBody } from '../types'
import type { AppDispatch, RootState } from '../store/store'

const API_URL = 'http://localhost:3001/todos'

export const fetchTodos = createAsyncThunk<
  TodoResponse,
  { page: number; limit: number },
  { rejectValue: string }
>('todos/fetchTodos', async ({ page, limit }, { rejectWithValue }) => {
  try {
    const response = await axios.get<TodoResponse>(
      `${API_URL}?page=${page}&limit=${limit}`
    )
    return response.data
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      return rejectWithValue(err.response?.statusText || 'Ошибка запроса')
    }
    return rejectWithValue('Неизвестная ошибка')
  }
})

export const addTodo = createAsyncThunk<
  Todo,
  AddTodoBody,
  { state: RootState; rejectValue: string; dispatch: AppDispatch }
>('todos/addTodo', async (body, { getState, rejectWithValue, dispatch }) => {
  try {
    const response = await axios.post<Todo>(`${API_URL}`, body)

    const state = getState()
    const { limit, page } = state.todoList

    dispatch(fetchTodos({ limit, page }))

    return response.data
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      return rejectWithValue(err.response?.statusText || 'Ошибка запроса')
    }
    return rejectWithValue('Неизвестная ошибка')
  }
})

export const changeTodo = createAsyncThunk<
  Todo,
  { id: number; body: UpdateTodoBody },
  { rejectValue: string }
>('todos/changeTodo', async ({ id, body }, { rejectWithValue }) => {
  try {
    const response = await axios.put<Todo>(`${API_URL}/${id}`, body)
    return response.data
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      return rejectWithValue(err.response?.statusText || 'Ошибка запроса')
    }
    return rejectWithValue('Неизвестная ошибка')
  }
})

export const deleteTodo = createAsyncThunk<
  number,
  number,
  { state: RootState; rejectValue: string }
>('todos/deleteTodo', async (id, { getState, rejectWithValue, dispatch }) => {
  try {
    await axios.delete(`${API_URL}/${id}`)
    const state = getState()
    const { limit, page } = state.todoList

    dispatch(fetchTodos({ limit, page }))
    return id
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      return rejectWithValue(err.response?.statusText || 'Ошибка запроса')
    }
    return rejectWithValue('Неизвестная ошибка')
  }
})

export const toggleTodo = createAsyncThunk<
  Todo,
  number,
  { rejectValue: string }
>('todos/toggleTodo', async (id, { rejectWithValue }) => {
  try {
    const response = await axios.patch<Todo>(`${API_URL}/${id}/toggle`)
    return response.data
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      return rejectWithValue(err.response?.statusText || 'Ошибка запроса')
    }
    return rejectWithValue('Неизвестная ошибка')
  }
})
