import { useEffect, useRef } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTheme } from '../ThemeContext'
import koinhomeVideo1 from '../asset/koinhome1.mp4'
import koinhomeImage2 from '../asset/koinhome2.jpg'
import koinhomeVideo3 from '../asset/koinhome3.mp4'
import koinhomeImage4 from '../asset/koinhome4.jpg'
import amataVideo from '../asset/amata4.mp4'
import amataImage1 from '../asset/amata01.jpg'
import amataImage2 from '../asset/amata02.jpg'
import amataImage3 from '../asset/amata03.jpg'
import etaImage1 from '../asset/eta01.jpg'
import etaImage2 from '../asset/eta02.jpg'
import etaImage3 from '../asset/eta03.jpg'
import etaImage4 from '../asset/eta04.jpg'
import netZeroImage1 from '../asset/netzero01.jpg'
import netZeroVideo from '../asset/netzero02.mp4'
import netZeroImage2 from '../asset/netzero03.jpg'
import bolpuImage1 from '../asset/bolpu01.jpg'
import bolpuVideo1 from '../asset/bolpu01.mp4'
import bolpuImage2 from '../asset/bolpu02.jpg'
import bolpuVideo2 from '../asset/bolpu02.mp4'
import kambalVideo1 from '../asset/kambala1.mp4'
import kambalVideo2 from '../asset/kambala2.mp4'
import kambalImage from '../asset/kambala3.jpg'
import restoraImage1 from '../asset/restora01.jpg'
import restoraImage2 from '../asset/restora02.jpg'
import restoraImage3 from '../asset/restora03.jpg'

