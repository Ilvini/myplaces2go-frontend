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
          nome: 'Supermercado Barato',
          tabela: 'Á vista',
          data: '12/12/2020',
          valor: 213,
        },
        {
          id: 2,
          nome: 'Supermercado Barato',
          tabela: '21 dias',
          data: '09/03/2022',
          valor: 123,
        },
        {
          id: 3,
          nome: 'Supermercado Barato',
          tabela: '7 dias',
          data: '12/01/2020',
          valor: 568,
        },
        {
          id: 4,
          nome: 'Supermercado Barato',
          tabela: '14 dias',
          data: '01/09/2023',
          valor: 87,
        },
      ],
    }

    res.status(200).json(data)
  }

  /* if (req.method === 'POST') {
    const data = {
      error: false,
      message: 'Categoria criada com sucesso',
      payload: req.body,
    }
    res.status(201).json(data)
  } */
}

