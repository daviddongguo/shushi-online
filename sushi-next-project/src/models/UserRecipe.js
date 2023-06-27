import mongoose from 'mongoose'

const UserRecipeSchema = new mongoose.Schema({
  userId: String,
  recipeId: String,
})

module.exports =
  mongoose.models.UserRecipe || mongoose.model('UserRecipe', UserRecipeSchema)
