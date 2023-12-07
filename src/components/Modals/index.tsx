import React from 'react'
import { PrivacyPolicyModal } from './PrivacyPolicyModal'
import { RattingModal } from './RattingModal'
import { DeletaAccountModal } from './DeleteAccount'
import { ChangePhotoModal } from './ChangePhoto'

export default function Modals() {
  return (
    <>
      <PrivacyPolicyModal />
      <RattingModal />
      <DeletaAccountModal />
      <ChangePhotoModal />
    </>
  )
}
