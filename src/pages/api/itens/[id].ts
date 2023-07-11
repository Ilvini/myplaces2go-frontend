import { v4 as uuidv4 } from 'uuid'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const data = {
      error: false,
      message: 'Sem erros',
      results: {
        nome: 'Venda HB20',
        descricao: 'Venda de um HB20 2019',
        abas: [
          {
            id: uuidv4(),
            titulo: 'Revisão',
            descricao:
              'O Carro foi revisado e está em perfeito estado de conservação e funcionamento. Foram trocados os pneus, óleo, filtros e feita a limpeza do ar condicionado. O carro está pronto para ser vendido.',
            comentarios: [
              {
                id: uuidv4(),
                descricao: 'Manutenção realizada em 12/09/2021',
                arquivo_link: 'https://tver-pwa.vercel.app/seo.png',
                arquivo_nome: 'manutencao_12_09_2021.pdf',
                data_aviso: '2023-09-01',
                data_aviso_estado: true,
              },
              {
                id: uuidv4(),
                descricao: 'Troca de óleo realizada em 12/09/2021',
                arquivo_link: 'https://tver-pwa.vercel.app/seo.png',
                arquivo_nome: 'troca_oleo_12_09_2021.pdf',
                data_aviso: '2023-10-12',
                data_aviso_estado: false,
              },
            ],
          },
          {
            id: uuidv4(),
            titulo: 'Pagamentos',
            descricao: 'Pagamento da entrada do veículo no dia 12/09/2021',
            comentarios: [
              {
                id: uuidv4(),
                descricao:
                  'Comprovanete de pagamento da entrada do veículo no valor de R$ 10.000,00',
                arquivo_link: 'https://tver-pwa.vercel.app/seo.png',
                arquivo_nome: 'recibo.pdf',
              },
            ],
          },
        ],
      },
    }
    res.status(201).json(data)
  }
}
