import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logoutUser } from '@/store/auth/auth.slice'
import { StyledCircleButton } from '../StyledCircleButton/StyledCircleButton'
import { HomeFilled } from '@ant-design/icons'

export default function MainPageButton() {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()

  const handleClick = () => {
    dispatch(logoutUser())
    navigate('/')
  }

  return (
    <>
      {location.pathname === '/profile' && (
        <StyledCircleButton
          onClick={handleClick}
          type='primary'
          shape='circle'
          size='large'
        >
          <HomeFilled />
        </StyledCircleButton>
      )}
    </>
  )
}
