import connectUserDB, { userDbConnection } from '@/utilities/userDBConnect'
import { findUserByEmail } from './signup'

export default async function handler(req, res) {
  try {
    if (!userDbConnection.isConnected) {
      await connectUserDB()
    }
    switch (req.method) {
      case 'POST': {
        const { email, password } = req.body
        const userDB = await findUserByEmail(email)
        if (userDB && userDB.password === password) {
          res.status(200).json({ id: userDB._id, email })
          break
        }
        res.status(400).json({ error: 'email or password are invalid' })
        break
      }
      default:
        res.status(405).json({ message: 'Method not allowed.' })
        break
    }
  } catch (error) {
    console.error(error)
    res.status(500).json(error)
  }
}
