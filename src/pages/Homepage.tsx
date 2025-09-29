import { AddTodo, EditTodo, TodoList } from '@components'
import { Flex } from 'antd'
import styled from 'styled-components'

const StyledFlex = styled(Flex)`
  height: calc(100% - 53px);
`

export function Homepage() {
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
