import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import ButtonPrimary from '../Buttons/ButtonPrimary'
import { TextForm } from './components/TextForm'
import { TextFormPassword } from './components/TextFormPassword'
import { useEffect } from 'react'
import Cookies from 'js-cookie'
import { api, api_contract, api_develop } from '../../services/axios'
import { toast } from 'react-hot-toast'
import { errorHandler } from '../../services/errorHandler'
import Link from 'next/link'

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
      const response = await api.post(
        'https://comercialdosplasticos2.sitebeta.com.br/api/app/login',
        {
          email,
          password,
        }
      )
      console.log(response)
      Cookies.set('token', response.data.results.token)

      if (Cookies.get('token')) {
        router.push('/dashboard')
      }
      reset({ email: '', password: '' })
    } catch (error: any) {
      console.log(error)
      errorHandler(error)
    }
  }
  useEffect(() => {
    const token = Cookies.get('token')
    if (token) {
      router.push('/dashboard')
    }
  }, [])

  return (
    <form
      onSubmit={handleSubmit(handleLogin)}
      className="grid gap-2 w-full mt-10 "
    >
      <TextForm
        name={'email'}
        placeholder="Login"
        register={register}
        errors={errors}
        required
      />
      <TextFormPassword
        placeholder="Senha"
        name={'password'}
        label={'Senha'}
        register={register}
        errors={errors}
        required
      />
      <Link href="/recuperar-senha">
        <div className="flex justify-end items-center ">
          <img
            src="/svg/recover-password-icon.svg"
            alt="icone de recuperar senha"
          />
          <strong className="text-brand-blue-800 ml-2">Recuperar Senha</strong>
        </div>
      </Link>
      <div className="mt-5 items-end">
        <ButtonPrimary type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Entrando...' : 'Entrar'}
        </ButtonPrimary>
      </div>
    </form>
  )
}

//test

