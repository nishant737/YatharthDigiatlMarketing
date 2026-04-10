const Groq = require('groq-sdk')

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

async function scoreLead({ service, description, budget }) {
  try {
    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'user',
          content: `
You are an expert sales lead scoring assistant for Yatharth, a digital marketing agency.

A potential customer submitted this enquiry:
- Service needed: ${service}
- Project description: ${description}
- Budget: ₹${budget}

Score this lead by carefully evaluating BOTH the budget AND the description quality together.

Scoring rules:

HOT (score = "HOT"):
- Budget ₹30,000 or above AND description is clear, specific, and shows serious intent
- OR budget is very high (₹50,000+) even if description is average

WARM (score = "WARM"):
- Budget ₹10,000–₹29,999 with a decent description
- OR budget ₹30,000+ but description is vague or unclear
- OR budget is low but description is very detailed and shows strong intent

COLD (score = "COLD"):
- Budget under ₹10,000 AND description is vague, too short, or unclear
- OR no real project scope is mentioned regardless of budget

Description quality checklist (use this to judge):
- GOOD description: mentions specific goals, target audience, timeline, deliverables, or platform
- BAD description: one word answers, "need website", "logo design", no context given

Be strict and accurate. Do not give HOT just because budget is high if the description is poor. Do not give COLD if description is excellent even with medium budget.

Respond in this exact JSON format only, no extra text:
{
  "score": "HOT",
  "reason": "one sentence explanation mentioning both budget and description quality"
}
`
        }
      ],
    })

    const text = completion.choices[0].message.content.trim()

    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) throw new Error('Invalid Groq response')

    const parsed = JSON.parse(jsonMatch[0])
    return {
      score:  parsed.score  || 'COLD',
      reason: parsed.reason || 'Unable to determine',
    }
  } catch (err) {
    console.error('Groq error:', err.message)
    // Fallback to simple budget-based scoring
    const num = parseInt(budget.replace(/[^0-9]/g, '')) || 0
    if (num >= 30000) return { score: 'HOT',  reason: 'High budget lead' }
    if (num >= 10000) return { score: 'WARM', reason: 'Medium budget lead' }
    return               { score: 'COLD', reason: 'Low budget lead' }
  }
}

module.exports = { scoreLead }
