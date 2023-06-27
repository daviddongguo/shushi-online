import connectSushiDB, { sushiDbConnection } from '@/utilities/sushiDBConnect'
import UserRecipe from '@/models/UserRecipe'

export default async function handler(req, res) {
  if (!sushiDbConnection.isConnected) {
    await connectSushiDB()
  }

  switch (req.method) {
    case 'GET': {
      const { userId = '649b38a5fb7d74de088b7c1b' } = req.query
      const array = await UserRecipe.find({ userId })
      res.status(200).json(array)
      break
    }
    case 'POST': {
      const { userId } = req.body
      const itemDB = await UserRecipe.find({ userId })
      res.status(201).json(itemDB)
      break
    }
    default:
      res.status(405).json({ message: 'Method not allowed.' })
  }
}
