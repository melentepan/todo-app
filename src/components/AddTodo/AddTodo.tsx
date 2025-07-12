import { Divider, Input, Button, Flex } from 'antd'
import styled from 'styled-components'

const { TextArea } = Input

const CustomDivider = styled(Divider)`
  && {
    border-color: black;
  }

  && .ant-divider-inner-text {
    font-size: 24px;
    color: black;
  }
`

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
