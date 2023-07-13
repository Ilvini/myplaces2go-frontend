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
          nome: 'ARTIGOS PARA FESTA',
        },
        {
          id: 2,
          nome: 'EMBALAGENS',
        },
        {
          id: 3,
          nome: 'DOCES',
        },
        {
          id: 4,
          nome: 'SACOS E SACOLAS',
        },
        {
          id: 5,
          nome: 'PRODUTOS DE LIMPEZA',
        },
        {
          id: 6,
          nome: 'FRIOS',
        },

        {
          id: 7,
          nome: 'MERCEARIA',
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

