import { Dialog } from '@headlessui/react'

import ButtonPrimary from '../Buttons/ButtonPrimary'
import rattingModalStore from '../../stores/modals/RattingModalStore'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { errorHandler } from '../../services/errorHandler'
import { Rating } from 'react-simple-star-rating'
import { Icon } from '@iconify/react'
import { useState } from 'react'
import { api } from '../../services/axios'
interface FormProps {
  star: string
  message: string
}

export function RattingModal() {
  const { modalState, setModalState, modalData } = rattingModalStore()
  const [ratingValue, setRatingValue] = useState(0)
  const [comment, setComment] = useState('')

  const handleRating = (rate: number) => {
    setRatingValue(rate)
  }

  async function handleRatting(e: any) {
    try {
      if (ratingValue === 0) {
        toast.error('Por favor, avalie o ponto turístico')
        return
      }
      console.log(comment)
      if (comment === '') {
        return setComment('Sem comentário')
      }

      const response = await api.post(
        `/pontos-turisticos/${modalData?.results.uuid}/avaliacoes/novo`,
        {
          estrelas: ratingValue,
          comentario: comment,
        }
      )
    } catch (error) {
      console.log(error)
      errorHandler(error)
    }
  }

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
          <h3 className="text-brand-gray-900 ">
            <strong className="text-bold text-brand-gray-900">Avaliando</strong>
            {modalData?.results.nome}
          </h3>
        </Dialog.Title>

        <div className="flex justify-center">
          <Rating
            transition
            allowFraction={false}
            onClick={handleRating}
            allowHover={true}
            emptyIcon={
              <Icon icon="ph:star-light" color="#f2c05f" fontSize={50} />
            }
            fillIcon={
              <Icon icon="bi:star-fill" color="#f2c05f" fontSize={50} />
            }
          />
        </div>
        <form action="" className="w-full flex flex-col gap-3">
          <textarea
            name="comment"
            id=""
            onChange={(e) => setComment(e.target.value)}
            placeholder="Deixe seu comentário..."
            rows={5}
            className="w-full border p-3 rounded-lg mt-5"
          ></textarea>

          <ButtonPrimary onClick={handleRatting} type="button">
            Enviar
          </ButtonPrimary>
        </form>
      </Dialog.Panel>
    </Dialog>
  )
}

