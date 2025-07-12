import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import GlobalStyle from './GlobalStyles.ts'
import styled from 'styled-components'

const AppWrapper = styled.div`
  height: calc(100vh - 20px);
  max-width: 600px;
  padding: 10px 15px;
  border-left: 3px solid #61afee;
  border-right: 3px solid #61afee;
  margin: 0 auto;
`

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GlobalStyle />
    <AppWrapper>
      <App />
    </AppWrapper>
  </StrictMode>
)
