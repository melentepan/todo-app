import CustomDivider from '../CustomDivider/CustomDivider'
import { Button, Empty, Flex, List } from 'antd'
import TodoItem from '../TodoItem/TodoItem'
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons'
import { statusText } from '../../constants'
import todoSorting from '../../utils/todoSorting'
import useTodoList from '../../hooks/useTodoList'
import { useDispatch } from 'react-redux'
import {
  switchOrder,
  switchStatus,
} from '../../store/sortingTodoList/sortingTodoList.slice'
import useSortingTodoList from '../../hooks/useSortingTodoList'

export default function TodoList() {
  const { todoList } = useTodoList()
  const dispatch = useDispatch()
  const { status, order } = useSortingTodoList()

  function orderButtonHandler() {
    dispatch(switchOrder())
  }

  function statusButtonHandler() {
    dispatch(switchStatus())
  }

  return (
    <section>
      <CustomDivider>Список задач</CustomDivider>
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
          icon={order === 'asc' ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
          onClick={orderButtonHandler}
        />
      </Flex>
      <List
        style={{ marginTop: '20px' }}
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
    </section>
  )
}
