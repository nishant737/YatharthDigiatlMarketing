const express  = require('express')
const router   = express.Router()
const Lead     = require('../models/Lead')
const { scoreLead }    = require('../services/gemini')
const { appendToSheet } = require('../services/sheets')

// POST /api/lead — receive lead from chatbot
router.post('/', async (req, res) => {
  try {
    const { name, phone, service, description, budget } = req.body

    // Validate required fields
    if (!name || !phone || !service || !description || !budget) {
      return res.status(400).json({ error: 'All fields are required' })
    }

    // 1. Score lead with Gemini AI
    console.log('🤖 Scoring lead with Gemini...')
    const { score, reason } = await scoreLead({ service, description, budget })
    console.log(`📊 Score: ${score} — ${reason}`)

    // 2. Save to MongoDB
    const lead = new Lead({ name, phone, service, description, budget, score, reason })
    await lead.save()
    console.log('💾 Saved to MongoDB:', lead._id)

    // 3. Push to Google Sheets (non-blocking)
    appendToSheet({ name, phone, service, description, budget, score, reason })

    res.json({ success: true, score, reason })

  } catch (err) {
    console.error('❌ Lead error:', err.message)
    res.status(500).json({ error: 'Something went wrong. Please try again.' })
  }
})

module.exports = router
