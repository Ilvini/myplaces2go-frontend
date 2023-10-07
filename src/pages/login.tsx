/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next'
import { LoginForm } from '../components/Forms/LoginForm'
import Container from '../components/Partials/Container'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { LabelError } from '../components/Forms/components/LabelError'
import { errorHandler } from '../services/errorHandler'
import toast from 'react-hot-toast'
import { Icon } from '@iconify/react'
interface FormProps {
  email: string
  password: string
}

const Home: NextPage = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormProps>()

  async function handleLogin(data: FormProps) {
    try {
      if (data.email === '' || data.password === '')
        return toast.error('Preencha todos os campos')

      setTimeout(() => {
        router.push('/dashboard')
      }, 3000)

      reset({
        email: '',
        password: '',
      })
    } catch (error) {
      console.log(error)
      errorHandler(error)
    }
  }

  return (
    <main className="relative">
      <span className="bg-gradient-to-t pt-16 px-10 to-brand-yellow-300 from-transparent h-[300px] w-full absolute">
        <h2 className="text-white font-bold text-5xl text-shadow">
          Comece agora a explorar novos lugares
        </h2>
        <h4 className="mt-4 text-white/80 text-3xl text-shadow">
          conecte na nossa rede criando uma conta
        </h4>
        <form
          action=""
          className="mt-10 flex justify-between flex-col  "
          onSubmit={handleSubmit(handleLogin)}
        >
          <div>
            <div className="mb-5 ">
              <input
                placeholder="Email"
                type="text"
                id="email"
                style={errors.email && { border: '1px solid red' }}
                {...register('email', {
                  required: { message: 'Campo obrigatório', value: true },
                })}
                className="w-full py-5 h-20 px-6 text-2xl "
                disabled={isSubmitting}
              />
              <LabelError
                msg={errors.email?.message as string}
                hasError={errors.email as any}
              />
            </div>

            <div className="mb-5">
              <input
                placeholder="Senha"
                type="password"
                id="password"
                style={errors.password && { border: '1px solid red' }}
                {...register('password', {
                  required: { message: 'Campo obrigatório', value: true },
                })}
                className="w-full py-5 h-20 px-6 text-2xl "
                disabled={isSubmitting}
              />
              <LabelError
                msg={errors.password?.message as string}
                hasError={errors.password as any}
              />
            </div>
          </div>

          <div className=" w-full flex justify-center flex-col mt-32">
            <button
              type="submit"
              className="rounded-xl flex justify-center py-7 drop-shadow-2xl font-light bg-brand-blue-100 w-full text-3xl text-white"
            >
              {!isSubmitting ? (
                'Fazer Login'
              ) : (
                <Icon icon="mingcute:loading-3-fill" />
              )}
            </button>
            <button className="underline text-white text-2xl text-center my-5 font-normal">
              Criar uma conta
            </button>
          </div>
        </form>
      </span>
      <img src="/img/bg-myplace2go.png" alt="" className="w-full h-screen" />
    </main>
  )
}
