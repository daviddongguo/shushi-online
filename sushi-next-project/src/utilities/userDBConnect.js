import mongoose from 'mongoose'

const userDbConnection = { isConnected: false }

const connectUserDB = async () => {
  if (userDbConnection.isConnected) {
    return
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_USER_URI)
    console.log(db.connections.length)

    userDbConnection.isConnected = db.connections[0].readyState
    console.log('User MongoDb Connected')
  } catch (error) {
    console.error(error)
  }
}

export default connectUserDB
export { userDbConnection }
