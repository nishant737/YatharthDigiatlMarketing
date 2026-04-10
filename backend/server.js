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

// Debug: test Google Sheets connection
app.get('/api/test-sheet', async (_req, res) => {
  const { appendToSheet } = require('./services/sheets')
  try {
    await appendToSheet({
      name: 'Test Lead',
      phone: '0000000000',
      service: 'Test',
      description: 'Production connectivity test',
      budget: '0',
      score: 'WARM',
      reason: 'Test entry',
    })
    res.json({ success: true, message: 'Sheet write attempted — check logs for ✅ or ❌' })
  } catch (err) {
    res.status(500).json({ success: false, error: err.message })
  }
})

// Serve frontend in production (only if dist exists — not needed when frontend is on Vercel)
const distPath = path.join(__dirname, '../frontend/dist')
const fs = require('fs')
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath))
  app.get('*', (_req, res) => {
    res.sendFile(path.join(distPath, 'index.html'))
  })
}

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
