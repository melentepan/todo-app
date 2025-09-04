import { Modal } from 'antd'
import { useEffect } from 'react'
import ReactDOM from 'react-dom'
import ValidatedInput from '@/components/ValidatedInput/ValidatedInput'
import { useInput } from '@/hooks/useInput'
import useTodoList from '@/hooks/useTodoList'
import { useDispatch } from 'react-redux'
import { setEditingTodo } from '@/store/todoList/todoList.slice'
import type { AppDispatch } from '@/store/store'
import { changeTodo } from '@/api/todos'

export default function EditTodo() {
  const { inputValue, setInputValue, isValid, onChange, validate, setIsValid } =
    useInput('')

  const { editingTodo } = useTodoList()
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    if (editingTodo) {
      setInputValue(editingTodo.text)
    }
  }, [editingTodo, setInputValue])

  const handleEdit = () => {
    if (validate() && editingTodo) {
      dispatch(changeTodo({ id: editingTodo.id, body: { text: inputValue } }))
    }
  }

  const handleCancel = () => {
    dispatch(setEditingTodo(null))
  }

  if (editingTodo === null) return null
  return ReactDOM.createPortal(
    <Modal
      title='Изменить задачу'
      open={editingTodo !== null}
      closable
      centered
      onOk={handleEdit}
      okText='Изменить'
      cancelText='Отменить'
      onCancel={handleCancel}
    >
      <ValidatedInput
        isValid={isValid}
        inputValue={inputValue}
        onChange={onChange}
        onFocus={() => setIsValid(true)}
      />
    </Modal>,
    document.body
  )
}
