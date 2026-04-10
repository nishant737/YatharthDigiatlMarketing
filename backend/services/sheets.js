const { google } = require('googleapis')
const path = require('path')

function getAuth() {
  if (process.env.GOOGLE_CREDENTIALS_JSON) {
    // Production: use credentials from env var (JSON string)
    let credentials
    try {
      credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS_JSON)
    } catch (e) {
      throw new Error('GOOGLE_CREDENTIALS_JSON is not valid JSON: ' + e.message)
    }
    return new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    })
  } else {
    // Local dev: use credentials file
    return new google.auth.GoogleAuth({
      keyFile: path.join(__dirname, '../google-credentials.json'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    })
  }
}

async function appendToSheet(lead) {
  try {
    if (!process.env.GOOGLE_SHEET_ID) {
      console.error('❌ Sheets error: GOOGLE_SHEET_ID env var is not set')
      return
    }

    const auth        = getAuth()
    const client      = await auth.getClient()
    const sheets      = google.sheets({ version: 'v4', auth: client })
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
    if (err.response) {
      console.error('❌ Sheets API response:', JSON.stringify(err.response.data))
    }
  }
}

module.exports = { appendToSheet }
