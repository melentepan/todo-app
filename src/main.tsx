import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import GlobalStyle from './GlobalStyles.ts'
import styled from 'styled-components'

const AppWrapper = styled.div`
  height: calc(100vh - 20px);
  max-width: 600px;
  padding: 0 15px;
  border-left: 3px solid #1777ff;
  border-right: 3px solid #1777ff;
  margin: 0 auto;
  overflow: auto;
`

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GlobalStyle />
    <AppWrapper>
      <App />
    </AppWrapper>
  </StrictMode>
)
