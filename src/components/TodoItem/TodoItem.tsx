import { DeleteFilled, EditFilled } from '@ant-design/icons'
import { Button, List, Space } from 'antd'

export default function TodoItem(item: { title: string; description: string }) {
  return (
    <List.Item>
      <List.Item.Meta title={item.title} description={item.description} />
      <Space>
        <Button type='primary' shape='circle' size='large'>
          <EditFilled />
        </Button>
        <Button type='primary' shape='circle' size='large'>
          <DeleteFilled />
        </Button>
      </Space>
    </List.Item>
  )
}
