import { v4 as uuidv4 } from 'uuid'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const data = {
      error: false,
      message: 'Solicitacoes recebidas com sucesso',
      results: [
        {
          id: 1,
          nome: 'Aluguel Lava Jato',
          qtd_fichas: 1,
        },
        {
          id: 2,
          nome: 'Imposto Anual',
          qtd_fichas: 12,
        },
        {
          id: 3,
          nome: 'Alexandre Férias',
          qtd_fichas: 4,
        },
      ],
    }

    res.status(200).json(data)
  }
}
