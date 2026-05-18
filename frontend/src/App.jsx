import { useState, useEffect, lazy, Suspense } from 'react'
import Clarity from '@microsoft/clarity'
import { ThemeProvider } from './ThemeContext'
import CustomCursor from './components/CustomCursor'
import LoadingScreen from './components/LoadingScreen'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'

// Lazy-load all below-the-fold sections to reduce initial bundle parse time
const StorySection       = lazy(() => import('./components/StorySection'))
const CraftSection       = lazy(() => import('./components/CraftSection'))
const ClientSection      = lazy(() => import('./components/ClientSection'))
const OurWorkSection     = lazy(() => import('./components/OurWorkSection'))
const TestimonialsSection= lazy(() => import('./components/TestimonialsSection'))
const FounderNote        = lazy(() => import('./components/FounderNote'))
const FAQSection         = lazy(() => import('./components/FAQSection'))
const JournalSection     = lazy(() => import('./components/JournalSection'))
const ClosingSection     = lazy(() => import('./components/ClosingSection'))
const ContactSection     = lazy(() => import('./components/ContactSection'))
const ChatBot            = lazy(() => import('./components/ChatBot'))
const MusicPlayer        = lazy(() => import('./components/MusicPlayer'))
const ReelWidget         = lazy(() => import('./components/ReelWidget'))

export default function App() {
  const [loaded, setLoaded] = useState(false)

  // Init Clarity once after mount — not during render
  useEffect(() => {
    const id = import.meta.env.VITE_APP_CLARITY_ID
    if (id) Clarity.init(id)
  }, [])

  return (
    <ThemeProvider>
      <CustomCursor />
      <LoadingScreen onComplete={() => setLoaded(true)} />

      {/* Lock scroll while loading */}
      <style>{`body { overflow: ${loaded ? 'auto' : 'hidden'}; }`}</style>

      {loaded && <Navbar />}
      <main style={{ background: 'var(--bg-primary)' }}>
        <HeroSection />

        {/* Below-fold sections — lazy loaded, no visible fallback needed (they're off-screen) */}
        <Suspense fallback={null}>
          <div style={{ position: 'relative', zIndex: 5, background: 'var(--bg-section)' }}>
            <StorySection />
            <CraftSection />
            <ClientSection />
            <OurWorkSection />
            <TestimonialsSection />
            <FounderNote />
            <JournalSection />
            <FAQSection />
            <ClosingSection />
            <ContactSection />
          </div>
        </Suspense>
      </main>

      <Suspense fallback={null}>
        <MusicPlayer loaded={loaded} />
        <ChatBot loaded={loaded} />
        <ReelWidget loaded={loaded} />
      </Suspense>
    </ThemeProvider>
  )
}
