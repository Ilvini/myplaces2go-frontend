import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import ButtonPrimary from '../Buttons/ButtonPrimary'
import { TextForm } from './components/TextForm'
import { TextFormPassword } from './components/TextFormPassword'
import { useEffect } from 'react'
import Cookies from 'js-cookie'
import {
  api,
  api_contract,
  api_develop,
} from '../../services/axios'
import { toast } from 'react-hot-toast'
import { errorHandler } from '../../services/errorHandler'


interface FormProps {
  email: string
  password: string
}

export function LoginForm() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormProps>()

  async function handleLogin({ email, password }: FormProps) {
    try {
      const response = await api.post('/login', {
        email,
        password,
      })

      Cookies.set('token', response.data.results.token)

      if (Cookies.get('token')) {
        router.push('/dashboard/pastas')
      }
      reset({ email: '', password: '' })
    } catch (error: any) {
      errorHandler(error)
    }
  }

  useEffect(() => {
    const token = Cookies.get('token')
    if (token) {
      router.push('/dashboard/pastas')
    }
  }, [])

  return (
    <form onSubmit={handleSubmit(handleLogin)} className="grid gap-2 w-full">
      <TextForm
        name={'email'}
        label={'E-mail'}
        register={register}
        errors={errors}
        required
      />
      <TextFormPassword
        name={'password'}
        label={'Senha'}
        register={register}
        errors={errors}
        required
      />
      <div className="mt-5">
        <ButtonPrimary type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Entrando...' : 'Entrar'}
        </ButtonPrimary>
      </div>
    </form>
  )
}
