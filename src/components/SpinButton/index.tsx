import { Spin } from 'antd'
import styled from 'styled-components'

export const SpinButton = styled(Spin)`
  .ant-spin-dot-item {
    color: ${({ theme }) => theme.background};
  }
`
