import { v4 as uuidv4 } from 'uuid'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = {
    error: false,
    message: 'Sem erros',
    payload: req.body,
    results: {
      token: uuidv4(),
      Nome: 'John Doe',
    },
  }

  res.status(200).json(data)
}
