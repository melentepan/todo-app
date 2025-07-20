import { ConfigProvider, theme as antdTheme } from 'antd'
import type { ReactNode } from 'react'
import { darkTheme, lightTheme } from '../../theme'
import GlobalStyle from '../../GlobalStyles'
import styled, { ThemeProvider } from 'styled-components'

const Wrapper = styled.div`
  height: calc(100vh - 20px);
  max-width: 600px;
  padding: 0 15px;
  margin: 0 auto;
  overflow: auto;
  background-color: transparent;
  color: ${({ theme }) => theme.text};
  border-left: 1px solid ${({ theme }) => theme.text};
  border-right: 1px solid ${({ theme }) => theme.text};
`

interface AppWrapperProps {
  children: ReactNode
  isDark: boolean
}

export default function AppWrapper({ children, isDark }: AppWrapperProps) {
  const styledTheme = isDark ? darkTheme : lightTheme

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <ConfigProvider
        theme={{
          algorithm: isDark
            ? antdTheme.darkAlgorithm
            : antdTheme.defaultAlgorithm,
          token: {
            colorPrimary: styledTheme.primary,
            colorBgBase: styledTheme.background,
            colorText: styledTheme.text,
          },
        }}
      >
        <GlobalStyle />
        <Wrapper>{children}</Wrapper>
      </ConfigProvider>
    </ThemeProvider>
  )
}
