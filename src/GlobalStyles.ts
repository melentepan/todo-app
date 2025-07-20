import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

body {
    height: 100%;
    font-family: sans-serif;
    transition: background 0.3s ease, color 0.3s ease;
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    transition: background-color 0.3s ease, color 0.3s ease;
    padding: 10px;
  }
`

export default GlobalStyle
