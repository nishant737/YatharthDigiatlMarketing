import { useState } from 'react'
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

        {/* Normal scroll sections */}
        <div style={{
          position: 'relative',
          zIndex: 5,
          background: '#0a0806',
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
    </>
  )
}
