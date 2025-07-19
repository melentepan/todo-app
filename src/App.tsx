import { Button, Flex } from 'antd'
import AddTodo from './components/AddTodo/AddTodo'
import TodoList from './components/TodoList/TodoList'
import { useEffect, useState } from 'react'
import type { Todo } from './types'
import EditPopUp from './components/EditPopUp/EditPopUp'
import { MoonFilled, SunFilled } from '@ant-design/icons'
import AppWrapper from './components/AppWrapper/AppWrapper'
import {
  loadIsDarkTheme,
  loadTodosList,
  saveIsDarkTheme,
  saveTodosList,
} from './utils/localStorage'

function App() {
  const [isDark, setIsDark] = useState(loadIsDarkTheme())
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null)
  const [todosList, setTodosList] = useState<Todo[]>(loadTodosList())

  function changeThemeHandler() {
    const newValue = !isDark
    setIsDark(newValue)
  }

  useEffect(() => {
    saveIsDarkTheme(isDark)
  }, [isDark])

  useEffect(() => {
    saveTodosList(todosList)
  }, [todosList])

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
        <AddTodo setTodosList={setTodosList} />
        <TodoList
          todosList={todosList}
          setTodosList={setTodosList}
          setEditingTodo={setEditingTodo}
        />
      </Flex>
      <EditPopUp
        editingTodo={editingTodo}
        setEditingTodo={setEditingTodo}
        setTodosList={setTodosList}
      />
    </AppWrapper>
  )
}

export default App
