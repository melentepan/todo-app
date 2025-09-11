import { Dropdown, type MenuProps } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logoutUser } from '@/store/auth/auth.slice'
import { StyledCircleButton } from '../StyledCircleButton/StyledCircleButton'
import { UserOutlined } from '@ant-design/icons'

export default function ProfileMenu() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logoutUser())
    navigate('/login')
  }

  const handleProfile = () => {
    navigate('/profile')
  }

  const items: MenuProps['items'] = [
    {
      label: 'Профиль',
      key: 'profile',
      onClick: handleProfile,
    },
    {
      type: 'divider',
    },
    {
      label: 'Выйти',
      key: 'logout',
      onClick: handleLogout,
    },
  ]

  return (
    <Dropdown menu={{ items }} placement='bottomRight'>
      <StyledCircleButton type='primary' shape='circle' size='large'>
        <UserOutlined />
      </StyledCircleButton>
    </Dropdown>
  )
}
