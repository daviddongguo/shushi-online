import connectUserDB, { userDbConnection } from '@/utilities/userDBConnect'
import User from '@/models/User'
import mongoose from 'mongoose'

export default async function handler(req, res) {
  try {
    if (!userDbConnection.isConnected) {
      await connectUserDB()
    }

    switch (req.method) {
      case 'POST': {
        const { email, password } = req.body
        if (await isExistedUser(email)) {
          res.status(400).json({ error: `email(${email}) is existed.` })
          break
        }
        const userDB = await User.create({ email, password })
        res.status(201).json(userDB)
        break
      }
      case 'GET':
        res.status(200).json(await User.find())
        break
      default:
        res.status(405).json({ message: 'Method not allowed.' })
        break
    }
  } catch (error) {
    console.error(error)
    res.status(500).json(error)
  }
}

export async function isExistedUser(email) {
  return (await findUserByEmail(email)) !== null
}

export async function isValidId(id) {
  return mongoose.Types.ObjectId.isValid(id)
}

export async function findUserById(id) {
  if (!isValidId(id)) {
    return null
  }

  try {
    const user = await User.findOne({ _id: id }).exec()
    return user
  } catch (error) {
    console.error(error)
    return null
  }
}

export async function findUserByEmail(email) {
  try {
    const user = await User.findOne({ email }).exec()
    return user
  } catch (error) {
    console.error(error)
    return null
  }
}
