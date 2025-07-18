import { Button, Flex } from 'antd'
import AddTodo from './components/AddTodo/AddTodo'
import TodoList from './components/TodoList/TodoList'
import { useState } from 'react'
import type { Todo } from './types'
import PopUp from './components/Modal/PopUp'
import { MoonFilled, SunFilled } from '@ant-design/icons'
import AppWrapper from './components/AppWrapper/AppWrapper'

function App() {
  const [isDark, setIsDark] = useState(false)
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
    <AppWrapper isDark={isDark}>
      <Flex vertical>
        <Button
          type='primary'
          shape='circle'
          size='large'
          onClick={() => {
            setIsDark((prev) => !prev)
          }}
          style={{ alignSelf: 'center', marginTop: '5px' }}
        >
          {isDark ? <SunFilled /> : <MoonFilled />}
        </Button>
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
