import React from 'react'
import Container from '../../components/Partials/Container'
import { LayoutWIthElementFloat } from '../../components/Layout/LayoutWIthElementFloat'
import { ProspectionForm } from '../../components/Forms/ProspectionForm'

const Prospeccao = () => {
  return (
    <>
      <LayoutWIthElementFloat hasBackpage={true}>
        <Container>
          <div className="w-full flex justify-center my-10">
            <strong className="text-brand-blue-800 font-bold text-center text-3xl mt-10">
              Prospecção
            </strong>
          </div>
          <ProspectionForm />
          <div className="flex flex-col items-center w-full space-y-6"></div>
        </Container>
      </LayoutWIthElementFloat>
    </>
  )
}

export default Prospeccao

