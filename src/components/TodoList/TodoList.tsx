import CustomDivider from '../CustomDivider/CustomDivider'
import { List } from 'antd'
import TodoItem from '../TodoItem/TodoItem'
import type { Todo } from '../../types'

interface TodoListProps {
  todosList: Todo[]
  setTodosList: React.Dispatch<React.SetStateAction<Todo[]>>
}

export default function TodoList({ todosList, setTodosList }: TodoListProps) {
  return (
    <div>
      <CustomDivider>Task list</CustomDivider>
      <List
        itemLayout='horizontal'
        dataSource={todosList}
        renderItem={(item) => TodoItem({ item, setTodosList })}
      />
    </div>
  )
}
