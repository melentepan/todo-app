import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import type { AddTodoBody, Todo, TodoResponse, UpdateTodoBody } from '../types'

const API_URL = 'http://localhost:3001/todos'

export const fetchTodos = createAsyncThunk<
  TodoResponse,
  { page: number; limit: number },
  { rejectValue: string }
>('todos/fetchTodos', async ({ page, limit }, { rejectWithValue }) => {
  try {
    console.log('start fetch')
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
  { rejectValue: string }
>('todos/addTodo', async (body, { rejectWithValue }) => {
  try {
    const response = await axios.post<Todo>(`${API_URL}`, body)
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
  { rejectValue: string }
>('todos/deleteTodo', async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`${API_URL}/${id}`)
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
