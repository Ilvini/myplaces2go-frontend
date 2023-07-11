/* eslint-disable @next/next/no-img-element */
import * as Popover from '@radix-ui/react-popover'
import { MemberProps } from '../../types/protocols'
import { Icon } from '@iconify/react'

export function Member(membro: MemberProps) {
  return (
    <Popover.Root>
      <Popover.Trigger>
        <img
          key={membro.id}
          src={membro.foto}
          alt={membro.nome}
          className="w-8 h-8 rounded-full border-2 border-white"
        />
      </Popover.Trigger>
      <Popover.Anchor />
      <Popover.Portal>
        <Popover.Content className="bg-white p-4 z-[99999] rounded-md shadow">
          <div className="cursor-pointer hover:text-brand-primary-800 transition-all">
            <strong>{membro.nome}</strong>
            <hr />
            <div className="flex items-center gap-1 hover:bg-red-200 px-2 py-1 rounded">
              <Icon icon="mdi:account-remove" className="text-red-500" />
              <span>Remover</span>
            </div>
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
