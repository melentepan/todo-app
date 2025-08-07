import { Divider } from 'antd'
import styled from 'styled-components'

const CustomDivider = styled(Divider)`
  && {
    border-color: ${({ theme }) => theme.text};
    position: sticky;
    top: -10px;

    background-color: ${({ theme }) => theme.background};
    z-index: 10;
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  && .ant-divider-inner-text {
    font-size: 24px;
  }
`

export default CustomDivider
