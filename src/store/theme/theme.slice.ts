import { createSlice } from '@reduxjs/toolkit'
import { loadIsDarkTheme, saveIsDarkTheme } from '@/utils/localStorage'

interface ThemeState {
  isDark: boolean
}

const initialState: ThemeState = {
  isDark: loadIsDarkTheme(),
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    switchTheme(state) {
      const newValue = !state.isDark
      saveIsDarkTheme(newValue)
      state.isDark = newValue
    },
  },
})

export default themeSlice.reducer

export const { switchTheme } = themeSlice.actions
