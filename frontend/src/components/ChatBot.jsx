import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import arthLogo from '../asset/Arth_Logo.png'

const SERVICE_OPTIONS = ['Website', 'Branding', 'Social Media', 'Logo', 'Other']

const QUESTIONS = [
  { key: 'service',     text: 'Hi! 👋 Welcome to Yatharth.\n\nWhat service are you looking for?' },
  { key: 'description', text: 'Got it! In one line, describe the product or project you need this for.' },
  { key: 'name',        text: 'Great! May I know your name?' },
  { key: 'phone',       text: 'Nice to meet you! What is your contact number?' },
  { key: 'budget',      text: 'What is your approximate budget? (in ₹)\n(e.g. 10000, 50000, 1 lakh)' },
]

const BACKEND_URL = import.meta.env.VITE_API_URL || '/api/lead'

export default function ChatBot({ loaded }) {
  const [visible, setVisible]   = useState(false)
  const [open, setOpen]         = useState(false)
  const [messages, setMessages] = useState([])
  const [step, setStep]         = useState(0)
  const [input, setInput]       = useState('')
  const [answers, setAnswers]   = useState({})
  const [done, setDone]         = useState(false)
  const [sending, setSending]       = useState(false)
  const [serviceOther, setServiceOther] = useState(false)
  const [isMobile, setIsMobile]     = useState(window.innerWidth <= 480)
  const bottomRef               = useRef(null)
  const inputRef                = useRef(null)

  // Only show after loading screen completes + 800ms grace
  useEffect(() => {
    if (!loaded) return
    const t = setTimeout(() => setVisible(true), 800)
    return () => clearTimeout(t)
  }, [loaded])


  // Detect mobile / desktop
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 480)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Scroll to bottom on new message
  useEffect(() => {
    const t = setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, 80)
    return () => clearTimeout(t)
  }, [messages])

  // Focus input when chat opens
  useEffect(() => {
    if (open && !done) {
      const t = setTimeout(() => inputRef.current?.focus(), 350)
      return () => clearTimeout(t)
    }
  }, [open, done])

  const addBot = (text) =>
    setMessages(prev => [...prev, { from: 'bot', text }])

  const handleSend = async () => {
    const trimmed = input.trim()
    if (!trimmed || sending) return

    const current    = QUESTIONS[step]
    const newAnswers = { ...answers, [current.key]: trimmed }

    setMessages(prev => [...prev, { from: 'user', text: trimmed }])
    setAnswers(newAnswers)
    setInput('')

    if (step < QUESTIONS.length - 1) {
      const nextStep = step + 1
      setStep(nextStep)
      setTimeout(() => addBot(QUESTIONS[nextStep].text), 460)
    } else {
      setSending(true)
      try {
        const res = await fetch(BACKEND_URL, {
          method:  'POST',
          headers: { 'Content-Type': 'application/json' },
          body:    JSON.stringify(newAnswers),
        })
        const data = await res.json()
        const scoreEmoji = data.score === 'HOT' ? '🔴' : data.score === 'WARM' ? '🟡' : '🔵'
        setTimeout(() => {
          addBot(`Thank you! 🙏 We'll get back to you shortly.`)
          setDone(true)
        }, 460)
      } catch (e) {
        console.error('Backend error:', e)
        setTimeout(() => {
          addBot(`Thank you! 🙏 We'll get back to you shortly.`)
          setDone(true)
        }, 460)
      }
      setSending(false)
    }
  }

  const handleServiceSelect = (service) => {
    if (service === 'Other') {
      setServiceOther(true)
      setMessages(prev => [...prev, { from: 'user', text: 'Other' }])
      setTimeout(() => addBot('Sure! Please describe the service you\'re looking for.'), 400)
      return
    }
    const newAnswers = { ...answers, service }
    setMessages(prev => [...prev, { from: 'user', text: service }])
    setAnswers(newAnswers)
    setStep(1)
    setTimeout(() => addBot(QUESTIONS[1].text), 460)
  }

  const handleRestart = () => {
    setMessages([{ from: 'bot', text: QUESTIONS[0].text }])
    setStep(0); setAnswers({}); setInput(''); setDone(false); setServiceOther(false)
  }

  // Responsive layout config
  const chatStyle = isMobile
    ? { bottom: '72px', right: '12px', width: '280px', height: '370px', borderRadius: '16px' }
    : { bottom: '80px', right: '24px', width: '300px', height: '420px', borderRadius: '16px' }

  // Framer-motion animation variants
  const chatVariants = {
    hidden:  { opacity: 0, y: 24, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1,
               transition: { type: 'spring', stiffness: 320, damping: 28, mass: 0.9 } },
    exit:    { opacity: 0, y: 20, scale: 0.95,
               transition: { duration: 0.2, ease: [0.4, 0, 1, 1] } },
  }

  const fabVariants = {
    hidden:  { scale: 0, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 400, damping: 22, delay: 0.05 } },
    exit:    { scale: 0, opacity: 0, transition: { duration: 0.16 } },
  }

  const msgVariants = {
    hidden:  { opacity: 0, y: 10, scale: 0.97 },
    visible: { opacity: 1, y: 0, scale: 1,
               transition: { type: 'spring', stiffness: 380, damping: 28 } },
  }

  if (!visible) return null

  return (
    <>
      {/* ── Chat Window ──────────────────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="chatwindow"
            variants={chatVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{ ...st.wrapper, ...chatStyle, position: 'fixed', zIndex: 99998 }}
          >
            {/* Header */}
            <div style={st.header}>
              <div style={st.headerLeft}>
                <div style={st.avatar}>
                  <img src={arthLogo} alt="Arth" style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '50%' }} />
                </div>
                <div>
                  <div style={st.headerName}>Arth Assistant</div>
                  <div style={st.headerStatus}>
                    <span style={st.onlineDot} />
                    Online
                  </div>
                </div>
              </div>
              <motion.button
                onClick={() => setOpen(false)}
                style={st.closeBtn}
                whileHover={{ scale: 1.12, background: 'rgba(255,255,255,0.2)' }}
                whileTap={{ scale: 0.88 }}
                aria-label="Close chat"
              >✕</motion.button>
            </div>

            {/* Animated progress bar */}
            {!done && (
              <div style={st.progressTrack}>
                <motion.div
                  style={st.progressFill}
                  animate={{ width: `${(step / QUESTIONS.length) * 100}%` }}
                  transition={{ type: 'spring', stiffness: 120, damping: 20 }}
                />
              </div>
            )}

            {/* Messages */}
            <div style={st.messages}>
              <AnimatePresence initial={false}>
                {messages.map((m, i) => (
                  <motion.div
                    key={i}
                    variants={msgVariants}
                    initial="hidden"
                    animate="visible"
                    style={m.from === 'bot' ? st.botRow : st.userRow}
                  >
                    {m.from === 'bot' && (
                      <div style={st.botAvatar}>
                        <img src={arthLogo} alt="Arth" style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '50%' }} />
                      </div>
                    )}
                    <div style={m.from === 'bot' ? st.botBubble : st.userBubble}>
                      {m.text.split('\n').map((line, j, arr) => (
                        <span key={j}>{line}{j < arr.length - 1 && <br />}</span>
                      ))}
                    </div>
                  </motion.div>
                ))}

                {/* Animated typing dots */}
                {sending && (
                  <motion.div key="typing" variants={msgVariants} initial="hidden" animate="visible" style={st.botRow}>
                    <div style={st.botAvatar}>
                      <img src={arthLogo} alt="Arth" style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '50%' }} />
                    </div>
                    <div style={{ ...st.botBubble, ...st.typingBubble }}>
                      {[0, 1, 2].map(i => (
                        <motion.span
                          key={i}
                          style={st.typingDot}
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={bottomRef} />
            </div>

            {/* Input / Service Buttons / Restart */}
            <AnimatePresence mode="wait">
              {!done && step === 0 && !serviceOther ? (
                <motion.div
                  key="service-btns"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  style={st.serviceBtnArea}
                >
                  {SERVICE_OPTIONS.map(s => (
                    <motion.button
                      key={s}
                      style={st.serviceBtn}
                      onClick={() => handleServiceSelect(s)}
                      whileHover={{ scale: 1.06, background: 'rgba(219,100,54,0.15)', borderColor: '#DB6436' }}
                      whileTap={{ scale: 0.93 }}
                    >{s}</motion.button>
                  ))}
                </motion.div>
              ) : !done && (step > 0 || serviceOther) ? (
                <motion.div
                  key="input"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  style={st.inputRow}
                >
                  <input
                    ref={inputRef}
                    style={st.input}
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSend()}
                    placeholder={serviceOther && step === 0 ? 'Describe your service…' : 'Type your answer…'}
                    disabled={sending}
                    autoComplete="off"
                  />
                  <motion.button
                    style={{ ...st.sendBtn, opacity: input.trim() && !sending ? 1 : 0.38 }}
                    onClick={handleSend}
                    disabled={!input.trim() || sending}
                    whileHover={{ scale: 1.07 }}
                    whileTap={{ scale: 0.91 }}
                    aria-label="Send"
                  >➤</motion.button>
                </motion.div>
              ) : done ? (
                <motion.div
                  key="restart"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  style={st.inputRow}
                >
                  <motion.button
                    style={{ ...st.sendBtn, flex: 1, fontSize: '0.8rem', borderRadius: '12px' }}
                    onClick={handleRestart}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                  >Start a new enquiry</motion.button>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── FAB ─────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {!open && (
          <motion.button
            key="fab"
            variants={fabVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={() => { setOpen(true); if (messages.length === 0) setMessages([{ from: 'bot', text: QUESTIONS[0].text }]) }}
            style={st.fab}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.91 }}
            aria-label="Open chat"
          >
            💬
            <motion.span
              style={st.badge}
              animate={{ scale: [1, 1.28, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            >1</motion.span>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}

// ── Styles ────────────────────────────────────────────────────────────────────
const st = {
  wrapper: {
    display:         'flex',
    flexDirection:   'column',
    background:      '#111',
    boxShadow:       '0 24px 64px rgba(0,0,0,0.7), 0 2px 8px rgba(219,100,54,0.1)',
    overflow:        'hidden',
    border:          '1px solid rgba(255,255,255,0.06)',
    fontFamily:      "'Inter', system-ui, sans-serif",
    transformOrigin: 'bottom right',
    boxSizing:       'border-box',
  },
  header: {
    background:     'linear-gradient(135deg, #DB6436 0%, #c9522a 100%)',
    padding:        '14px 16px',
    display:        'flex',
    justifyContent: 'space-between',
    alignItems:     'center',
    color:          '#fff',
    flexShrink:     0,
  },
  headerLeft:   { display: 'flex', alignItems: 'center', gap: '11px' },
  avatar: {
    width:          '46px',
    height:         '46px',
    borderRadius:   '50%',
    background:     'rgba(255,255,255,0.2)',
    display:        'flex',
    alignItems:     'center',
    justifyContent: 'center',
    fontWeight:     700,
    fontSize:       '1rem',
    border:         '1.5px solid rgba(255,255,255,0.3)',
    flexShrink:     0,
  },
  headerName:   { fontWeight: 700, fontSize: '0.88rem', letterSpacing: '-0.01em' },
  headerStatus: { display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.68rem', opacity: 0.82, marginTop: '1px' },
  onlineDot: {
    width: '6px', height: '6px', borderRadius: '50%',
    background: '#4ade80', display: 'inline-block',
    boxShadow: '0 0 6px rgba(74,222,128,0.8)',
  },
  closeBtn: {
    background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff',
    cursor: 'pointer', fontSize: '0.85rem', padding: '6px 9px',
    borderRadius: '8px', lineHeight: 1,
  },
  progressTrack: { height: '3px', background: 'rgba(255,255,255,0.06)', flexShrink: 0 },
  progressFill:  { height: '100%', background: 'linear-gradient(90deg, #DB6436, #f0845a)' },
  serviceBtnArea: {
    display:    'flex',
    flexWrap:   'wrap',
    gap:        '8px',
    padding:    '12px 12px 16px',
    borderTop:  '1px solid rgba(255,255,255,0.06)',
    background: '#111',
    flexShrink: 0,
  },
  serviceBtn: {
    background:   'transparent',
    border:       '1px solid rgba(219,100,54,0.45)',
    color:        '#DB6436',
    borderRadius: '20px',
    padding:      '7px 15px',
    fontSize:     '0.8rem',
    cursor:       'pointer',
    fontFamily:   "'Inter', system-ui, sans-serif",
    fontWeight:   500,
  },
  messages: {
    flex:           1,
    overflowY:      'auto',
    padding:        '16px 13px 8px',
    display:        'flex',
    flexDirection:  'column',
    gap:            '10px',
    scrollbarWidth: 'thin',
    scrollbarColor: 'rgba(255,255,255,0.08) transparent',
  },
  botRow:  { display: 'flex', alignItems: 'flex-start', gap: '9px' },
  userRow: { display: 'flex', justifyContent: 'flex-end' },
  botAvatar: {
    width:          '36px',
    height:         '36px',
    borderRadius:   '50%',
    background:     'linear-gradient(135deg, #DB6436, #c9522a)',
    color:          '#fff',
    fontSize:       '0.72rem',
    fontWeight:     700,
    display:        'flex',
    alignItems:     'center',
    justifyContent: 'center',
    flexShrink:     0,
    marginTop:      '2px',
  },
  botBubble: {
    background:   '#1e1e1e',
    color:        '#ede9e5',
    padding:      '10px 13px',
    borderRadius: '4px 14px 14px 14px',
    fontSize:     '0.82rem',
    lineHeight:   1.65,
    maxWidth:     '80%',
    border:       '1px solid rgba(255,255,255,0.05)',
  },
  userBubble: {
    background:   'linear-gradient(135deg, #DB6436, #c9522a)',
    color:        '#fff',
    padding:      '10px 13px',
    borderRadius: '14px 4px 14px 14px',
    fontSize:     '0.82rem',
    lineHeight:   1.65,
    maxWidth:     '80%',
  },
  typingBubble: { display: 'flex', alignItems: 'center', gap: '5px', padding: '12px 16px' },
  typingDot:    { display: 'inline-block', width: '7px', height: '7px', borderRadius: '50%', background: '#DB6436' },
  inputRow: {
    display:    'flex',
    padding:    '10px 12px 14px',
    borderTop:  '1px solid rgba(255,255,255,0.06)',
    gap:        '8px',
    flexShrink: 0,
    background: '#111',
    boxSizing:  'border-box',
    width:      '100%',
  },
  input: {
    flex:         1,
    minWidth:     0,
    background:   '#1e1e1e',
    border:       '1px solid rgba(255,255,255,0.08)',
    borderRadius: '12px',
    padding:      '11px 14px',
    color:        '#fff',
    fontSize:     '0.83rem',
    outline:      'none',
    fontFamily:   'inherit',
    boxSizing:    'border-box',
  },
  sendBtn: {
    background:   'linear-gradient(135deg, #DB6436, #c9522a)',
    border:       'none',
    color:        '#fff',
    borderRadius: '12px',
    padding:      '11px 16px',
    cursor:       'pointer',
    fontWeight:   700,
    fontSize:     '0.9rem',
    flexShrink:   0,
  },
  fab: {
    position:       'fixed',
    bottom:         '24px',
    right:          '24px',
    background:     'linear-gradient(135deg, #DB6436, #c9522a)',
    border:         'none',
    borderRadius:   '50%',
    width:          '56px',
    height:         '56px',
    fontSize:       '1.3rem',
    cursor:         'pointer',
    zIndex:         99998,
    boxShadow:      '0 4px 24px rgba(219,100,54,0.55)',
    display:        'flex',
    alignItems:     'center',
    justifyContent: 'center',
  },
  badge: {
    position:       'absolute',
    top:            '-2px',
    right:          '-2px',
    width:          '18px',
    height:         '18px',
    borderRadius:   '50%',
    background:     '#ef4444',
    color:          '#fff',
    fontSize:       '0.6rem',
    fontWeight:     700,
    display:        'flex',
    alignItems:     'center',
    justifyContent: 'center',
    border:         '2px solid #111',
  },
}
