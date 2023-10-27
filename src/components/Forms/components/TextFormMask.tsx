import React from 'react'
import InputMask from 'react-input-mask'
import { Label } from './Label'
import { LabelError } from './LabelError'

export function TextFormMask({
  register,
  errors,
  name,
  label,
  required = false,
  mask,
  disabled = false,
  placeholder = ' ',
  defaultValue = '',
}: {
  register: any
  errors: any
  name: string
  label?: string
  required?: boolean
  mask: string
  disabled?: boolean
  placeholder?: string
  defaultValue?: string | number
}) {
  return (
    <div>
      {/*  <Label label={label} name={name} /> */}
      <InputMask
        defaultValue={defaultValue}
        mask={mask}
        type="text"
        placeholder={placeholder}
        style={errors[name] && { border: '1px solid red' }}
        {...register(name, {
          required: { message: 'Campo obrigatório', value: required },
        })}
        className="w-full py-5 h-20 px-6 text-xl placeholder:text-brand-gray-500 "
        disabled={disabled}
      />
      <LabelError
        msg={errors[name]?.message as string}
        hasError={errors[name] as any}
      />
    </div>
  )
}

{
  /* <TextFormMask
  mask="99/99/99"
  label={'Data'}
  name={'data'}
  placeholder={'dd/mm/aa'}
  register={register}
  errors={errors}
  required
/> */
}

