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
          nome: 'Artigos para festa',
        },
        {
          id: 2,
          nome: 'Embalagens',
        },
        {
          id: 3,
          nome: 'Doces',
        },
        {
          id: 4,
          nome: 'Sacos e sacolas',
        },
        {
          id: 5,
          nome: 'Produtos de limpeza',
        },
        {
          id: 6,
          nome: 'Frios',
        },

        {
          id: 7,
          nome: 'Mercearia',
        },
      ],
    }

    res.status(200).json(data)
  }

  /*  if (req.method === 'POST') {
    const data = {
      error: false,
      message: 'Categoria criada com sucesso',
      payload: req.body,
    }
    res.status(201).json(data)
  } */
}

