const { google } = require('googleapis')
const path = require('path')

let authOptions
if (process.env.GOOGLE_CREDENTIALS_JSON) {
  // Production: use credentials from env var (JSON string)
  const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS_JSON)
  authOptions = { credentials, scopes: ['https://www.googleapis.com/auth/spreadsheets'] }
} else {
  // Local dev: use credentials file
  authOptions = {
    keyFile: path.join(__dirname, '../google-credentials.json'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  }
}

const auth = new google.auth.GoogleAuth(authOptions)

async function appendToSheet(lead) {
  try {
    const client     = await auth.getClient()
    const sheets     = google.sheets({ version: 'v4', auth: client })
    const spreadsheetId = process.env.GOOGLE_SHEET_ID

    const row = [
      lead.name,
      lead.phone,
      lead.service,
      lead.description,
      lead.budget,
      lead.score,
      lead.reason,
      new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    ]

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range:          'Sheet1!A:H',
      valueInputOption: 'RAW',
      requestBody:    { values: [row] },
    })

    console.log('✅ Sheet updated:', lead.name)
  } catch (err) {
    console.error('❌ Sheets error:', err.message)
  }
}

module.exports = { appendToSheet }
