import { useState } from 'react'

export function useInput(initialValue: string) {
  const [inputValue, setInputValue] = useState(initialValue)
  const [isValid, setIsValid] = useState(true)

  const onChange = (newValue: string) => {
    setInputValue(newValue)
    setIsValid(true)
  }

  const validate = () => {
    const valid = inputValue.trim() !== ''
    setIsValid(valid)
    return valid
  }

  return {
    inputValue,
    setInputValue,
    isValid,
    onChange,
    validate,
    setIsValid,
  }
}
