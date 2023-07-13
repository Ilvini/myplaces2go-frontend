import React from 'react'
import { Label } from './Label'
import { LabelError } from './LabelError'

export function TextForm({
  placeholder,
  register,
  errors,
  name,
  required = false,
  disabled = false,
}: {
  placeholder: string
  register: any
  errors: any
  name: string
  required?: boolean
  disabled?: boolean
}) {
  return (
    <div>
      {/* <Label label={label} name={name} /> */}
      <input
        placeholder={placeholder}
        type="text"
        id={name}
        style={errors[name] && { border: '1px solid red' }}
        {...register(name, {
          required: { message: 'Campo obrigatório', value: required },
        })}
        className="input-text"
        disabled={disabled}
      />
      <LabelError
        msg={errors[name]?.message as string}
        hasError={errors[name] as any}
      />
    </div>
  )
}

