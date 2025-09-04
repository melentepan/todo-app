import { Button, Flex } from 'antd'
import AddTodo from './components/AddTodo/AddTodo'
import TodoList from './components/TodoList/TodoList'
import EditTodo from './components/EditTodo/EditTodo'
import { MoonFilled, SunFilled } from '@ant-design/icons'
import AppWrapper from './components/AppWrapper/AppWrapper'
import { useDispatch } from 'react-redux'
import { switchTheme } from './store/theme/theme.slice'
import useTheme from './hooks/useTheme'
import styled from 'styled-components'

const StyledFlex = styled(Flex)`
  height: 100%;
`

const ChangeThemeButton = styled(Button)`
  align-self: center;
  margin-top: 5px;
  flex-shrink: 0;
`

function App() {
  const dispatch = useDispatch()
  const { isDark } = useTheme()

  function changeThemeHandler() {
    dispatch(switchTheme())
  }

  return (
    <AppWrapper isDark={isDark}>
      <StyledFlex vertical>
        <ChangeThemeButton
          type='primary'
          shape='circle'
          size='large'
          onClick={changeThemeHandler}
        >
          {isDark ? <SunFilled /> : <MoonFilled />}
        </ChangeThemeButton>
        <AddTodo />
        <TodoList />
      </StyledFlex>
      <EditTodo />
    </AppWrapper>
  )
}

export default App
