import { Icon } from '@iconify/react'
import React, { useState } from 'react'
import { Label } from './Label'
import { LabelError } from './LabelError'

export function TextFormSearch({
  placeholder,
  name,
}: {
  placeholder: string

  name: string
}) {
  return (
    <div>
      {/*   <Label label={label} name={name} /> */}
      <div className="relative   w-full flex">
        <input
          placeholder={placeholder}
          name={name}
          type="text"
          className="input-text  w-full flex"
        />

        <span className="cursor-pointer absolute right-6 top-1/2 -translate-y-1/2">
          <Icon
            icon="octicon:search-16"
            width="20"
            height="20"
            className="text-brand-blue-800"
          />
        </span>
      </div>
      {/*  <LabelError
        msg={errors[name]?.message as string}
        hasError={errors[name] as any}
      /> */}
    </div>
  )
}

