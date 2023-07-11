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
          nome: 'Veiculos',
          cor: '#FF0000',
        },
        {
          id: 2,
          nome: 'Imoveis',
          cor: '#00FF00',
        },
        {
          id: 3,
          nome: 'Empresa',
          cor: '#0000FF',
        },
        {
          id: 4,
          nome: 'Saúde',
          cor: '#FFFF00',
        },
      ],
    }

    res.status(200).json(data)
  }

  if (req.method === 'POST') {
    const data = {
      error: false,
      message: 'Categoria criada com sucesso',
      payload: req.body,
    }
    res.status(201).json(data)
  }
}
