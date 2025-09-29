import { DeleteFilled, EditFilled } from '@ant-design/icons'
import { Button, Checkbox, Flex, Space, Spin } from 'antd'
import type { Todo } from '@/types'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import type { AppDispatch } from '@/store'
import { deleteTodo, toggleTodo } from '@/api/todos'
import { setEditingTodo } from '@/store/todoList/todoList.slice'

interface TodoItemProps {
  item: Todo
}

interface StyledTodoItemProps {
  $checked?: boolean
  $loading?: boolean
}

const TodoItemWrapper = styled(Flex)<StyledTodoItemProps>`
  position: relative;
  padding: 10px;
  border: 2px solid
    ${({ $checked, $loading, theme }) =>
      $checked || $loading ? theme.primary + '80' : theme.primary};
  border-radius: 10px;
  margin-bottom: 8px;
  transition: border-color 0.3s ease;
`

const TodoDescription = styled.p<StyledTodoItemProps>`
  font-size: 18px;
  word-break: break-word;
  text-decoration-line: ${({ $checked }) => ($checked ? 'line-through' : '')};
  opacity: ${({ $checked, $loading }) => ($checked || $loading ? '0.5' : '1')};
  transition: opacity 0.3s ease;
`

const TodoCheckBox = styled(Checkbox)`
  scale: 1.25;
  margin-left: 2px;
`

const TodoSpin = styled(Spin)<StyledTodoItemProps>`
  display: ${({ $loading }) => ($loading ? 'flex' : 'none')};
  position: absolute;
  inset: 0;
  justify-content: center;
  align-items: center;
`

export function TodoItem({ item }: TodoItemProps) {
  const dispatch = useDispatch<AppDispatch>()

  function checkboxHandler() {
    dispatch(toggleTodo(item.id))
  }

  function editTodoHandler() {
    dispatch(setEditingTodo(item))
  }

  function deleteTodoHandler() {
    dispatch(deleteTodo(item.id))
  }

  return (
    <TodoItemWrapper
      $loading={item.loading}
      $checked={item.completed}
      align='center'
      justify='space-between'
      gap={20}
    >
      <Space size={10}>
        <TodoCheckBox onChange={checkboxHandler} checked={item.completed} />
        <TodoDescription $checked={item.completed} $loading={item.loading}>
          {item.text}
        </TodoDescription>
      </Space>
      <Space>
        <Button
          type='primary'
          shape='circle'
          size='large'
          onClick={editTodoHandler}
          disabled={item.completed || item.loading}
        >
          <EditFilled />
        </Button>
        <Button
          type='primary'
          shape='circle'
          size='large'
          onClick={deleteTodoHandler}
          disabled={item.loading}
        >
          <DeleteFilled />
        </Button>
      </Space>
      <TodoSpin $loading={item.loading} />
    </TodoItemWrapper>
  )
}
