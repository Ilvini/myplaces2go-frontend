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
}

export function RecoveryPasswordForm() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormProps>()

  async function handleRecoveryPassword({ email }: FormProps) {
    try {
      const response = await api.post('/recuperar-senha', {
        email,
      })

      router.push('/')
      toast.success('Solicitação enviada com sucesso!')
      reset({ email: '' })
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
    <form
      onSubmit={handleSubmit(handleRecoveryPassword)}
      className="grid gap-2 w-full mt-10 "
    >
      <TextForm
        name={'email'}
        label={'E-mail'}
        placeholder="E-mail"
        register={register}
        errors={errors}
        required
      />

      <div className="flex justify-end">
        <Link href={'/'}>
          <strong className="text-brand-blue-800">Voltar para o login</strong>
        </Link>
      </div>

      <div className="mt-5 items-end">
        <ButtonPrimary type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Solicitando...' : 'Solicitar nova senha'}
        </ButtonPrimary>
      </div>
    </form>
  )
}

