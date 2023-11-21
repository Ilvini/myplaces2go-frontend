/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Icon } from '@iconify/react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'

import BottomNavigation from '../components/Partials/BottomNavigation'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useFetch } from '../services/useFetch'
import { useForm } from 'react-hook-form'
import { errorHandler } from '../services/errorHandler'
import { LabelError } from '../components/Forms/components/LabelError'
import { api } from '../services/axios'
import toast from 'react-hot-toast'
import { HeaderNavigation } from '../components/HeaderNavigation'
import { TextFormMask } from '../components/Forms/components/TextFormMask'
import Cookies from 'js-cookie'
import ButtonPrimary from '../components/Buttons/ButtonPrimary'
interface FormProps {
  nome: string
  email: string
  celular: string
  password: string
  password_confirmation: string
}

const ProfileUpdate: NextPage = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
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
      setLoading(true)
      const response = await api.post(
        `/pontos-turisticos/${modalData?.results.uuid}/avaliacoes/novo`,
        {
          estrelas: rating,
          comentario: comment,
        }
      )
      setLoading(false)

      toast.success(response.data.message)
    } catch (error) {
      setLoading(false)
      console.log(error)
      errorHandler(error)
    }
  }

  const { data: me } = useFetch('/cliente/me', Cookies.get('token'))
  console.log(me)

  async function handleUpdateProfile(data: FormProps) {
    try {
      const response = await api.put('/cliente/alterar', {
        nome: data.nome,
        email: data.email,
        celular: data.celular,
      })
      toast.success('Alteração realizada com sucesso')
      reset({
        nome: '',
        email: '',
        celular: '',
        password: '',
        password_confirmation: '',
      })
      router.push('/profile')
    } catch (error) {
      console.log(error)
      errorHandler(error)
    }
  }
  return (
    <main className="relative pb-20">
      <HeaderNavigation backRoute="/profile" />
      <section className="mx-4 my-4">
        <h3 className="text-2xl text-brand-gray-600">
          Avalie nosso aplicatiovo!
        </h3>
        <div className="flex justify-center my-10">
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

          <ButtonPrimary
            disabled={loading}
            onClick={handleRatting}
            type="button"
          >
            Avaliar
          </ButtonPrimary>
        </form>
      </section>

      {/*   <BottomNavigation /> */}
    </main>
  )
}

export default ProfileUpdate

