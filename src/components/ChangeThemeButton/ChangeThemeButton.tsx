import useTheme from '@/hooks/useTheme'
import { switchTheme } from '@/store/theme/theme.slice'
import { MoonFilled, SunFilled } from '@ant-design/icons'
import { Button } from 'antd'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'

const StyledChangeThemeButton = styled(Button)`
  align-self: center;
  margin-top: 5px;
  flex-shrink: 0;
`

export default function ChangeThemeButton() {
  const dispatch = useDispatch()
  const { isDark } = useTheme()

  function changeThemeHandler() {
    dispatch(switchTheme())
  }
  return (
    <StyledChangeThemeButton
      type='primary'
      shape='circle'
      size='large'
      onClick={changeThemeHandler}
    >
      {isDark ? <SunFilled /> : <MoonFilled />}
    </StyledChangeThemeButton>
  )
}
