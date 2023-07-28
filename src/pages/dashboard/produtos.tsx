import React, { useEffect } from 'react'
import Container from '../../components/Partials/Container'
import { errorHandler } from '../../services/errorHandler'
import { CartCard } from '../../components/Cards/CartCard'
import { TextFormSearch } from '../../components/Forms/components/TextFormSearch'
import { api, api_contract } from '../../services/axios'
import { LayoutWIthElementFloat } from '../../components/Layout/LayoutWIthElementFloat'
import useClientStore from '../../stores/useClientStore'
import { useDebounce } from '../../hooks/useDebounce'

interface ICategorie {
  id: string
  nome: string
}
interface IProduct {
  id: string
  nome: string
  valor: number
  descricao: string
  imagem_url: string
}

const Produtos = () => {
  const [loading, setLoading] = React.useState<boolean>(false)
  const [products, setProducts] = React.useState<IProduct[]>([])
  const [productsCategories, setProductsCategories] = React.useState<
    ICategorie[]
  >([])
  const [search, setSearch] = React.useState<string>('')
  const [selectCategory, setSelectCategory] = React.useState<string>('')
  const searchDebounce = useDebounce(search, 1000)

  const client_name = useClientStore.getState().cliente

  async function getProducts() {
    try {
      const response = await api.get(
        `/produtos${search && '?nome=' + search.trim()}${
          selectCategory &&
          `${search ? '&' : '?'}categoria_id=` + selectCategory
        }`
      )
      setProducts(response.data.results)
    } catch (error: any) {
      errorHandler(error)
    }
  }
  async function getProductsCategories() {
    try {
      const response = await api.get('/produtos/categoria')
      setProductsCategories(response.data.results)
    } catch (error: any) {
      errorHandler(error)
    }
  }

  useEffect(() => {
    getProducts()
  }, [searchDebounce, selectCategory])

  useEffect(() => {
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
            <TextFormSearch
              name="search"
              placeholder="Buscar"
              setSearch={setSearch}
              search={search}
            />
            <select
              className="bg-brand-blue-800 font-bold text-base text-white mt-2 rounded-full px-6 py-5"
              onChange={(e) => setSelectCategory(e.target.value)}
            >
              <option defaultValue={''} hidden>
                Categorias
              </option>
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

