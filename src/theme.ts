import type { DefaultTheme } from 'styled-components'

export const lightTheme: DefaultTheme = {
  background: '#ffffff',
  text: '#000000',
  primary: '#1777ff',
}

export const darkTheme: DefaultTheme = {
  background: '#181818',
  text: '#ffffff',
  primary: '#0055aa',
}

declare module 'styled-components' {
  export interface DefaultTheme {
    background: string
    text: string
    primary: string
  }
}
