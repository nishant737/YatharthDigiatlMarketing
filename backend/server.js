require('dotenv').config()
const express   = require('express')
const mongoose  = require('mongoose')
const cors      = require('cors')
const path      = require('path')
const leadRoute = require('./routes/lead')

const app  = express()
const PORT = process.env.PORT || 5000

// Middleware
const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',')
  : ['*']
app.use(cors({
  origin: allowedOrigins.includes('*') ? '*' : allowedOrigins,
  methods: ['GET', 'POST'],
}))
app.use(express.json())

// API Routes
app.use('/api/lead', leadRoute)

// Serve frontend in production
const distPath = path.join(__dirname, '../frontend/dist')
app.use(express.static(distPath))

// All non-API routes → frontend (SPA client-side routing)
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'))
})

// Connect to MongoDB then start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected')
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))
  })
  .catch(err => {
    console.error('❌ MongoDB connection failed:', err.message)
    process.exit(1)
  })
