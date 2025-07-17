import { Flex } from 'antd'
import AddTodo from './components/AddTodo/AddTodo'
import TodoList from './components/TodoList/TodoList'
import { useState } from 'react'
import type { Todo } from './types'
import PopUp from './components/Modal/PopUp'
import styled from 'styled-components'

const AppWrapper = styled.div`
  height: calc(100vh - 20px);
  max-width: 600px;
  padding: 0 15px;
  border-left: 3px solid #1777ff;
  border-right: 3px solid #1777ff;
  margin: 0 auto;
  overflow: auto;
`

function App() {
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null)

  const [todosList, setTodosList] = useState<Todo[]>(
    Array.from({ length: 15 }, (_, i) => ({
      id: i + 1,
      text: `Task #${i + 1}`,
      completed: Math.random() < 0.5,
      createdAt: new Date(Date.now() - Math.floor(Math.random() * 1000000000)),
    }))
  )

  return (
    <AppWrapper>
      <Flex vertical gap={15}>
        <AddTodo setTodosList={setTodosList} />
        <TodoList
          todosList={todosList}
          setTodosList={setTodosList}
          setEditingTodo={setEditingTodo}
        />
      </Flex>
      <PopUp
        editingTodo={editingTodo}
        setEditingTodo={setEditingTodo}
        setTodosList={setTodosList}
      />
    </AppWrapper>
  )
}

export default App
