import { Button, Flex } from 'antd'
import AddTodo from './components/AddTodo/AddTodo'
import TodoList from './components/TodoList/TodoList'
import EditTodo from './components/EditTodo/EditTodo'
import { MoonFilled, SunFilled } from '@ant-design/icons'
import AppWrapper from './components/AppWrapper/AppWrapper'
import { useDispatch } from 'react-redux'
import { switchTheme } from './store/theme/theme.slice'
import useTheme from './hooks/useTheme'

function App() {
  const dispatch = useDispatch()
  const { isDark } = useTheme()

  function changeThemeHandler() {
    dispatch(switchTheme())
  }

  return (
    <AppWrapper isDark={isDark}>
      <Flex vertical>
        <Button
          type='primary'
          shape='circle'
          size='large'
          onClick={changeThemeHandler}
          style={{ alignSelf: 'center', marginTop: '5px' }}
        >
          {isDark ? <SunFilled /> : <MoonFilled />}
        </Button>
        <AddTodo />
        <TodoList />
      </Flex>
      <EditTodo />
    </AppWrapper>
  )
}

export default App
