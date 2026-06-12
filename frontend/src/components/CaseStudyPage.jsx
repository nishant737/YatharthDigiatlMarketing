import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
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
    title: 'NET ZERO',
    subtitle: 'Sustainability Initiative Event Marketing',
    category: 'Event Marketing',
    year: '2023',
    tag: 'Brand & Promotion',
    image: null,
    overview: 'NET ZERO is a sustainability-focused initiative promoting zero-waste practices. We handled complete event marketing and brand awareness campaign.',
    challenge: 'Educating the audience about sustainability while driving event attendance and engagement with limited budget.',
    solution: 'Created integrated marketing campaign combining digital advertising, influencer partnerships, content marketing, and PR outreach. Developed event activation strategies and post-event engagement plans.',
    results: 'Attracted 1,200+ attendees with 65% engagement rate. 40+ media mentions and significant social media reach expansion.',
    process: [
      { title: 'Strategy', description: 'Campaign planning and target audience definition' },
      { title: 'Content', description: 'Content creation and influencer partnerships' },
      { title: 'Promotion', description: 'Multi-channel digital advertising' },
      { title: 'Activation', description: 'Event execution and engagement' },
    ],
  },
  'bolpu': {
    title: 'BOLPU',
    subtitle: 'Agricultural Product Brand Positioning',
    category: 'Brand Strategy',
    year: '2024',
    tag: 'Digital Marketing',
    image: null,
    overview: 'BOLPU is an agricultural product company needing modern brand repositioning to reach younger consumers and e-commerce channels.',
    challenge: 'Traditional brand perception limiting market reach. Need to modernize brand while maintaining core values and customer trust.',
    solution: 'Conducted brand audit and consumer research. Developed modern visual identity and brand messaging. Created digital marketing strategy targeting e-commerce and D2C channels.',
    results: 'Successfully launched modernized brand identity. Increased online sales by 120%. Expanded distribution to 8 new e-commerce platforms.',
    process: [
      { title: 'Audit', description: 'Brand health assessment' },
      { title: 'Modernization', description: 'Visual identity refresh' },
      { title: 'Digital', description: 'E-commerce and D2C strategy' },
      { title: 'Growth', description: 'Distribution expansion' },
    ],
  },
  'mangalore-kambala': {
    title: 'Mangalore Kambala',
    subtitle: 'Traditional Sport Event Digital Promotion',
    category: 'Event Management',
    year: '2024',
    tag: 'Digital Marketing',
    image: null,
    overview: 'Mangalore Kambala is a traditional buffalo race event requiring modern digital marketing to increase viewership and participation.',
    challenge: 'Traditional event with aging audience base. Needed to attract younger demographics and expand regional awareness.',
    solution: 'Created digital campaign including social media content series, influencer partnerships, live streaming strategy, and community engagement initiatives.',
    results: 'Increased event viewership by 200%. Generated 50,000+ social media impressions. Attracted 35% more participants from new demographics.',
    process: [
      { title: 'Digital Strategy', description: 'Social media and content planning' },
      { title: 'Influencers', description: 'Creator partnerships and outreach' },
      { title: 'Live Coverage', description: 'Event streaming and real-time engagement' },
      { title: 'Community', description: 'Audience building and retention' },
    ],
  },
  'restora': {
    title: 'Restora',
    subtitle: 'Restaurant Brand Social Media Growth',
    category: 'Social Media Presence',
    year: '2024',
    tag: 'Digital Marketing',
    image: null,
    overview: 'Restora restaurant required comprehensive social media strategy to build brand presence and drive foot traffic.',
    challenge: 'Limited social media presence with low engagement. Competing with established restaurant brands in the area.',
    solution: 'Developed content calendar and visual identity for Instagram and Facebook. Created user-generated content campaigns, influencer partnerships, and targeted paid advertising.',
    results: 'Grew Instagram following from 500 to 12,000 followers. Increased restaurant reservations by 60%. Monthly engagement rate of 8.5%.',
    process: [
      { title: 'Content Strategy', description: 'Visual identity and content calendar' },
      { title: 'Community', description: 'Engagement and UGC campaigns' },
      { title: 'Influencers', description: 'Partnerships and collaborations' },
      { title: 'Paid Media', description: 'Targeted advertising campaigns' },
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
            onClick={() => navigate('/')}
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
                        aspectRatio: caseStudyId === 'amata-building-care' ? '4 / 5' : '9 / 16',
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
