import { DeleteFilled, EditFilled } from '@ant-design/icons'
import { Button, Checkbox, Flex, Space } from 'antd'
import type { Todo } from '../../types'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import {
  removeTodo,
  setEditingTodo,
  toggleTodo,
} from '../../store/todoList/todoList.slice'

interface TodoItemProps {
  item: Todo
}

interface StyledTodoItemProps {
  $checked?: boolean
}

const TodoItemWrapper = styled(Flex)<StyledTodoItemProps>`
  padding: 10px;
  border: 2px solid
    ${({ $checked, theme }) =>
      $checked ? theme.primary + '80' : theme.primary};
  border-radius: 10px;
  margin-bottom: 8px;
  transition: border-color 0.3s ease;
`

const TodoDescription = styled.p<StyledTodoItemProps>`
  font-size: 18px;
  word-break: break-word;
  text-decoration-line: ${({ $checked }) => ($checked ? 'line-through' : '')};
  opacity: ${({ $checked }) => ($checked ? '0.5' : '1')};
  transition: opacity 0.3s ease;
`

const TodoCheckBox = styled(Checkbox)`
  scale: 1.25;
  margin-left: 2px;
`

export default function TodoItem({ item }: TodoItemProps) {
  const dispatch = useDispatch()

  function checkboxHandler() {
    dispatch(toggleTodo(item.id))
  }

  function editTodoHandler() {
    dispatch(setEditingTodo(item))
  }

  function deleteTodoHandler() {
    dispatch(removeTodo(item.id))
  }

  return (
    <TodoItemWrapper
      $checked={item.completed}
      align='center'
      justify='space-between'
      gap={20}
    >
      <Space size={10}>
        <TodoCheckBox onChange={checkboxHandler} checked={item.completed} />
        <TodoDescription $checked={item.completed}>{item.text}</TodoDescription>
      </Space>
      <Space>
        <Button
          type='primary'
          shape='circle'
          size='large'
          onClick={editTodoHandler}
          disabled={item.completed}
        >
          <EditFilled />
        </Button>
        <Button
          type='primary'
          shape='circle'
          size='large'
          onClick={deleteTodoHandler}
        >
          <DeleteFilled />
        </Button>
      </Space>
    </TodoItemWrapper>
  )
}
