import type { DefaultTheme } from 'styled-components'

export const lightTheme: DefaultTheme = {
  background: '#ffffff',
  text: '#000000',
  primary: '#1777ff',
  error: '#f5222d',
}

export const darkTheme: DefaultTheme = {
  background: '#181818',
  text: '#ffffff',
  primary: '#0055aa',
  error: '#e34346',
}

declare module 'styled-components' {
  export interface DefaultTheme {
    background: string
    text: string
    primary: string
    error: string
  }
}
