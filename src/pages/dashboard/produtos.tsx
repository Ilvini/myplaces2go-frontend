import React, { useEffect } from 'react'
import Container from '../../components/Partials/Container'
import { errorHandler } from '../../services/errorHandler'
import { CartCard } from '../../components/Cards/CartCard'
import { TextFormSearch } from '../../components/Forms/components/TextFormSearch'
import { api_contract } from '../../services/axios'
import { LayoutWIthElementFloat } from '../../components/Layout/LayoutWIthElementFloat'
import useClientStore from '../../stores/useClientStore'

interface ICategorie {
  id: string
  nome: string
}

const Produtos = () => {
  const [products, setProducts] = React.useState([])
  const [productsCategories, setProductsCategories] = React.useState<
    ICategorie[]
  >([])

  const client_name = useClientStore.getState().cliente

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
      <LayoutWIthElementFloat
        navigationUrl={'/dashboard/tabelas'}
        hasBackpage={true}
      >
        <Container>
          <div className="w-full flex justify-center mt-8 mb-10 flex-col">
            <p className="text-center text-xl">{client_name?.nome}</p>
            <strong className="text-brand-blue-800 font-bold text-center text-3xl mt-0 mb-4">
              Escolha os produtos
            </strong>
            <TextFormSearch name="search" placeholder="Buscar" />
            <select className="bg-brand-blue-800 font-bold text-base text-white mt-2 rounded-full px-6 py-5">
              {productsCategories?.map((categorie) => {
                return (
                  <option key={categorie.id} value={categorie.id}>
                    {categorie.nome}
                  </option>
                )
              })}
            </select>
            <div className="mt-2  space-y-2 md:overflow-auto md:grid md:grid-cols-4 md:gap-4 md:flex-wrap  overflow-scroll max-h-[340px]">
              {products?.map((product) => {
                return (
                  <CartCard
                    product={product}
                    key={product.id}
                    image_url={product.imagem_url}
                    id={product.id}
                    price={product.valor}
                    title={product.nome}
                    description={product.descricao}
                    hasAddButton={true}
                    isCartPage={false}
                  />
                )
              })}
            </div>
            {/*   <div className=" max-w-[300px] mx-auto w-full mt-2">
              <ButtonPrimary>Finalizar Pedido</ButtonPrimary>
            </div> */}
          </div>
        </Container>
      </LayoutWIthElementFloat>
    </>
  )
}

export default Produtos

