import { v4 as uuidv4 } from 'uuid'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = {
    error: false,
    message: 'Prospecção criada com sucesso',
    results: [],
  }

  res.status(200).json(data)
}

