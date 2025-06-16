import express from 'express'
import cors from 'cors'
import http from 'http'
import dotenv from 'dotenv'
import { connectDB } from './lib/db.js';
import userRoutes from './routes/userRoutes.js'


// creating app and HTTP server
const app = express()
const server = http.createServer(app)
dotenv.config()

// middlewares
app.use(cors())
app.use(express.json())

app.use('/api/status', (req, res) => {
  res.status(200).json({ message: 'Server is live..' })
})
app.use("/api/auth", userRoutes)

// connecting to DB
connectDB()

app.listen(5000, () => {
  console.log(
    `Server is running on http://localhost:${process.env.PORT || 5000}`
  )
})
