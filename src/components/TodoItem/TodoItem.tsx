import { CheckOutlined, DeleteFilled, EditFilled } from '@ant-design/icons'
import { Button, Flex, Space } from 'antd'
import type { Todo } from '../../types'
import styled from 'styled-components'

interface TodoItemProps {
  item: Todo
  setTodosList: React.Dispatch<React.SetStateAction<Todo[]>>
}

interface StyledTodoItemProps {
  $checked?: boolean
}

const TodoItemWrapper = styled(Flex)<StyledTodoItemProps>`
  padding: 10px;
  border: 2px solid ${({ $checked }) => ($checked ? '#1777ffa0' : '#1777ff')};
  border-radius: 10px;
  margin-bottom: 8px;
`

const TodoCheckbox = styled(Button)<StyledTodoItemProps>`
  background-color: ${({ $checked }) => ($checked ? '#1777ff' : 'transparent')};
  color: ${({ $checked }) => ($checked ? 'white' : 'transparent')};
  border: 2px solid #1777ff;

  svg {
    scale: 1.25;
  }

  &:hover {
    color: ${({ $checked }) =>
      $checked ? 'transparent' : '#1777ff80'} !important;
  }
`

const TodoDescription = styled.p<StyledTodoItemProps>`
  font-size: 18px;
  word-break: break-word;
  text-decoration-line: ${({ $checked }) => ($checked ? 'line-through' : '')};
  opacity: ${({ $checked }) => ($checked ? '0.5' : '1')};
`

export default function TodoItem({ item, setTodosList }: TodoItemProps) {
  const isChecked = item.completed

  function checkboxHandler() {
    setTodosList((prev) =>
      prev.map((todoItem) =>
        todoItem.id === item.id
          ? { ...todoItem, completed: !todoItem.completed }
          : todoItem
      )
    )
  }

  function editTodoHandler() {}

  function deleteTodoHandler() {
    setTodosList((prev) => prev.filter((todoItem) => todoItem.id !== item.id))
  }

  return (
    <TodoItemWrapper
      $checked={isChecked}
      align='center'
      justify='space-between'
      gap={20}
    >
      <Space>
        <TodoCheckbox
          $checked={isChecked}
          shape='circle'
          icon={<CheckOutlined />}
          onClick={checkboxHandler}
        />
        <TodoDescription $checked={isChecked}>{item.text}</TodoDescription>
      </Space>
      <Space>
        <Button
          type='primary'
          shape='circle'
          size='large'
          onClick={editTodoHandler}
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
