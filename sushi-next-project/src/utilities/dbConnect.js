import mongoose from 'mongoose'

const connectMongoDB = async () => mongoose.connect(process.env.MONGODB_URI)

export default connectMongoDB
