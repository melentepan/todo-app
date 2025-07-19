import { Button, Flex } from 'antd'
import CustomDivider from '../CustomDivider/CustomDivider'
import type { Todo } from '../../types'
import { useState } from 'react'
import ValidatedInput from '../ValidatedInput/ValidatedInput'

interface AddTodoProps {
  setTodosList: React.Dispatch<React.SetStateAction<Todo[]>>
}

export default function AddTodo({ setTodosList }: AddTodoProps) {
  const [inputValue, setInputValue] = useState('')
  const [isValid, setIsValid] = useState(true)

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
    } else {
      setIsValid(false)
    }
  }

  function onChangeHandler(newValue: string) {
    setInputValue(newValue)
    setIsValid(true)
  }

  return (
    <div>
      <CustomDivider>Добавить задачу</CustomDivider>
      <Flex vertical gap={10}>
        <ValidatedInput
          isValid={isValid}
          inputValue={inputValue}
          onChange={onChangeHandler}
          onFocus={() => setIsValid(true)}
        />
        <Button size='large' type='primary' onClick={() => addTaskHandler()}>
          Добавить задачу
        </Button>
      </Flex>
    </div>
  )
}
