import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, Input, Button } from 'antd'
import { PageHeading } from '@/components/PageHeading/PageHeading'
import { StyledForm } from '@/components/StyledForm/StyledForm'
import { FormBottomTip } from '@/components/FormBottomTip/FormBottomTip'
import { Link } from 'react-router-dom'

const schema = z.object({
  email: z.string().email('Некорректный email'),
  password: z.string().min(6, 'Пароль минимум 6 символов'),
})

type FormData = z.infer<typeof schema>

export default function RegistrationPage() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  })

  const onSubmit = (data: FormData) => {
    console.log('Вход:', data)
  }

  return (
    <>
      <PageHeading>Вход</PageHeading>
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

        <Form.Item>
          <Button type='primary' htmlType='submit' block>
            Войти
          </Button>
        </Form.Item>
        <FormBottomTip>
          Нет аккаунта? <Link to='/register'>Зарегистрироваться</Link>
        </FormBottomTip>
      </StyledForm>
    </>
  )
}
