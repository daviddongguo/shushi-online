import connectSushiDB, { sushiDbConnection } from '@/utilities/sushiDBConnect'
import UserRecipe from '@/models/UserRecipe'

export default async function handler(req, res) {
  if (!sushiDbConnection.isConnected) {
    await connectSushiDB()
  }

  switch (req.method) {
    case 'POST': {
      await UserRecipe.insertMany(list)
      const arrayMongo = await UserRecipe.find()
      res.status(200).json(arrayMongo)
      break
    }
    default:
      res.status(405).json({ message: 'Method not allowed.' })
  }
}

const list = [
  {
    userId: '649b38a5fb7d74de088b7c1b',
    recipeId: '52955',
  },

  {
    userId: '649b38a5fb7d74de088b7c1b',
    recipeId: '53073',
  },
  {
    userId: '649b38a5fb7d74de088b7c1b',
    recipeId: '53072',
  },
  {
    userId: '649b38a5fb7d74de088b7c1b',
    recipeId: '52975',
  },
  {
    userId: '649b38a5fb7d74de088b7c1b',
    recipeId: '52962',
  },
]
