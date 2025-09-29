import { createSlice } from '@reduxjs/toolkit'
import type { StatusType } from '@/types'
import { statusCycle } from '@/constants'

interface SortingTodoListState {
  status: StatusType
  order: 'asc' | 'desc'
}

const initialState: SortingTodoListState = {
  status: statusCycle[0],
  order: 'desc',
}

const sortingTodoListSlice = createSlice({
  name: 'sortingTodoList',
  initialState,
  reducers: {
    switchOrder(state) {
      if (state.order === 'asc') {
        state.order = 'desc'
      } else {
        state.order = 'asc'
      }
    },
    switchStatus(state) {
      const currentIndex = statusCycle.indexOf(state.status)
      const nextIndex = (currentIndex + 1) % statusCycle.length
      state.status = statusCycle[nextIndex]
    },
  },
})

export const sortingTodoListReducer = sortingTodoListSlice.reducer

export const { switchOrder, switchStatus } = sortingTodoListSlice.actions
