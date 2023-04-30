import connectMongoDB, { connection } from '@/utilities/dbConnect'
import User from '@/models/User'
import { findUserById, isValidId } from '../users'

export default async function handler(req, res) {
  const { id } = req.query
  if (!isValidId(id)) {
    res.status(400).json({ error: `id(${id}) is not valid` })
    return
  }

  let userDB
  try {
    if (!connection.isConnected) {
      await connectMongoDB()
    }

    userDB = await findUserById(id)
    if (!userDB) {
      res.status(400).json({ error: `user(id = ${id} nof found)` })
      return
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'DB server error' })
  }

  try {
    switch (req.method) {
      case 'GET': {
        res.status(200).json({ id: userDB._id, email: userDB.email })
        break
      }
      case 'DELETE': {
        await deleteUserById(id)
        res.status(200).json({ message: 'successfully' })
        break
      }
      case 'PUT': {
        const { password } = req.body
        try {
          const updatedUser = await updateUserPassword(id, password)
          if (updatedUser) {
            res.status(200).json(updatedUser)
          } else {
            res.status(404).json({ error: 'User not found' })
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

export async function deleteUserById(id) {
  try {
    await User.deleteOne({ _id: id })
  } catch (error) {
    console.error(error)
  }
}

export async function updateUserPassword(id, password) {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { password },
      { new: true }
    )
    return updatedUser
  } catch (error) {
    console.error(error)
    throw error
  }
}
