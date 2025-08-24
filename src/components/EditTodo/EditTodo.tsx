import { Modal } from 'antd'
import { useEffect } from 'react'
import ReactDOM from 'react-dom'
import ValidatedInput from '../ValidatedInput/ValidatedInput'
import { useInput } from '../../hooks/useInput'
import useTodoList from '../../hooks/useTodoList'
import { useDispatch } from 'react-redux'
import { setEditingTodo, updateTodo } from '../../store/todoList/todoList.slice'

export default function EditTodo() {
  const { inputValue, setInputValue, isValid, onChange, validate, setIsValid } =
    useInput('')

  const { editingTodo } = useTodoList()
  const dispatch = useDispatch()

  useEffect(() => {
    if (editingTodo) {
      setInputValue(editingTodo.text)
    }
  }, [editingTodo, setInputValue])

  const handleEdit = () => {
    if (validate()) {
      dispatch(updateTodo(inputValue))
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
