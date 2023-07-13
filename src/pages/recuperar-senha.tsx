/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next'
import { LoginForm } from '../components/Forms/LoginForm'
import Container from '../components/Partials/Container'
import { RecoveryPasswordForm } from '../components/Forms/RecoveryPasswordForm'

const Home: NextPage = () => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-cover relative">
      <main className="">
        <img
          src="/img/bg-dots-top.png"
          alt=""
          className="left-0 absolute top-0 w-full md:hidden"
        />
        <Container>
          <div className="w-full bg-white/60 p-5 rounded-lg backdrop-blur z-50 relative">
            <img src="/img/logo.png" alt="Tver" className="w-[290px] mx-auto" />
            <h2 className="text-brand-blue-800 font-bold text-center text-2xl mt-10">
              Recuperar Senha
            </h2>
            <p className="text-center mt-3 text-brand-gray-600">
              Informe um dos dados abaixo e receba em seu e-mail um link para
              mudar sua senha
            </p>
            <RecoveryPasswordForm />
          </div>
        </Container>
        <img
          src="/img/bg-dots-bottom.png"
          alt=""
          className="left-0 absolute bottom-0 w-full md:hidden"
        />
      </main>
    </div>
  )
}

export default Home

