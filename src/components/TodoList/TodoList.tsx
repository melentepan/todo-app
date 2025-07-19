import CustomDivider from '../CustomDivider/CustomDivider'
import { Empty, List } from 'antd'
import TodoItem from '../TodoItem/TodoItem'
import type { Todo } from '../../types'

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
  return (
    <>
      <CustomDivider>Список задач</CustomDivider>
      <List
        itemLayout='horizontal'
        dataSource={todosList}
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
    </>
  )
}
