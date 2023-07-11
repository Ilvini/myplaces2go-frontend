/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import ButtonPrimary from '../Buttons/ButtonPrimary'
import { v4 as uuidv4 } from 'uuid'
import { toast } from 'react-hot-toast'
import { idbClient } from '../../services/idbClient'
import { Icon } from '@iconify/react'
import * as DeadForm from './components/DeadForm'

export function RequestForm() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    reset,
  } = useForm()

  async function handlePost(props: any) {
    idbClient((db: any) => {
      let request = db.add({
        ...props,
        id: uuidv4(),
        created_at: new Date().toISOString().slice(0, 10),
      })
      request.onsuccess = () => {
        router.push('/dashboard/sucesso')
      }
      request.onerror = () => {
        toast.error('Erro ao salvar registro.')
        console.log('error')
      }
    })
  }

  return (
    <form
      onSubmit={handleSubmit(handlePost)}
      className="grid sm:grid-cols-3 gap-2 w-full pb-20"
    >
      <DeadForm.TextForm
        label={'Descrição Produto'}
        name={'descricao_produto'}
        register={register}
        errors={errors}
      />

      <DeadForm.NumberForm
        max={999999}
        min={1}
        label={'Quantidade'}
        name={'quantidade'}
        register={register}
        errors={errors}
      />

      <DeadForm.TextAreaForm
        label={'Observação'}
        name={'observacao'}
        register={register}
        errors={errors}
      />

      <DeadForm.SelectInput
        register={register}
        required
        label="Urgencia"
        name="urgencia"
        errors={errors}
        options={[
          { value: 'Normal', label: 'Normal' },
          { value: 'Urgente', label: 'Urgente' },
          { value: 'Muito Urgente', label: 'Muito Urgente' },
        ]}
      />

      <ButtonPrimary type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Salvando...' : 'Salvar'}
      </ButtonPrimary>
    </form>
  )
}

export function showFileReader(watch: any, name: any) {
  return watch(name) ? (
    <img
      className="object-cover"
      src={watch(name).length > 0 ? URL.createObjectURL(watch(name)[0]) : ''}
      alt="Foto"
    />
  ) : (
    <Icon icon="ant-design:plus-circle" />
  )
}
