import CustomDivider from '@/components/CustomDivider/CustomDivider'
import {
  Button,
  Empty,
  Flex,
  List,
  Pagination,
  Spin,
  type ListProps,
} from 'antd'
import TodoItem from '@/components/TodoItem/TodoItem'
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons'
import { statusText } from '@/constants'
import todoSorting from '@/utils/todoSorting'
import useTodoList from '@/hooks/useTodoList'
import { useDispatch } from 'react-redux'
import {
  switchOrder,
  switchStatus,
} from '@/store/sortingTodoList/sortingTodoList.slice'
import useSortingTodoList from '@/hooks/useSortingTodoList'
import { useEffect } from 'react'
import { fetchTodos } from '@/api/todos'
import type { AppDispatch } from '@/store/store'
import styled from 'styled-components'
import { setLimit, setPage } from '@/store/todoList/todoList.slice'
import type { Todo } from '@/types'

const SpinTip = styled.span`
  opacity: 0.75;
  margin-top: 10px;
`

const ErrorTip = styled.span`
  color: ${({ theme }) => theme.error};
  font-size: 20px;
`

const ErrorIcon = styled(InfoCircleOutlined)`
  color: ${({ theme }) => theme.error};
  font-size: 24px;
`

const StyledFlex = styled(Flex)`
  height: 100%;
  margin-top: 20px;
`

const StatusButton = styled(Button)`
  width: 100%;
`

interface StyledListProps<T> extends ListProps<T> {
  isEmpty: boolean
}

const StyledList = styled(List)<StyledListProps<Todo>>`
  margin-top: 20px;
  height: 100%;
  ${(props) =>
    props.isEmpty &&
    `
      display: flex;
      justify-content: center;
      align-items: center;
    `}
`

const StyledPagination = styled(Pagination)`
  margin: 0 auto;
`

export default function TodoList() {
  const { todoList, loading, error, limit, page, total } = useTodoList()
  const dispatch = useDispatch<AppDispatch>()
  const { status, order } = useSortingTodoList()

  function orderButtonHandler() {
    dispatch(switchOrder())
  }

  function statusButtonHandler() {
    dispatch(switchStatus())
  }

  function onErrorHandler() {
    dispatch(fetchTodos({ page: page, limit: limit }))
  }

  const onPaginationChange = (page: number, pageSize: number) => {
    dispatch(setPage(page))
    dispatch(setLimit(pageSize))
  }

  useEffect(() => {
    dispatch(fetchTodos({ page: page, limit: limit }))
  }, [dispatch, page, limit])
  return (
    <>
      <CustomDivider>Список задач</CustomDivider>

      {loading ? (
        <StyledFlex vertical justify='center' align='center'>
          <Spin size='large' />
          <SpinTip>Загрузка</SpinTip>
        </StyledFlex>
      ) : error ? (
        <StyledFlex gap={10} vertical justify='center' align='center'>
          <Flex gap={10} align='center'>
            <ErrorIcon />
            <ErrorTip>{error}</ErrorTip>
          </Flex>
          <Button onClick={onErrorHandler}>Повторить</Button>
        </StyledFlex>
      ) : (
        <>
          <Flex gap={10}>
            <StatusButton
              size='large'
              type='primary'
              onClick={statusButtonHandler}
            >
              {statusText[status]}
            </StatusButton>
            <Button
              size='large'
              type='primary'
              shape='circle'
              disabled={status !== 'date' && status !== 'text'}
              icon={
                order === 'asc' ? <ArrowUpOutlined /> : <ArrowDownOutlined />
              }
              onClick={orderButtonHandler}
            />
          </Flex>
          <StyledList
            isEmpty={todoList.length === 0}
            itemLayout='horizontal'
            dataSource={todoSorting(todoList, status, order)}
            locale={{
              emptyText: (
                <Empty
                  description='Список задач пуст'
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                />
              ),
            }}
            renderItem={(item) => <TodoItem key={item.id} item={item} />}
          />
        </>
      )}
      <StyledPagination
        showSizeChanger
        defaultCurrent={1}
        defaultPageSize={5}
        pageSizeOptions={[5, 10, 20]}
        total={total}
        showTotal={(total, range) => `${range[0]}-${range[1]} из ${total}`}
        onChange={onPaginationChange}
      />
    </>
  )
}
