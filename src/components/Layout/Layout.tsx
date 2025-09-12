import useTheme from '@/hooks/useTheme'
import AppWrapper from '../AppWrapper/AppWrapper'
import { Outlet } from 'react-router-dom'
import ChangeThemeButton from '../ChangeThemeButton/ChangeThemeButton'
import { Flex } from 'antd'
import styled from 'styled-components'
import ProfileMenu from '../ProfileMenu/ProfileMenu'
import MainPageButton from '../MainPageButton/MainPageButton'

const StyledFlex = styled(Flex)`
  margin-bottom: 8px;
`

export default function Layout() {
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
