import { Dialog } from '@headlessui/react'
import { RWebShare } from 'react-web-share'
import ButtonPrimary from '../Buttons/ButtonPrimary'
import rattingModalStore from '../../stores/modals/RattingModalStore'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { errorHandler } from '../../services/errorHandler'
import { Rating } from 'react-simple-star-rating'
import { Icon } from '@iconify/react'
import { useState } from 'react'
import { api } from '../../services/axios'
import ButtonOutline from '../Buttons/ButtonOutline'
import deleteAccountModalStore from '../../stores/modals/deleteAccountModalStore'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
interface FormProps {
  star: string
  message: string
}

export function DeletaAccountModal() {
  const { modalState, setModalState, id } = deleteAccountModalStore()
  const [loading, setLoading] = useState(false)

  const router = useRouter()
  const handleDeleteAccount = async () => {
    try {
      setLoading(true)
      const response = await api.delete('/cliente', {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      })
      setLoading(false)
      Cookies.remove('token')
      toast.success(response.data.message)
      router.push('/login')
      setModalState(false)
    } catch (error) {
      setLoading(false)
      setModalState(false)
      errorHandler(error)
      console.log(error)
    }
  }

  console.log(id)
  return (
    <Dialog
      open={modalState}
      onClose={() => setModalState(false)}
      className="w-full h-full
    flex justify-center items-center
    fixed top-0 left-0 z-[100]
    bg-[rgba(0,0,0,0.5)]
    "
    >
      <Dialog.Panel className="bg-white p-5 rounded-xl w-full mx-3">
        <Dialog.Title>
          <h3 className="text-brand-gray-900 text-xl">
            <strong className=" text-brand-gray-900">
              Deseja realmente excluir a conta?
            </strong>{' '}
          </h3>
        </Dialog.Title>

        <form action="" className="w-full flex flex-col gap-1">
          <ButtonPrimary
            disabled={loading}
            onClick={handleDeleteAccount}
            type="button"
          >
            Excluir Conta
          </ButtonPrimary>
          <ButtonOutline
            disabled={loading}
            onClick={() => setModalState(false)}
            type="button"
          >
            Cancelar
          </ButtonOutline>
        </form>
      </Dialog.Panel>
    </Dialog>
  )
}

