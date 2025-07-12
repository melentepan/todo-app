import { Input, Button, Flex } from 'antd'
import CustomDivider from '../CustomDivider/CustomDivider'

const { TextArea } = Input

export default function AddTodo() {
  return (
    <>
      <CustomDivider>Add task</CustomDivider>
      <Flex vertical gap={10}>
        <Input size='large' placeholder='Task title' />
        <TextArea
          size='large'
          placeholder='Task description'
          autoSize={{ minRows: 1, maxRows: 3 }}
        />
        <Button size='large' type='primary'>
          Add task
        </Button>
      </Flex>
    </>
  )
}
