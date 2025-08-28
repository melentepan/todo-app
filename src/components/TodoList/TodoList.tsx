import CustomDivider from '../CustomDivider/CustomDivider'
import { Button, Empty, Flex, List, Pagination, Spin } from 'antd'
import TodoItem from '../TodoItem/TodoItem'
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons'
import { statusText } from '../../constants'
import todoSorting from '../../utils/todoSorting'
import useTodoList from '../../hooks/useTodoList'
import { useDispatch } from 'react-redux'
import {
  switchOrder,
  switchStatus,
} from '../../store/sortingTodoList/sortingTodoList.slice'
import useSortingTodoList from '../../hooks/useSortingTodoList'
import { useEffect } from 'react'
import { fetchTodos } from '../../api/todos'
import type { AppDispatch } from '../../store/store'
import styled from 'styled-components'

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

  useEffect(() => {
    dispatch(fetchTodos({ page: page, limit: limit }))
  }, [dispatch, page, limit])
  return (
    <>
      <CustomDivider>Список задач</CustomDivider>

      {loading ? (
        <Flex
          vertical
          justify='center'
          align='center'
          style={{ marginTop: '20px', height: '100%' }}
        >
          <Spin size='large' />
          <SpinTip>Загрузка</SpinTip>
        </Flex>
      ) : error ? (
        <Flex
          gap={10}
          vertical
          justify='center'
          align='center'
          style={{ marginTop: '20px', height: '100%' }}
        >
          <Flex gap={10} align='center'>
            <ErrorIcon />
            <ErrorTip>{error}</ErrorTip>
          </Flex>
          <Button onClick={onErrorHandler}>Повторить</Button>
        </Flex>
      ) : (
        <>
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
              icon={
                order === 'asc' ? <ArrowUpOutlined /> : <ArrowDownOutlined />
              }
              onClick={orderButtonHandler}
            />
          </Flex>
          <List
            style={{
              ...(todoList.length === 0
                ? {
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }
                : {}),
              marginTop: '20px',
              height: '100%',
            }}
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
      <Pagination
        style={{ margin: '0 auto' }}
        showSizeChanger
        // onShowSizeChange={onShowSizeChange}
        defaultCurrent={1}
        total={total}
      />
    </>
  )
}
