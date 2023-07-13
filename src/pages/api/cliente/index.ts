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
          nome: 'Supermercado Mundial',
          responsavel: 'João da Silva',
          telefone: '(91) 95689-7878',
        },
        {
          id: 2,
          nome: 'Supermercado Barato',
          responsavel: 'Felipe aguiar',
          telefone: '(21) 99895-2682',
        },
        {
          id: 3,
          nome: 'Supermercado Sendas',
          responsavel: 'JMaria josé',
          telefone: '(91) 99878-9999',
        },
        {
          id: 4,
          nome: 'Bar do zé',
          responsavel: 'Arthur Nogueira',
          telefone: '(32) 96658-1125',
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

