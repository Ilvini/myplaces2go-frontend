'use client'
import React, { useEffect } from 'react'
import { TopNavigation } from '../../components/TopNavigation'
import Container from '../../components/Partials/Container'
import { BottomNavigation } from '../../components/BottomNavigation'
import { TextAreaForm } from '../../components/Forms/components/TextAreaForm'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { errorHandler } from '../../services/errorHandler'
import { TextForm } from '../../components/Forms/components/TextForm'
import ButtonPrimary from '../../components/Buttons/ButtonPrimary'
import { CartCard } from '../../components/Cards/CartCard'
import { TextFormSearch } from '../../components/Forms/components/TextFormSearch'
import { cart } from '../../contracts/cart'
import { api_contract } from '../../services/axios'
import { get } from 'http'

const Produtos = () => {
  const [products, setProducts] = React.useState([])
  const [productsCategories, setProductsCategories] = React.useState([])
  async function getProducts() {
    try {
      const response = await api_contract.get('/produtos')
      setProducts(response.data.results)
    } catch (error: any) {
      errorHandler(error)
    }
  }
  async function getProductsCategories() {
    try {
      const response = await api_contract.get('/produtos/categorias')
      setProductsCategories(response.data.results)
    } catch (error: any) {
      errorHandler(error)
    }
  }

  useEffect(() => {
    getProducts()
    getProductsCategories()
  }, [])
  return (
    <>
      <TopNavigation />
      <main className="w-full min-h-[500px] justify-center  flex">
        <Container>
          <div className="w-full flex justify-center mt-8 mb-10 flex-col">
            <p className="text-center text-xl">Supermercado Barato</p>
            <strong className="text-brand-blue-800 font-bold text-center text-3xl mt-0 mb-4">
              Escolha os produtos
            </strong>
            <TextFormSearch name="search" placeholder="Buscar" />
            <select className="bg-brand-blue-800 font-bold text-base text-white mt-2 rounded-full px-6 py-5">
              {productsCategories?.map((categorie) => {
                return <option value={categorie.id}>{categorie.nome}</option>
              })}
            </select>
            <div className="mt-2 space-y-2 md:overflow-auto md:grid md:grid-cols-4 md:gap-4 md:flex-wrap  overflow-scroll max-h-[500px]">
              {products?.map((product) => {
                return (
                  <CartCard
                    key={product.id}
                    image_url={product.imagem_url}
                    id={product.id}
                    price={product.valor}
                    title={product.nome}
                    description={product.descricao}
                    hasAddButton={true}
                  />
                )
              })}
            </div>
            <div className=" max-w-[300px] mx-auto w-full">
              <ButtonPrimary>Finalizar Pedido</ButtonPrimary>
            </div>
          </div>
        </Container>
      </main>

      <BottomNavigation />
    </>
  )
}

export default Produtos

