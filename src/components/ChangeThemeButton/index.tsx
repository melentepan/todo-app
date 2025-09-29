import { useTheme } from '@/hooks/useTheme'
import { switchTheme } from '@/store/theme/theme.slice'
import { MoonFilled, SunFilled } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { StyledCircleButton } from '../StyledCircleButton'

export function ChangeThemeButton() {
  const dispatch = useDispatch()
  const { isDark } = useTheme()

  function changeThemeHandler() {
    dispatch(switchTheme())
  }
  return (
    <StyledCircleButton
      type='primary'
      shape='circle'
      size='large'
      onClick={changeThemeHandler}
    >
      {isDark ? <SunFilled /> : <MoonFilled />}
    </StyledCircleButton>
  )
}
