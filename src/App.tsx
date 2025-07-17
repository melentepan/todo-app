import { Flex } from 'antd'
import AddTodo from './components/AddTodo/AddTodo'
import TodoList from './components/TodoList/TodoList'
import { useState } from 'react'
import type { Todo } from './types'
import PopUp from './components/Modal/PopUp'

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
    <>
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
    </>
  )
}

export default App
