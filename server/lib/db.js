import mongoose from 'mongoose'

export const connectDB = async () => {
  try {
    mongoose.connection.on('connected', () => {
      console.log('Connected to MongoDB Database....')
    })
    await mongoose.connect(`${process.env.MONGO_URL}/quickchatMERN`)
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
  }
}
