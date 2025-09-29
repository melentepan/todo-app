import type { MessageInstance } from 'antd/es/message/interface'

let messageApi: MessageInstance | null = null

export const initMessage = (api: MessageInstance) => {
  messageApi = api
}

export const showMessage = {
  success: (text: string) => messageApi?.success(text),
  error: (text: string) => messageApi?.error(text),
  info: (text: string) => messageApi?.info(text),
}
