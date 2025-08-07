import { Modal } from 'antd'
import { useEffect } from 'react'
import ReactDOM from 'react-dom'
import type { Todo } from '../../types'
import ValidatedInput from '../ValidatedInput/ValidatedInput'
import { useInput } from '../../hooks/useInput'

interface EditTodoProps {
  editingTodo: Todo | null
  setEditingTodo: React.Dispatch<React.SetStateAction<Todo | null>>
  setTodosList: React.Dispatch<React.SetStateAction<Todo[]>>
}

export default function EditTodo({
  editingTodo,
  setEditingTodo,
  setTodosList,
}: EditTodoProps) {
  const { inputValue, setInputValue, isValid, onChange, validate, setIsValid } =
    useInput('')

  useEffect(() => {
    if (editingTodo) {
      setInputValue(editingTodo.text)
    }
  }, [editingTodo, setInputValue])

  const handleEdit = () => {
    if (validate()) {
      setTodosList((prev) =>
        prev.map((todoItem) =>
          todoItem.id === editingTodo?.id
            ? { ...todoItem, text: inputValue }
            : todoItem
        )
      )
      setEditingTodo(null)
    }
  }

  const handleCancel = () => {
    setEditingTodo(null)
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
