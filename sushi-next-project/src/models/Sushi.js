import mongoose from 'mongoose'

const SushiSchema = new mongoose.Schema({
  title: String,
  image: String,
  description: String,
  price: Number,
})

module.exports = mongoose.models.Sushi || mongoose.model('Sushi', SushiSchema)
