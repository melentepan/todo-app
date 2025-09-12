import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, Input, InputNumber, Button } from 'antd'
import styled from 'styled-components'
import { StyledForm } from '@/components/StyledForm/StyledForm'
import { FormBottomTip } from '@/components/FormBottomTip/FormBottomTip'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '@/api/auth'
import { useDispatch } from 'react-redux'
import type { AppDispatch } from '@/store/store'
import CustomDivider from '@/components/CustomDivider/CustomDivider'
import { SpinButton } from '@/components/SpinButton/SpinButton'
import useAuthState from '@/hooks/useAuthState'

const StyledInputNumber = styled(InputNumber)`
  width: 100%;
`

const schema = z
  .object({
    email: z.string().email('Некорректный email'),
    password: z.string().min(6, 'Пароль минимум 6 символов'),
    confirmPassword: z.string(),
    age: z.number().min(1, 'Недопустимое значение').nullable(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Пароли не совпадают',
  })

type FormData = z.infer<typeof schema>

export default function RegistrationPage() {
  const { status } = useAuthState()
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      age: null,
    },
    mode: 'onChange',
  })

  const onSubmit = (data: FormData) => {
    dispatch(registerUser(data))
      .unwrap()
      .then(() => navigate('/'))
  }

  return (
    <>
      <CustomDivider>Регистрация</CustomDivider>
      <StyledForm onFinish={() => handleSubmit(onSubmit)()} layout='vertical'>
        <Form.Item
          label='Email'
          validateStatus={errors.email ? 'error' : ''}
          help={errors.email?.message}
        >
          <Controller
            name='email'
            control={control}
            render={({ field }) => <Input {...field} placeholder='Email' />}
          />
        </Form.Item>

        <Form.Item
          label='Пароль'
          validateStatus={errors.password ? 'error' : ''}
          help={errors.password?.message}
        >
          <Controller
            name='password'
            control={control}
            render={({ field }) => (
              <Input.Password {...field} placeholder='Пароль' />
            )}
          />
        </Form.Item>

        <Form.Item
          label='Подтверждение пароля'
          validateStatus={errors.confirmPassword ? 'error' : ''}
          help={errors.confirmPassword?.message}
        >
          <Controller
            name='confirmPassword'
            control={control}
            render={({ field }) => (
              <Input.Password {...field} placeholder='Повторите пароль' />
            )}
          />
        </Form.Item>

        <Form.Item
          label='Возраст (необязательно)'
          validateStatus={errors.age ? 'error' : ''}
          help={errors.age?.message}
        >
          <Controller
            name='age'
            control={control}
            render={({ field }) => (
              <StyledInputNumber
                {...field}
                value={field.value ?? null}
                onChange={(value) => field.onChange(value)}
                placeholder='Введите возраст'
              />
            )}
          />
        </Form.Item>

        <Form.Item>
          <Button type='primary' htmlType='submit' block>
            {status === 'loading' ? <SpinButton /> : 'Зарегистрироваться'}
          </Button>
        </Form.Item>
        <FormBottomTip>
          Есть аккаунт? <Link to='/login'>Войти</Link>
        </FormBottomTip>
      </StyledForm>
    </>
  )
}
