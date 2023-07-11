/* eslint-disable @next/next/no-img-element */
import * as Popover from '@radix-ui/react-popover'
import { MemberProps } from '../../types/protocols'
import { Icon } from '@iconify/react'

export function AddMember({ membros }: { membros: MemberProps[] }) {
  return (
    <Popover.Root>
      <Popover.Trigger>
        <span className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center cursor-pointer">
          <Icon icon="mdi:plus" className="text-white" />
        </span>
      </Popover.Trigger>
      <Popover.Anchor />
      <Popover.Portal>
        <Popover.Content className="bg-white p-4 z-[99999] rounded-md shadow mx-5">
          <p className="font-bold">Adicionar membro</p>
          <div className="cursor-pointer hover:text-brand-primary-800 transition-all grid grid-cols-3 gap-1">
            {membros.map((membro) => (
              <img
                key={membro.id}
                src={membro.foto}
                alt={membro.nome}
                className="w-8 h-8 rounded-full border-2 border-white hover:shadow-md transition-all"
              />
            ))}
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
