import mongoose from 'mongoose'

const connection = {}

// const connectMongoDB = async () => mongoose.connect(process.env.MONGODB_URI)

const connectMongoDB = async () => {
  if (connection.isConnected) {
    return
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI)

    connection.isConnected = db.connections[0].readyState
    console.log('MongoDb Connected')
  } catch (error) {
    console.error(error)
  }
}

export default connectMongoDB
export { connection }
