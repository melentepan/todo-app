import { Button, Flex } from 'antd'
import { useInput } from '@/hooks/useInput'
import { addTodo } from '@/api/todos'
import type { AddTodoBody } from '@/types'
import type { AppDispatch } from '@/store'
import { CustomDivider, ValidatedInput } from '@components'

import { useDispatch } from 'react-redux'

export function AddTodo() {
  const dispatch = useDispatch<AppDispatch>()
  const { inputValue, setInputValue, isValid, onChange, validate, setIsValid } =
    useInput('')

  function addTaskHandler() {
    if (validate()) {
      const newTodo: AddTodoBody = {
        text: inputValue,
      }

      dispatch(addTodo(newTodo))

      setInputValue('')
    }
  }

  return (
    <section>
      <CustomDivider>Добавить задачу</CustomDivider>
      <Flex vertical gap={10}>
        <ValidatedInput
          isValid={isValid}
          inputValue={inputValue}
          onChange={onChange}
          onFocus={() => setIsValid(true)}
        />
        <Button size='large' type='primary' onClick={() => addTaskHandler()}>
          Добавить задачу
        </Button>
      </Flex>
    </section>
  )
}
