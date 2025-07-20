import CustomDivider from '../CustomDivider/CustomDivider'
import { Button, Empty, Flex, List } from 'antd'
import TodoItem from '../TodoItem/TodoItem'
import type { StatusType, Todo } from '../../types'
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { statusCycle, statusText } from '../../constants'
import todoSorting from '../../utils/todoSorting'

interface TodoListProps {
  todosList: Todo[]
  setTodosList: React.Dispatch<React.SetStateAction<Todo[]>>
  setEditingTodo: React.Dispatch<React.SetStateAction<Todo | null>>
}

export default function TodoList({
  todosList,
  setTodosList,
  setEditingTodo,
}: TodoListProps) {
  const [{ status, order }, setSortOptions] = useState<{
    status: StatusType
    order: 'asc' | 'desc'
  }>({
    status: statusCycle[0],
    order: 'asc',
  })

  function orderButtonHandler() {
    if (order === 'asc') {
      setSortOptions((prev) => ({ ...prev, order: 'desc' }))
    } else {
      setSortOptions((prev) => ({ ...prev, order: 'asc' }))
    }
  }

  function statusButtonHandler() {
    setSortOptions((prev) => {
      const currentIndex = statusCycle.indexOf(prev.status)
      const nextIndex = (currentIndex + 1) % statusCycle.length
      return { ...prev, status: statusCycle[nextIndex] }
    })
  }

  return (
    <section>
      <CustomDivider>Список задач</CustomDivider>
      <Flex gap={10}>
        <Button
          size='large'
          type='primary'
          style={{ width: '100%' }}
          onClick={statusButtonHandler}
        >
          {statusText[status]}
        </Button>
        <Button
          size='large'
          type='primary'
          shape='circle'
          disabled={status !== 'date' && status !== 'text'}
          icon={order === 'asc' ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
          onClick={orderButtonHandler}
        />
      </Flex>
      <List
        style={{ marginTop: '20px' }}
        itemLayout='horizontal'
        dataSource={todoSorting(todosList, status, order)}
        locale={{
          emptyText: (
            <Empty
              description='Список задач пуст'
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          ),
        }}
        renderItem={(item) => (
          <TodoItem
            key={item.id}
            item={item}
            setTodosList={setTodosList}
            setEditingTodo={setEditingTodo}
          />
        )}
      />
    </section>
  )
}
