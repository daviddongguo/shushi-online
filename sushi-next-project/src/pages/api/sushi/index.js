import connectSushiDB, { sushiDbConnection } from '@/utilities/sushiDBConnect'
import Sushi from '@/models/Sushi'

export default async function handler(req, res) {
  if (!sushiDbConnection.isConnected) {
    await connectSushiDB()
  }

  switch (req.method) {
    case 'GET': {
      const { title = '', number = 12 } = req.query
      const arrayMongo = await Sushi.find({
        title: { $regex: title, $options: 'i' },
      })
        .limit(number)
        .sort('price')
      const array = arrayMongo.map((item) => {
        return {
          id: item._id,
          title: item.title,
          image: item.image,
          description: item.description,
          price: item.price,
        }
      })
      res.status(200).json(array)
      break
    }
    case 'POST': {
      const { title, image, description, price } = req.body
      const itemDB = await Sushi.create({ title, image, description, price })
      res.status(201).json(itemDB)
      break
    }
    default:
      res.status(405).json({ message: 'Method not allowed.' })
  }
}
