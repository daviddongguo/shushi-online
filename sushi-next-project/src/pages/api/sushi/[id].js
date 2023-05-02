import connectSushiDB, { sushiDbConnection } from '@/utilities/sushiDBConnect'
import Sushi from '@/models/Sushi'
import { isValidId } from '../users'

export default async function handler(req, res) {
  const { id } = req.query
  if (!isValidId(id)) {
    // the resource of this URL is invalid
    res.status(404).json({ error: `id(${id}) is not valid` })
    return
  }

  let sushiDB
  try {
    if (!sushiDbConnection.isConnected) {
      await connectSushiDB()
    }

    sushiDB = await findSushiById(id)
    if (!sushiDB) {
      // the resource of this URL is invalid
      res.status(404).json({ error: `sushi(id = ${id} nof found)` })
      return
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'DB server error' })
  }

  try {
    switch (req.method) {
      case 'GET': {
        res.status(200).json({ ...sushiDB._doc })
        break
      }
      case 'DELETE': {
        await deleteSushiById(id)
        // the URL is valid and Server has successfully did the execution but it has no data to return
        res.status(204).send()
        break
      }
      case 'PUT': {
        const { title, image, description, price } = req.body
        try {
          const updated = await updateSushi(id, {
            title,
            image,
            description,
            price,
          })
          if (updated) {
            res.status(200).json(updated)
          } else {
            res.status(500).json({ error: 'Server Error' })
          }
        } catch (error) {
          res.status(500).json({ error })
        }
        break
      }
      default:
        res.status(405).json({ message: 'Method not allowed.' })
        break
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'DB server error' })
  }
}

export async function findSushiById(id) {
  if (!isValidId(id)) {
    return null
  }

  try {
    const sushi = await Sushi.findOne({ _id: id }).exec()
    return sushi
  } catch (error) {
    console.error(error)
    return null
  }
}

export async function deleteSushiById(id) {
  try {
    await Sushi.deleteOne({ _id: id })
  } catch (error) {
    console.error(error)
  }
}

export async function updateSushi(id, sushiToUpdate) {
  try {
    const updatedSushi = await Sushi.findByIdAndUpdate(
      id,
      {
        title: sushiToUpdate.title,
        image: sushiToUpdate.image,
        description: sushiToUpdate.description,
        price: sushiToUpdate.price,
      },
      { new: true }
    )
    return updatedSushi
  } catch (error) {
    console.error(error)
    throw error
  }
}
