'use client'

/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next'
import { LoginForm } from '../components/Forms/LoginForm'
import Container from '../components/Partials/Container'
import Modals from '../components/Modals'

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
            <LoginForm />
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

