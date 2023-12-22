function Error({ statusCode }: { statusCode: number }) {
  return (
    <main className="flex justify-center items-center">
      <small>COD STATUS: {statusCode}</small>
      <h1 className="text-4xl font-bold">Ocorreu um erro inesperado</h1>
      <p>Por favor clique no botão para voltar ao inicio.</p>
      <button
        onClick={() => window.location.replace('/')}
        className="bg-brand-yellow-300 p-3 rounded-lg mt-5"
      >
        Voltar ao inicio
      </button>
    </main>
  )
}

Error.getInitialProps = ({ res, err }: { res: any; err: any }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error

