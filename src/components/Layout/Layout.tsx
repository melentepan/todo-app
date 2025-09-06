import useTheme from '@/hooks/useTheme'
import AppWrapper from '../AppWrapper/AppWrapper'
import { Outlet } from 'react-router-dom'
import ChangeThemeButton from '../ChangeThemeButton/ChangeThemeButton'
import { Flex } from 'antd'

export default function Layout() {
  const { isDark } = useTheme()

  return (
    <AppWrapper isDark={isDark}>
      <Flex vertical>
        <ChangeThemeButton />
      </Flex>

      <Outlet />
    </AppWrapper>
  )
}