const CASE_STUDIES = {
  'koin-home': {
    title: 'Koin Home',
    subtitle: 'Authentic Korean hospitality experience in Mangalore with modern comfort and warm design',
    category: 'Brand Strategy',
    year: '2025',
    tag: 'Brand & Promotion',
    image: null,
    overview: 'KOIN HOME, a premium Korean hospitality destination in Mangalore, aimed to strengthen its brand visibility, attract more domestic and international guests, and establish a powerful digital presence. By offering an authentic Korean cultural stay experience combined with modern comfort and personalized hospitality, KOIN HOME sought to position itself as a preferred accommodation choice for travelers, professionals, and long-term guests in Mangalore.',
    challenge: 'Despite delivering a unique Korean hospitality experience and high-quality accommodation, KOIN HOME faced challenges in building online brand awareness and reaching its ideal audience. Limited social media visibility, inconsistent digital marketing efforts, and low engagement across online platforms restricted its ability to attract new guests, increase bookings, and compete effectively within the growing hospitality and tourism market in Mangalore.',
    solution: null,
    results: null,
    process: null,
    solutionPoints: [
      'Developed a strong social media strategy to showcase KOIN HOME\'s unique Korean hospitality experience.',
      'Created high-quality reels, photography, and engaging content highlighting the property, culture, and guest experience.',
      'Improved brand storytelling through consistent visual identity and content planning.',
      'Increased online visibility and audience engagement across social media platforms.',
      'Built trust and awareness through authentic content and targeted digital marketing efforts.',
    ],
  },
  'amata-building-care': {
    title: 'AMATA BUILDING CARE',
    subtitle: 'Building Care Solutions Brand Development',
    category: 'Brand Strategy',
    year: '2024',
    tag: 'Digital Marketing',
    image: null,
    overview: 'AMATA Building Care, a leading provider of building care and maintenance products, partnered with us to strengthen its digital presence, enhance brand visibility, and create a more engaging connection with its target audience. Our collaboration focused on social media marketing, event branding, and creative design support to position AMATA as a trusted name in the building care industry.',
    challenge: 'Despite offering high-quality building care solutions, AMATA Building Care faced challenges in establishing a strong digital presence and consistently communicating its brand value to customers and industry stakeholders. The brand needed a cohesive marketing strategy to increase awareness, showcase its expertise, and create a professional brand experience during key industry events.',
    solution: 'We developed a premium brand identity that emphasized reliability, professionalism, and comprehensive service offerings. Created targeted marketing campaigns and positioned them across luxury property segments.',
    results: null,
    process: null,
    solutionPoints: [
      'Strategic Social Media Management: Managed and optimized AMATA Building Care\'s Instagram presence through consistent content planning, scheduling, and audience engagement strategies.',
      'Creative Content & Graphic Design: Designed high-quality graphics and marketing creatives that effectively showcased AMATA\'s building care products, solutions, and industry expertise.',
      'Enhanced Brand Communication: Developed a cohesive visual identity and content approach to strengthen brand recognition and maintain consistency across digital platforms.',
      'Event Branding & Marketing Support: Provided end-to-end creative support for AMATA\'s Mumbai event, including event branding, promotional creatives, marketing collateral, and display assets.',
      'Consistent Brand Experience Across Touchpoints: Ensured a unified brand presence across social media, event materials, and marketing communications, helping AMATA build credibility, visibility, and stronger industry engagement.',
    ],
  },
  'eta': {
    title: 'ETA Logistics',
    subtitle: 'Social Media Strategy & Brand Building for Supply Chain Solutions',
    category: 'Social Media Marketing',
    year: '2024',
    tag: 'Digital Marketing',
    image: null,
    overview: 'ETA Logistics, a logistics and supply chain solutions company, partnered with us to strengthen its digital presence and maintain a consistent brand image across social media. Our focus was on creating engaging content that showcased the company\'s services, industry expertise, and operational capabilities while building brand awareness online.',
    challenge: 'Despite having a strong presence in the logistics sector, ETA Logistics had limited visibility on social media and lacked a consistent content strategy to effectively communicate its services and industry expertise. The brand needed a professional digital presence to engage potential clients and reinforce its credibility in a competitive market.',
    solution: null,
    results: null,
    process: null,
    solutionPoints: [
      'Strategic Social Media Management: Managed ETA Logistics\' Instagram presence through structured content planning, scheduling, and ongoing account management.',
      'Industry-Focused Content Creation: Created informative and engaging content that highlighted logistics solutions, supply chain expertise, industry updates, and company services.',
      'Consistent Brand Communication: Maintained a cohesive visual identity and messaging strategy to ensure a professional and recognizable brand presence.',
      'Increased Digital Visibility: Implemented content strategies designed to improve reach, engagement, and overall brand awareness among target audiences.',
      'Long-Term Brand Growth Support: Provided continuous social media marketing support for over a year, helping ETA Logistics establish a stronger and more consistent online presence.',
    ],
  },
  'net-zero': {
    title: 'NET ZERO VISION',
    subtitle: 'Sustainable Tomorrow Initiative - Building Climate Action Through Digital Engagement',
    category: 'Sustainability Marketing',
    year: '2024',
    tag: 'Environmental Impact',
    image: null,
    overview: 'NET ZERO Vision is a comprehensive sustainability initiative dedicated to promoting zero-waste practices and climate-positive action. We partnered with them to create a powerful digital campaign that transformed environmental awareness into tangible community engagement, reaching conscious consumers and organizations committed to building a sustainable future.',
    challenge: 'With growing climate concerns, NET ZERO Vision struggled to break through information overload and build meaningful connections with target audiences. Limited budget, lack of influencer partnerships, and insufficient digital infrastructure made it difficult to communicate the urgency of sustainability without seeming preachy or disconnected from real-world impact.',
    solution: null,
    results: null,
    process: null,
    solutionPoints: [
      'Strategic Digital Campaign Development: Crafted multi-channel marketing strategy combining social media, email campaigns, and digital PR to reach environmentally conscious audiences with authentic, actionable sustainability messaging.',
      'Influencer & Community Partnerships: Collaborated with sustainability-focused creators and environmental advocates to amplify NET ZERO\'s message, lending credibility and extending reach to engaged communities already invested in climate action.',
      'Educational Content Creation: Produced compelling storytelling content highlighting zero-waste solutions, industry best practices, and personal impact stories that educated audiences while inspiring behavioral change.',
      'Event Marketing & Activation: Designed and executed comprehensive event marketing strategy including pre-event digital promotion, live social coverage, and post-event engagement campaigns to drive attendance and participation.',
      'Impact Measurement & Community Building: Implemented tracking systems to measure engagement, attendance conversion, and social sentiment, while building a growing community of sustainability advocates and brand ambassadors.',
    ],
  },
  'bolpu': {
    title: 'BOLPU – A Dawn of Opportunities',
    subtitle: 'Startup Incubation & Mentorship Program - Transforming Local Ideas Into Global Enterprises',
    category: 'Startup Growth',
    year: '2024',
    tag: 'Entrepreneurship & Brand Building',
    image: null,
    overview: 'BOLPU is a transformative startup incubation and mentorship program dedicated to helping aspiring entrepreneurs turn innovative business ideas into successful, sustainable companies. By focusing on ventures rooted in local strengths with national and global potential, BOLPU creates a thriving ecosystem where emerging businesses receive strategic guidance, resources, and community support to scale and succeed.',
    challenge: 'Emerging startups and entrepreneurs lacked visibility, structured mentorship, and access to critical resources needed for sustainable growth. The challenge was to build awareness about the program, attract quality entrepreneurs, establish credibility within the startup ecosystem, and create compelling narratives around founder stories and success journeys.',
    solution: null,
    results: null,
    process: null,
    solutionPoints: [
      'Brand Identity & Program Positioning: Developed a compelling brand narrative that positioned BOLPU as the bridge between local entrepreneurial talent and global market opportunities, emphasizing mentorship, support, and success stories.',
      'Multi-Channel Digital Marketing Campaign: Created integrated marketing across social media, email, and digital platforms to reach aspiring entrepreneurs, investors, and stakeholders with targeted messaging about program benefits.',
      'Founder Story & Impact Content: Produced authentic storytelling content highlighting cohort member journeys, pitch sessions, mentorship interactions, and real business outcomes to build trust and inspire participation.',
      'Community Building & Engagement: Developed strategies to foster an active community of entrepreneurs, mentors, and industry partners through events, webinars, and peer-to-peer networking initiatives.',
      'Growth Catalyst Positioning: Positioned BOLPU as a catalyst for transforming local talent into global enterprises, showcasing how the program bridges the gap between ideation and market success.',
    ],
  },
  'mangalore-kambala': {
    title: 'Mangalore Kambala',
    subtitle: 'Preserving Tradition While Embracing Digital - Revitalizing a Centuries-Old Cultural Icon',
    category: 'Cultural Events & Heritage Marketing',
    year: '2024',
    tag: 'Digital Event Promotion',
    image: null,
    overview: 'Mangalore Kambala, a historic buffalo racing tradition steeped in cultural heritage, required a transformative digital marketing strategy to bridge the gap between its traditional audience and modern, younger demographics. We partnered to elevate this centuries-old event, creating compelling digital narratives that honored its cultural significance while expanding its reach through contemporary platforms and storytelling.',
    challenge: 'Despite its deep cultural roots, Mangalore Kambala faced challenges in maintaining relevance with younger audiences and expanding beyond regional boundaries. The event struggled with limited digital presence, outdated marketing approaches, and difficulty in communicating its cultural importance to diverse demographics who had little awareness of this iconic tradition.',
    solution: null,
    results: null,
    process: null,
    solutionPoints: [
      'Heritage-Focused Digital Storytelling: Created compelling content that celebrated the cultural significance, history, and tradition of Mangalore Kambala while framing it as a modern cultural experience worth experiencing and sharing.',
      'Multi-Platform Campaign Strategy: Developed integrated digital campaigns across social media, video platforms, and digital advertising to reach both traditional audiences and younger demographics with targeted, culturally relevant messaging.',
      'Influencer & Creator Partnerships: Collaborated with regional influencers, content creators, and cultural ambassadors to authentically promote the event and reach new audiences through trusted voices and engaging content formats.',
      'Live Streaming & Real-Time Engagement: Implemented comprehensive live streaming strategy with behind-the-scenes content, interactive elements, and real-time engagement to bring the event experience to audiences unable to attend physically.',
      'Community Building & Cultural Advocacy: Fostered a digital community of cultural enthusiasts, tradition advocates, and event participants, positioning Mangalore Kambala as an essential cultural experience for preserving and celebrating regional heritage.',
    ],
  },
  'restora': {
    title: 'RESTORA',
    subtitle: 'Premium Beauty Studio - Nail Art, Microblading & Lash Services Social Media Excellence',
    category: 'Beauty & Wellness Marketing',
    year: '2024',
    tag: 'Social Media & Brand Growth',
    image: null,
    overview: 'RESTORA is a premium beauty studio in Mangalore specializing in professional nail art, microblading, and eyelash services. We partnered to transform their digital presence through strategic social media marketing, creating a visually stunning brand that showcases artistry, expertise, and the transformative beauty of their services.',
    challenge: 'As a beauty studio in a competitive market, RESTORA struggled with limited social media visibility and low online engagement despite offering premium beauty services. The challenge was building brand awareness among beauty-conscious consumers in Mangalore while competing with established beauty brands and differentiating through authentic, high-quality visual content.',
    solution: null,
    results: null,
    process: null,
    solutionPoints: [
      'Premium Visual Content Strategy: Created stunning, high-quality photography and videography showcasing nail art designs, microblading transformations, and lash services, positioning RESTORA as a premium beauty destination.',
      'Instagram-First Approach: Developed a comprehensive Instagram strategy with daily posts, reels, stories, and interactive content designed specifically for beauty enthusiasts and potential clients seeking nail art and beauty services.',
      'Before & After Transformation Stories: Produced compelling before-and-after content and transformation reels highlighting the artistry and impact of RESTORA\'s services, driving engagement and building trust with prospects.',
      'User-Generated Content & Community Engagement: Implemented UGC campaigns encouraging clients to share their RESTORA experiences, building an authentic community of beauty advocates and brand ambassadors.',
      'Influencer & Beauty Creator Partnerships: Collaborated with beauty influencers, makeup artists, and lifestyle creators in Mangalore to amplify RESTORA\'s reach and credibility within the beauty community.',
    ],
  },
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
})

