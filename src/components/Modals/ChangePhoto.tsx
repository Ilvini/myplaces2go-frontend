import { Dialog } from '@headlessui/react'
import ButtonPrimary from '../Buttons/ButtonPrimary'
import toast from 'react-hot-toast'
import { errorHandler } from '../../services/errorHandler'
import { Icon } from '@iconify/react'
import { useState } from 'react'
import { api } from '../../services/axios'
import ButtonOutline from '../Buttons/ButtonOutline'
import { useRouter } from 'next/router'
import changePhotoModalStore from '../../stores/modals/changePhotoModalStore'
import Cookies from 'js-cookie'

export function ChangePhotoModal() {
  const { modalStatePhoto, setModalStatePhoto } = changePhotoModalStore()

  const [loading, setLoading] = useState(false)
  const [photo, setPhoto] = useState<File | null>(null)
  const [base64, setBase64] = useState<string | null>(null)

  const handleCreateBase64 = async (e: any) => {
    const file = e.target.files[0]
    const base64File = await convertFileToBase64(file)
    setPhoto(file)
    setBase64(base64File)
  }

  async function handleSendPhoto(e: any) {
    try {
      e.preventDefault()
      if (!photo) return toast.error('Selecione uma foto')
      var data = new FormData()
      const file = photo
      data.append('foto', file)
      setLoading(true)
      const response = await api.post('/cliente/alterar-foto', data, {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
          enctype: 'multipart/form-data',
        },
      })
      setLoading(false)

      toast.success(response.data.message)

      setModalStatePhoto(false)
    } catch (error) {
      setLoading(false)
      setModalStatePhoto(false)
      errorHandler(error)
      console.log(error)
    }
  }

  async function convertFileToBase64(file: File) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader()
      fileReader.readAsDataURL(file)
      fileReader.onload = () => {
        resolve(fileReader.result)
      }
      fileReader.onerror = (error) => {
        reject(error)
      }
    })
  }

  return (
    <Dialog
      open={modalStatePhoto}
      onClose={() => setModalStatePhoto(false)}
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
              Escolha uma foto de Perfil
            </strong>{' '}
          </h3>
        </Dialog.Title>

        <form
          action=""
          className="w-full flex flex-col gap-1 "
          encType="multipart/form-data"
        >
          <div className="flex justify-center">
            <img
              src={base64 || '/img/no-image.png'}
              alt="foto de perfil"
              className="rounded-full border  w-32 h-32 my-5 object-cover"
              onError={(e: any) => {
                e.target.onerror = null
                e.target.src = '/img/no-image.png'
              }}
            />
          </div>
          <input
            type="file"
            name="file"
            id="file"
            onChange={handleCreateBase64}
            className="hidden"
          />
          <label
            htmlFor="file"
            className="bg-brand-green-400 text-white px-3 py-2 rounded-lg text-center flex items-center justify-center"
          >
            <Icon icon="mdi:camera-plus-outline" className="mr-2" />
            Escolher Foto
          </label>
          <div className="flex gap-4">
            <ButtonPrimary
              disabled={loading}
              onClick={handleSendPhoto}
              type="submit"
            >
              Enviar Foto
            </ButtonPrimary>
            <ButtonOutline
              disabled={loading}
              onClick={() => setModalStatePhoto(false)}
              type="button"
            >
              Voltar
            </ButtonOutline>
          </div>
        </form>
      </Dialog.Panel>
    </Dialog>
  )
}
