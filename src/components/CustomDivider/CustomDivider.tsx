import { Divider } from 'antd'
import styled from 'styled-components'

const CustomDivider = styled(Divider)`
  && {
    border-color: black;
    position: sticky;
    top: -10px;
    background-color: white;
    z-index: 10;
  }

  && .ant-divider-inner-text {
    font-size: 24px;
    color: black;
  }
`

export default CustomDivider
