import React from 'react'
import { Dialog } from '@headlessui/react'

import Link from 'next/link'
import placeModalStore from '../../stores/modals/placeModalStore'
import { Icon } from '@iconify/react'
export const PlaceModal = () => {
  const { modalState, modalData, setModalState } = placeModalStore()
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
      <Dialog.Panel className="bg-white p-5 rounded-xl w-[80%] mx-3">
        <Dialog.Title>
          <img
            src={modalData?.imagem}
            alt={modalData?.nome}
            className="aspect-square w-full rounded-xl"
          />
          <h3 className="text-brand-gray-900 text-2xl">
            <strong className=" text-brand-gray-900">{modalData?.nome}</strong>{' '}
          </h3>
        </Dialog.Title>

        {modalData && (
          <Link href={`/dashboard/place/${modalData?.uuid}`}>
            <button className="bg-brand-yellow-300 rounded-lg p-3 mt-3 w-full text-center flex justify-center items-center">
              <Icon
                icon="bi:arrow-right-circle-fill"
                color="black"
                className="inline mr-2"
                fontSize={20}
              />
              Ver Detalhes
            </button>
          </Link>
        )}
      </Dialog.Panel>
    </Dialog>
  )
}

