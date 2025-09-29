import { Input } from 'antd'
import styled from 'styled-components'

const ErrorText = styled.p`
  color: ${({ theme }) => theme.error};
  font-size: 14px;
`

interface ValidatedInputProps {
  isValid: boolean
  inputValue: string
  onChange: (newValue: string) => void
  onFocus: () => void
}

export function ValidatedInput({
  isValid,
  inputValue,
  onChange,
  onFocus,
}: ValidatedInputProps) {
  return (
    <>
      <Input
        size='large'
        showCount
        maxLength={50}
        placeholder='Задача'
        value={inputValue}
        onChange={(event) => onChange(event.target.value)}
        onFocus={() => onFocus()}
      />
      {!isValid ? <ErrorText>Поле не может быть пустым</ErrorText> : ''}
    </>
  )
}
