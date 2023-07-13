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

  async function getProducts() {
    try {
      const response = await api_contract.get('/produtos')
      setProducts(response.data.results)
    } catch (error: any) {
      errorHandler(error)
    }
  }

  useEffect(() => {
    getProducts()
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
            <div className="mt-2 space-y-2 md:overflow-auto md:grid md:grid-cols-4 md:gap-4 md:flex-wrap  overflow-scroll max-h-[500px]">
              {products?.map((item) => {
                return (
                  <CartCard
                    key={item.id}
                    image_url={item.imagem_url}
                    id={item.id}
                    price={item.valor}
                    title={item.nome}
                    description={item.descricao}
                    hasAddButton={true}
                  />
                )
              })}
              {/*   <CartCard
                image_url="/img/produto.png"
                id="12312312"
                price={10}
                title="Saco de lixo 100 lts katalixo c/05 und"
                description="<p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi corrupti cum neque reiciendis amet? Dolorum ut repellat voluptas est eius.</p>"
                hasAddButton={true}
              />
              <CartCard
                image_url="/img/produto.png"
                id="12312312"
                price={10}
                title="Saco de lixo 100 lts katalixo c/05 und"
                description="<p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi corrupti cum neque reiciendis amet? Dolorum ut repellat voluptas est eius.</p>"
                hasAddButton={true}
              />
              <CartCard
                image_url="/img/produto.png"
                id="12312312"
                price={10}
                title="Saco de lixo 100 lts katalixo c/05 und"
                description="<p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi corrupti cum neque reiciendis amet? Dolorum ut repellat voluptas est eius.</p>"
                hasAddButton={true}
              />
              <CartCard
                image_url="/img/produto.png"
                id="12312312"
                price={10}
                title="Saco de lixo 100 lts katalixo c/05 und"
                description="<p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi corrupti cum neque reiciendis amet? Dolorum ut repellat voluptas est eius.</p>"
                hasAddButton={true}
              />
              <CartCard
                image_url="/img/produto.png"
                id="12312312"
                price={10}
                title="Saco de lixo 100 lts katalixo c/05 und"
                description="<p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi corrupti cum neque reiciendis amet? Dolorum ut repellat voluptas est eius.</p>"
                hasAddButton={true}
              />
              <CartCard
                image_url="/img/produto.png"
                id="12312312"
                price={10}
                title="Saco de lixo 100 lts katalixo c/05 und"
                description="<p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi corrupti cum neque reiciendis amet? Dolorum ut repellat voluptas est eius.</p>"
                hasAddButton={true}
              /> */}
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

