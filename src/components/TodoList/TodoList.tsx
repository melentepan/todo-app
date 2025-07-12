import CustomDivider from '../CustomDivider/CustomDivider'
import { List } from 'antd'
import TodoItem from '../TodoItem/TodoItem'

const data = [
  {
    title: 'Ant Design Title 1',
    description: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
    description: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
    description: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
    description: 'Ant Design Title 4',
  },
]

export default function TodoList() {
  return (
    <div>
      <CustomDivider>Task list</CustomDivider>
      <List
        itemLayout='horizontal'
        dataSource={data}
        renderItem={(item) => TodoItem(item)}
      />
    </div>
  )
}
