import { Flex } from 'antd'
import AddTodo from './components/AddTodo/AddTodo'
import TodoList from './components/TodoList/TodoList'
import EditTodo from './components/EditTodo/EditTodo'
import AppWrapper from './components/AppWrapper/AppWrapper'
import useTheme from './hooks/useTheme'
import styled from 'styled-components'
import ChangeThemeButton from './components/ChangeThemeButton/ChangeThemeButton'

const StyledFlex = styled(Flex)`
  height: 100%;
`

function App() {
  const { isDark } = useTheme()

  return (
    <AppWrapper isDark={isDark}>
      <StyledFlex vertical>
        <ChangeThemeButton />
        <AddTodo />
        <TodoList />
      </StyledFlex>
      <EditTodo />
    </AppWrapper>
  )
}

export default App
