import { Divider } from 'antd'
import styled from 'styled-components'

const CustomDivider = styled(Divider)`
  && {
    border-color: black;
  }

  && .ant-divider-inner-text {
    font-size: 24px;
    color: black;
  }
`

export default CustomDivider
