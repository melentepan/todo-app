import { Flex } from 'antd'
import AddTodo from './components/AddTodo/AddTodo'
import TodoList from './components/TodoList/TodoList'

function App() {
  return (
    <Flex vertical gap={50}>
      <AddTodo />
      <TodoList />
    </Flex>
  )
}

export default App