export default function CaseStudyPage() {
  const { caseStudyId } = useParams()
  const navigate = useNavigate()
  const { dark } = useTheme()

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [caseStudyId])

  const study = CASE_STUDIES[caseStudyId]

  if (!study) {
    return (
      <div style={{
          minHeight: '100vh',
          background: 'var(--bg-primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 20px',
        }}>
          <div style={{ textAlign: 'center' }}>
            <h1 style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: '2.5rem',
              color: 'var(--text-primary)',
              marginBottom: '20px',
            }}>Case Study Not Found</h1>
            <button
              onClick={() => navigate('/')}
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                padding: '12px 32px',
                fontSize: '1rem',
                background: '#DB6436',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
              }}
            >
              Back to Home
            </button>
          </div>
        </div>
    )
  }

  const accentColor = dark ? '#DB6436' : '#0A5675'

  return (
    <main style={{ background: 'var(--bg-primary)' }}>
        {/* Hero Section */}
        <section style={{
          padding: 'clamp(80px, 12vh, 140px) clamp(24px, 8vw, 120px) clamp(40px, 6vh, 60px)',
          background: 'var(--bg-primary)',
          position: 'relative',
        }}>
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            onClick={() => {
              navigate(-1)
              sessionStorage.setItem('scrollToOurWork', 'true')
            }}
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'none',
              border: 'none',
              color: accentColor,
              fontSize: '0.95rem',
              cursor: 'pointer',
              marginBottom: '40px',
              padding: '0',
              transition: 'opacity 0.3s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.7')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            ← Back to Projects
          </motion.button>

          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: 'clamp(2.5rem, 8vw, 5rem)',
                fontWeight: 300,
                color: 'var(--text-primary)',
                letterSpacing: '-0.04em',
                lineHeight: 1.1,
                margin: '0 0 16px 0',
              }}
            >
              {study.title}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: 'clamp(1rem, 2vw, 1.3rem)',
                color: 'var(--text-42)',
                lineHeight: 1.6,
                margin: 0,
                maxWidth: '800px',
              }}
            >
              {study.subtitle}
            </motion.p>
          </div>
        </section>

        {/* Content Section */}
        <section style={{
          padding: 'clamp(20px, 3vh, 40px) clamp(24px, 8vw, 120px) clamp(60px, 10vh, 120px)',
          background: 'var(--bg-primary)',
        }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            {/* Divider */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0 }}
              style={{
                width: '60px',
                height: '2px',
                background: accentColor,
                marginBottom: '24px',
                transformOrigin: 'left',
              }}
            />

            {/* Overview */}
            {study.overview && (
              <motion.div
                {...fadeUp(0.1)}
                style={{ marginBottom: '40px' }}
              >
                <h2 style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: '1.15rem',
                  fontWeight: 600,
                  color: accentColor,
                  margin: '0 0 20px 0',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                }}>Overview</h2>
                <p style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: 'clamp(0.95rem, 1.4vw, 1.1rem)',
                  lineHeight: 1.85,
                  color: 'var(--text-55)',
                  margin: 0,
                }}>{study.overview}</p>
              </motion.div>
            )}

            {/* Challenge */}
            {study.challenge && (
              <motion.div
                {...fadeUp(0.2)}
                style={{ marginBottom: '40px' }}
              >
                <h2 style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: '1.15rem',
                  fontWeight: 600,
                  color: accentColor,
                  margin: '0 0 20px 0',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                }}>Challenge</h2>
                <p style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: 'clamp(0.95rem, 1.4vw, 1.1rem)',
                  lineHeight: 1.85,
                  color: 'var(--text-55)',
                  margin: 0,
                }}>{study.challenge}</p>
              </motion.div>
            )}

            {/* Solution */}
            {study.solution && (
              <motion.div
                {...fadeUp(0.3)}
                style={{ marginBottom: '40px' }}
              >
                <h2 style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: '1.15rem',
                  fontWeight: 600,
                  color: accentColor,
                  margin: '0 0 20px 0',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                }}>Solution</h2>
                <p style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: 'clamp(0.95rem, 1.4vw, 1.1rem)',
                  lineHeight: 1.85,
                  color: 'var(--text-55)',
                  margin: 0,
                }}>{study.solution}</p>
              </motion.div>
            )}

            {/* Results */}
            {study.results && (
              <motion.div
                {...fadeUp(0.4)}
                style={{ marginBottom: '60px' }}
              >
                <h2 style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: '1.15rem',
                  fontWeight: 600,
                  color: accentColor,
                  margin: '0 0 20px 0',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                }}>Results</h2>
                <p style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: 'clamp(0.95rem, 1.4vw, 1.1rem)',
                  lineHeight: 1.85,
                  color: 'var(--text-55)',
                  margin: 0,
                }}>{study.results}</p>
              </motion.div>
            )}

            {/* Process */}
            {study.process && (
              <motion.div
                {...fadeUp(0.5)}
              >
                <h2 style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: '1.15rem',
                  fontWeight: 600,
                  color: accentColor,
                  margin: '0 0 32px 0',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                }}>Our Process</h2>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                  gap: '32px',
                }}>
                  {study.process.map((step, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: idx * 0.1 }}
                    >
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        marginBottom: '12px',
                      }}>
                        <div style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          background: accentColor,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontFamily: "'Inter', system-ui, sans-serif",
                          fontWeight: 600,
                          fontSize: '0.9rem',
                        }}>{idx + 1}</div>
                        <h3 style={{
                          fontFamily: "'Inter', system-ui, sans-serif",
                          fontSize: '1rem',
                          fontWeight: 600,
                          color: 'var(--text-primary)',
                          margin: 0,
                        }}>{step.title}</h3>
                      </div>
                      <p style={{
                        fontFamily: "'Inter', system-ui, sans-serif",
                        fontSize: '0.9rem',
                        color: 'var(--text-55)',
                        lineHeight: 1.6,
                        margin: 0,
                      }}>{step.description}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </section>

        {/* Solutions Section - Properly Aligned with Content Grid */}
        {study.solutionPoints && (
          <section style={{
            padding: 'clamp(40px, 6vh, 80px) clamp(24px, 8vw, 120px) clamp(60px, 10vh, 120px)',
            background: 'var(--bg-primary)',
          }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
              <style>{`
                .solutions-wrapper {
                  display: grid;
                  grid-template-columns: 1fr;
                  gap: 60px;
                }

                @media (min-width: 1024px) {
                  .solutions-wrapper {
                    grid-template-columns: 40fr 60fr;
                    gap: 80px;
                    align-items: start;
                  }
                  .solutions-left-content {
                    position: sticky;
                    top: 140px;
                    height: fit-content;
                  }
                  .solutions-right-content {
                    display: flex;
                    flex-direction: column;
                    gap: 40px;
                  }
                }

                @media (max-width: 1023px) {
                  .solutions-left-content {
                    margin-bottom: 20px;
                  }
                  .solutions-right-content {
                    display: flex;
                    flex-direction: column;
                    gap: 32px;
                  }
                }
              `}</style>

              <div className="solutions-wrapper">
                {/* Left Column: Solution Points */}
                <motion.div
                  className="solutions-left-content"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.7 }}
                >
                  <h2 style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: '1.15rem',
                    fontWeight: 600,
                    color: accentColor,
                    margin: '0 0 32px 0',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                  }}>Solutions</h2>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                    {study.solutionPoints.map((point, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.6, delay: idx * 0.08 }}
                        style={{
                          display: 'flex',
                          gap: '16px',
                          alignItems: 'flex-start',
                        }}
                      >
                        <div style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '50%',
                          background: accentColor,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontFamily: "'Inter', system-ui, sans-serif",
                          fontWeight: 600,
                          fontSize: '0.85rem',
                          flexShrink: 0,
                          minWidth: '28px',
                        }}>{idx + 1}</div>
                        <p style={{
                          fontFamily: "'Inter', system-ui, sans-serif",
                          fontSize: 'clamp(0.95rem, 1.4vw, 1.1rem)',
                          lineHeight: 1.8,
                          color: 'var(--text-55)',
                          margin: 0,
                          paddingTop: '3px',
                        }}>{point}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Right Column: Media Portfolio */}
                <div className="solutions-right-content">
                  {(() => {
                    const mediaByCase = {
                      'koin-home': [
                        { type: 'video', src: koinhomeVideo1, title: 'Hospitality Reel' },
                        { type: 'image', src: koinhomeImage2, title: 'Property Showcase' },
                        { type: 'video', src: koinhomeVideo3, title: 'Guest Experience' },
                        { type: 'image', src: koinhomeImage4, title: 'Campaign Creative' },
                      ],
                      'amata-building-care': [
                        { type: 'video', src: amataVideo, title: 'Brand Showcase' },
                        { type: 'image', src: amataImage1, title: 'Social Media Creative' },
                        { type: 'image', src: amataImage2, title: 'Marketing Collateral' },
                        { type: 'image', src: amataImage3, title: 'Event Branding' },
                      ],
                      'eta': [
                        { type: 'image', src: etaImage1, title: 'Industry Expertise' },
                        { type: 'image', src: etaImage2, title: 'Heritage & Experience' },
                        { type: 'image', src: etaImage3, title: 'Global Trade Solutions' },
                        { type: 'image', src: etaImage4, title: 'Ocean & Sustainability' },
                      ],
                      'net-zero': [
                        { type: 'image', src: netZeroImage1, title: 'Global Sustainability Vision' },
                        { type: 'video', src: netZeroVideo, title: 'Event Conference Highlights' },
                        { type: 'image', src: netZeroImage2, title: 'Future of Sustainable Design' },
                      ],
                      'bolpu': [
                        { type: 'image', src: bolpuImage1, title: 'Cohort Innovation Showcase' },
                        { type: 'video', src: bolpuVideo1, title: 'Leadership & Vision Launch' },
                        { type: 'image', src: bolpuImage2, title: 'Founder Community Building' },
                        { type: 'video', src: bolpuVideo2, title: 'Startup Mentorship Sessions' },
                      ],
                      'mangalore-kambala': [
                        { type: 'video', src: kambalVideo1, title: 'The Spirit of Tradition' },
                        { type: 'image', src: kambalImage, title: 'Cultural Heritage Showcase' },
                        { type: 'video', src: kambalVideo2, title: 'Event Highlights & Action' },
                      ],
                      'restora': [
                        { type: 'image', src: restoraImage1, title: 'Beauty Studio Artistry' },
                        { type: 'image', src: restoraImage2, title: 'Transformation Journey' },
                        { type: 'image', src: restoraImage3, title: 'Premium Beauty Services' },
                      ],
                    }
                    return (mediaByCase[caseStudyId] || mediaByCase['koin-home']).map((media, item) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-80px' }}
                      transition={{ duration: 0.7, delay: item * 0.05 }}
                      style={{
                        borderRadius: '12px',
                        overflow: 'hidden',
                        boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
                        aspectRatio: caseStudyId === 'net-zero' ? '3 / 4' : (['amata-building-care', 'eta', 'bolpu', 'restora'].includes(caseStudyId) ? '4 / 5' : caseStudyId === 'mangalore-kambala' ? '9 / 16' : '9 / 16'),
                        background: 'var(--bg-section)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        transition: 'box-shadow 0.3s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = '0 16px 48px rgba(0, 0, 0, 0.2)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.15)'
                      }}
                    >
                      {media.type === 'video' ? (
                        <video
                          src={media.src}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            display: 'block',
                          }}
                          controls
                          controlsList="nodownload"
                          poster={media.src}
                        />
                      ) : (
                        <img
                          src={media.src}
                          alt={media.title}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            display: 'block',
                          }}
                          loading="lazy"
                        />
                      )}
                    </motion.div>
                    ))
                  })()}
                </div>
              </div>
            </div>
          </section>
        )}

      </main>
  )
}
