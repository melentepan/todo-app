import { initMessage } from '@/utils/messageService'
import { useEffect, type ReactNode } from 'react'
import { message } from 'antd'

interface MessageProviderProps {
  children: ReactNode
}

export function MessageProvider({ children }: MessageProviderProps) {
  const [messageApi, contextHolder] = message.useMessage()

  useEffect(() => {
    initMessage(messageApi)
  }, [messageApi])

  return (
    <>
      {children}
      {contextHolder}
    </>
  )
}
