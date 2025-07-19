import { Modal } from 'antd'
import { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import type { Todo } from '../../types'
import ValidatedInput from '../ValidatedInput/ValidatedInput'

interface PopUpProps {
  editingTodo: Todo | null
  setEditingTodo: React.Dispatch<React.SetStateAction<Todo | null>>
  setTodosList: React.Dispatch<React.SetStateAction<Todo[]>>
}

export default function EditPopUp({
  editingTodo,
  setEditingTodo,
  setTodosList,
}: PopUpProps) {
  const [inputValue, setInputValue] = useState('')
  const [isValid, setIsValid] = useState(true)

  useEffect(() => {
    if (editingTodo) {
      setInputValue(editingTodo.text)
    }
  }, [editingTodo])

  const handleEdit = () => {
    if (inputValue.trim() !== '') {
      setTodosList((prev) =>
        prev.map((todoItem) =>
          todoItem.id === editingTodo?.id
            ? { ...todoItem, text: inputValue }
            : todoItem
        )
      )
      setEditingTodo(null)
    } else {
      setIsValid(false)
    }
  }

  const handleCancel = () => {
    setEditingTodo(null)
  }

  function onChangeHandler(newValue: string) {
    setInputValue(newValue)
    setIsValid(true)
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
        onChange={onChangeHandler}
        onFocus={() => setIsValid(true)}
      />
    </Modal>,
    document.body
  )
}
