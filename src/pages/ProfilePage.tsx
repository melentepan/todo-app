import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, Input, Button, Typography, Flex, Spin } from 'antd'
import { StyledForm } from '@/components/StyledForm/StyledForm'
import { useDispatch } from 'react-redux'
import type { AppDispatch } from '@/store/store'
import { changePassword, fetchUserProfile } from '@/api/auth'
import useAuthState from '@/hooks/useAuthState'
import CustomDivider from '@/components/CustomDivider/CustomDivider'
import { useEffect } from 'react'
import { SpinButton } from '@/components/SpinButton/SpinButton'

const { Title, Text } = Typography

const schema = z
  .object({
    oldPassword: z.string().min(1, 'Введите старый пароль'),
    newPassword: z.string().min(6, 'Пароль минимум 6 символов'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Пароли не совпадают',
  })
  .refine((data) => data.oldPassword !== data.newPassword, {
    path: ['newPassword'],
    message: 'Новый пароль должен отличаться от старого',
  })

type FormData = z.infer<typeof schema>

export default function ProfilePage() {
  const dispatch = useDispatch<AppDispatch>()
  const { user, status } = useAuthState()
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    mode: 'onChange',
  })

  const onSubmit = (data: FormData) => {
    dispatch(changePassword(data))
      .unwrap()
      .then(() => reset())
  }

  useEffect(() => {
    dispatch(fetchUserProfile())
  }, [dispatch])

  return (
    <>
      <CustomDivider>Профиль</CustomDivider>
      <Flex justify='space-evenly'>
        <Flex vertical align='center'>
          <Title level={5}>Email:</Title>{' '}
          {status === 'loading' ? <Spin /> : <Text>{user?.email ?? '—'}</Text>}
        </Flex>
        <Flex vertical align='center'>
          {' '}
          <Title level={5}>Возраст:</Title>{' '}
          {status === 'loading' ? <Spin /> : <Text>{user?.age ?? '—'}</Text>}
        </Flex>
        <Flex vertical align='center'>
          <Title level={5}>Создан:</Title>{' '}
          {status === 'loading' ? (
            <Spin />
          ) : (
            <Text>
              {user?.createdAt
                ? new Date(user?.createdAt).toLocaleDateString()
                : '—'}
            </Text>
          )}
        </Flex>
      </Flex>
      <CustomDivider>Сменить пароль</CustomDivider>
      <StyledForm onFinish={() => handleSubmit(onSubmit)()} layout='vertical'>
        <Form.Item
          label='Старый пароль'
          validateStatus={errors.oldPassword ? 'error' : ''}
          help={errors.oldPassword?.message}
        >
          <Controller
            name='oldPassword'
            control={control}
            render={({ field }) => <Input.Password {...field} />}
          />
        </Form.Item>

        <Form.Item
          label='Новый пароль'
          validateStatus={errors.newPassword ? 'error' : ''}
          help={errors.newPassword?.message}
        >
          <Controller
            name='newPassword'
            control={control}
            render={({ field }) => <Input.Password {...field} />}
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
            render={({ field }) => <Input.Password {...field} />}
          />
        </Form.Item>

        <Form.Item>
          <Button type='primary' htmlType='submit' block>
            {status === 'loading' ? <SpinButton /> : 'Сменить пароль'}
          </Button>
        </Form.Item>
      </StyledForm>
    </>
  )
}
