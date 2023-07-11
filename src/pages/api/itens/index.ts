import { v4 as uuidv4 } from 'uuid'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  if (req.method === 'POST') {
    const data = {
      error: false,
      message: 'Item criado com sucesso',
      payload: req.body,
    }
    res.status(201).json(data)
  }
}
