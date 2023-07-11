/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next'
import { LoginForm } from '../components/Forms/LoginForm'
import Container from '../components/Partials/Container'

const Home: NextPage = () => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-cover">
      <main>
        <Container>
          <div className="w-full bg-white/60 p-5 rounded-lg backdrop-blur">
            <img src="/logo.png" alt="Tver" className="w-72 mx-auto" />
            <LoginForm />
          </div>
        </Container>
      </main>
    </div>
  )
}

export default Home
