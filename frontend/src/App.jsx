import { useState } from 'react'
import { ThemeProvider } from './ThemeContext'
import CustomCursor from './components/CustomCursor'
import LoadingScreen from './components/LoadingScreen'
import Navbar from './components/Navbar'

import HeroSection from './components/HeroSection'
import StorySection from './components/StorySection'
import CraftSection from './components/CraftSection'
import ClientSection from './components/ClientSection'
import OurWorkSection from './components/OurWorkSection'
import TestimonialsSection from './components/TestimonialsSection'
import FounderNote from './components/FounderNote'
import FAQSection from './components/FAQSection'
import JournalSection from './components/JournalSection'
import ClosingSection from './components/ClosingSection'
import ContactSection from './components/ContactSection'
import ChatBot from './components/ChatBot'
import MusicPlayer from './components/MusicPlayer'
import ReelWidget from './components/ReelWidget'

export default function App() {
  const [loaded, setLoaded] = useState(false)

  return (
    <ThemeProvider>
      <CustomCursor />
      <LoadingScreen onComplete={() => setLoaded(true)} />

      {/* Lock scroll while loading */}
      <style>{`body { overflow: ${loaded ? 'auto' : 'hidden'}; }`}</style>

      {loaded && <Navbar />}
      <main style={{ background: 'var(--bg-primary)' }}>
        <HeroSection />

        {/* Normal scroll sections */}
        <div style={{
          position: 'relative',
          zIndex: 5,
          background: 'var(--bg-section)',
        }}>
          <StorySection />

          <CraftSection />

          <OurWorkSection />

          <ClientSection />

          <TestimonialsSection />
          <FounderNote />
         
          <JournalSection />
           <FAQSection />
          <ClosingSection />
          <ContactSection />
        </div>
      </main>
      <MusicPlayer loaded={loaded} />
      <ChatBot loaded={loaded} />
      <ReelWidget loaded={loaded} />
    </ThemeProvider>
  )
}
