import { useTheme } from '@/hooks/useTheme'
import {
  AppWrapper,
  ChangeThemeButton,
  MainPageButton,
  ProfileMenu,
} from '@components'
import { Outlet } from 'react-router-dom'
import { Flex } from 'antd'
import styled from 'styled-components'

const StyledFlex = styled(Flex)`
  margin-bottom: 8px;
`

export function Layout() {
  const { isDark } = useTheme()

  return (
    <AppWrapper isDark={isDark}>
      <StyledFlex align='center' justify='flex-end' gap={10}>
        <MainPageButton />
        <ChangeThemeButton />
        <ProfileMenu />
      </StyledFlex>

      <Outlet />
    </AppWrapper>
  )
}
