import { Button, Flex } from 'antd'
import CustomDivider from '../CustomDivider/CustomDivider'
import type { Todo } from '../../types'
import ValidatedInput from '../ValidatedInput/ValidatedInput'
import { useInput } from '../../hooks/useInput'
import { useDispatch } from 'react-redux'
import { addTodo } from '../../store/todoList/todoList.slice'

export default function AddTodo() {
  const dispatch = useDispatch()
  const { inputValue, setInputValue, isValid, onChange, validate, setIsValid } =
    useInput('')

  function addTaskHandler() {
    if (validate()) {
      const newTodo: Todo = {
        id: Date.now(),
        text: inputValue,
        completed: false,
        createdAt: new Date(),
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
