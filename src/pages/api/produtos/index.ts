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
          nome: 'Saco 70x100 60kg rafia unidade',
          imagem_url: '/img/produto.png',
          descricao:
            '<p>Aliquam fringilla iaculis nibh vel cursus. Vestibulum mattis vestibulum vulputate. Pellentesque efficitur ornare quam, non fermentum purus mattis sit amet.</p>',
          valor: 15,
        },
        {
          id: 2,
          nome: 'Saco de lixo 30 lts katalixo c/10 unidade',
          imagem_url: '/img/produto.png',
          descricao:
            '<p>Aliquam fringilla iaculis nibh vel cursus. Vestibulum mattis vestibulum vulputate. Pellentesque efficitur ornare quam, non fermentum purus mattis sit amet.</p>',
          valor: 12,
        },
        {
          id: 3,
          nome: 'Saco 70x100 60kg rafia unidade',
          imagem_url: '/img/produto.png',
          descricao:
            '<p>Aliquam fringilla iaculis nibh vel cursus. Vestibulum mattis vestibulum vulputate. Pellentesque efficitur ornare quam, non fermentum purus mattis sit amet.</p>',
          valor: 32,
        },
        {
          id: 4,
          nome: 'Saco de lixo 30 lts katalixo c/10 unidade',
          imagem_url: '/img/produto.png',
          descricao:
            '<p>Aliquam fringilla iaculis nibh vel cursus. Vestibulum mattis vestibulum vulputate. Pellentesque efficitur ornare quam, non fermentum purus mattis sit amet.</p>',
          valor: 22,
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

