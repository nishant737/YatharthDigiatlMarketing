import { useState } from 'react'
import CustomCursor from './components/CustomCursor'
import LoadingScreen from './components/LoadingScreen'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import StorySection from './components/StorySection'
import CraftSection from './components/CraftSection'
import ClientSection from './components/ClientSection'
import TestimonialsSection from './components/TestimonialsSection'
import FounderNote from './components/FounderNote'
import JournalSection from './components/JournalSection'
import ContactSection from './components/ContactSection'
import ChatBot from './components/ChatBot'

export default function App() {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      <CustomCursor />
      <LoadingScreen onComplete={() => setLoaded(true)} />

      {/* Lock scroll while loading */}
      <style>{`body { overflow: ${loaded ? 'auto' : 'hidden'}; }`}</style>

      <Navbar />
      <main style={{ background: '#060503' }}>
        <HeroSection />

        {/* Story slides up over the sticky hero during its last scroll frames */}
        <div style={{
          position: 'relative',
          zIndex: 5,
          background: '#0a0806',
          marginTop: '-100vh',
          boxShadow: '0 -8px 40px rgba(0,0,0,0.9)',
        }}>
          <StorySection />

          {/* Craft stays pinned while Client scrolls up over it */}
          <div style={{ position: 'sticky', top: 0, zIndex: 10, height: '100vh' }}>
            <CraftSection />
          </div>

          <ClientSection />
          <TestimonialsSection />
          <FounderNote />
          <JournalSection />
          <ContactSection />
        </div>
      </main>
      <ChatBot loaded={loaded} />
    </>
  )
}
