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

  const [comment, setComment] = useState('')
  const [rating, setRating] = useState(0)

  async function handleRatting(e: any) {
    try {
      if (rating === 0) {
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
          estrelas: rating,
          comentario: comment,
        }
      )
      setModalState(false)
      toast.success(response.data.message)
    } catch (error) {
      console.log(error)
      errorHandler(error)
    }
  }
  console.log(modalData)

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
            <strong className=" text-brand-gray-900">Avaliando</strong>{' '}
            {modalData?.results.nome}
          </h3>
        </Dialog.Title>

        <div className="flex justify-center">
          {[...Array(5)].map((_, i) => {
            const ratingValue = i + 1
            return (
              <label key={i}>
                <input
                  type="radio"
                  name="rating"
                  className="hidden"
                  value={ratingValue}
                  onClick={() => setRating(ratingValue)}
                />
                <Icon
                  icon="bi:star-fill"
                  color={ratingValue <= rating ? '#f2c05f' : '#e4e5e9'}
                  fontSize={44}
                  className="mx-1"
                />
              </label>
            )
          })}
          {/*  <Rating
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
          /> */}
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

