import { Input, Modal } from 'antd'
import { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import type { Todo } from '../../types'

interface PopUpProps {
  editingTodo: Todo | null
  setEditingTodo: React.Dispatch<React.SetStateAction<Todo | null>>
  setTodosList: React.Dispatch<React.SetStateAction<Todo[]>>
}

export default function PopUp({
  editingTodo,
  setEditingTodo,
  setTodosList,
}: PopUpProps) {
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    if (editingTodo) {
      setInputValue(editingTodo.text)
    }
  }, [editingTodo])

  const handleEdit = () => {
    setTodosList((prev) =>
      prev.map((todoItem) =>
        todoItem.id === editingTodo?.id
          ? { ...todoItem, text: inputValue }
          : todoItem
      )
    )
    setEditingTodo(null)
  }

  const handleCancel = () => {
    setEditingTodo(null)
  }

  if (editingTodo === null) return null
  return ReactDOM.createPortal(
    <Modal
      title='Edit task'
      open={editingTodo !== null}
      closable
      centered
      onOk={handleEdit}
      okText='Edit'
      onCancel={handleCancel}
    >
      <Input
        size='large'
        showCount
        maxLength={50}
        placeholder='Task'
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
      />
    </Modal>,
    document.body
  )
}
