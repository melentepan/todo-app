import { Input, Button, Flex } from 'antd'
import CustomDivider from '../CustomDivider/CustomDivider'
import type { Todo } from '../../types'
import { useState } from 'react'

interface AddTodoProps {
  setTodosList: React.Dispatch<React.SetStateAction<Todo[]>>
}

export default function AddTodo({ setTodosList }: AddTodoProps) {
  const [inputValue, setInputValue] = useState('')

  function addTaskHandler() {
    if (inputValue.trim() !== '') {
      const newTodo: Todo = {
        id: Date.now(),
        text: inputValue,
        completed: false,
        createdAt: new Date(),
      }

      setTodosList((prev) => {
        return [...prev, newTodo]
      })

      setInputValue('')
    }
  }

  return (
    <div>
      <CustomDivider>Добавить задачу</CustomDivider>
      <Flex vertical gap={10}>
        <Input
          size='large'
          showCount
          maxLength={50}
          placeholder='Задача'
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
        />
        <Button size='large' type='primary' onClick={() => addTaskHandler()}>
          Добавить задачу
        </Button>
      </Flex>
    </div>
  )
}
