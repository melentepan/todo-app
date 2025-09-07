import useTheme from '@/hooks/useTheme'
import AppWrapper from '../AppWrapper/AppWrapper'
import { Outlet } from 'react-router-dom'
import ChangeThemeButton from '../ChangeThemeButton/ChangeThemeButton'
import { Flex } from 'antd'
import styled from 'styled-components'

const StyledFlex = styled(Flex)`
  margin-bottom: 16px;
`

export default function Layout() {
  const { isDark } = useTheme()

  return (
    <AppWrapper isDark={isDark}>
      <StyledFlex vertical>
        <ChangeThemeButton />
      </StyledFlex>

      <Outlet />
    </AppWrapper>
  )
}
