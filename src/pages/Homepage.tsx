import AddTodo from '@/components/AddTodo/AddTodo'
import EditTodo from '@/components/EditTodo/EditTodo'
import TodoList from '@/components/TodoList/TodoList'
import { Flex } from 'antd'
import styled from 'styled-components'

const StyledFlex = styled(Flex)`
  height: 100%;
`

export default function Homepage() {
  return (
    <>
      <StyledFlex vertical>
        <AddTodo />
        <TodoList />
      </StyledFlex>
      <EditTodo />
    </>
  )
}
