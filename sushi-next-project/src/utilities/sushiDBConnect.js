import mongoose from 'mongoose'

const sushiDbConnection = { isConnected: false }

const connectSushiDB = async () => {
  if (sushiDbConnection.isConnected) {
    return
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_SUSHI_URI)

    sushiDbConnection.isConnected = db.connections[0].readyState
    console.log('Sushi MongoDb Connected')
  } catch (error) {
    console.error(error)
  }
}

export default connectSushiDB
export { sushiDbConnection }
