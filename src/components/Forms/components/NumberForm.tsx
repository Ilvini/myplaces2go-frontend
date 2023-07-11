import React from 'react'
import { Label } from './Label'
import { LabelError } from './LabelError'

export function NumberForm({
  register,
  errors,
  name,
  label,
  required = false,
  disabled = false,
  max = 999999,
  min = 0,
}: {
  register: any
  errors: any
  name: string
  label: string
  required?: boolean
  disabled?: boolean
  max?: number
  min?: number
}) {
  return (
    <div>
      <Label label={label} name={name} />
      <input
        type="number"
        id={name}
        style={errors[name] && { border: '1px solid red' }}
        {...register(name, {
          required: { message: 'Campo obrigatório', value: required },
        })}
        className="input-text"
        disabled={disabled}
        max={max}
        min={min}
      />
      <LabelError
        msg={errors[name]?.message as string}
        hasError={errors[name] as any}
      />
    </div>
  )
}
