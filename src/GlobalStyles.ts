import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body {
    height: 100%;
    font-family: sans-serif;
    transition: background 0.3s ease, color 0.3s ease;
  }

body {
  padding: 10px
}

  button {
    font-family: inherit;
    cursor: pointer;
  }
`

export default GlobalStyle
