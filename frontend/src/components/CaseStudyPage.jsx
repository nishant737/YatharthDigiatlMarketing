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
import radianceVideo1 from '../asset/radiance01.mp4'
import radianceVideo2 from '../asset/radiance02.mp4'
import restoraImage1 from '../asset/restora01.jpg'
import restoraImage2 from '../asset/restora02.jpg'
import restoraImage3 from '../asset/restora03.jpg'
import heroVideo from '../asset/herovideo.mp4'
import heroSectionVideo from '../asset/heroSectionVideo.mp4'
import { CASE_STUDIES } from '../data/caseStudies'
import villageBoxLid from '../asset/village-box-lid.webp'
import villageBoxBack from '../asset/village-box-back.webp'
import villageBucketLid from '../asset/village-bucket-lid.webp'
import villageBucketWrap from '../asset/village-bucket-wrap.webp'
import villageBucketLabel from '../asset/village-bucket-label.webp'
import { caseStudySeo, HOME_SEO } from '../data/site'
import { useSeo } from '../hooks/useSeo'


const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
})

// Case studies that have no photos/videos yet: the media column is hidden
const NO_MEDIA = []

export default function CaseStudyPage() {
  const { caseStudyId } = useParams()
  const navigate = useNavigate()
  const { dark } = useTheme()

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [caseStudyId])

  const study = CASE_STUDIES[caseStudyId]
  useSeo(study ? caseStudySeo(caseStudyId, study) : HOME_SEO)

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
                .solutions-wrapper.no-media {
                  grid-template-columns: 1fr !important;
                  max-width: 900px;
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

                  .solutions-wrapper.olive-layout {
                    grid-template-columns: 1fr 1fr;
                    gap: 60px;
                  }

                  .solutions-wrapper.olive-layout .solutions-left-content {
                    position: relative;
                    top: auto;
                    z-index: 1;
                  }

                  .solutions-wrapper.olive-layout .solutions-right-content {
                    position: sticky;
                    top: 120px;
                    height: fit-content;
                    z-index: 2;
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

              <div className={`solutions-wrapper ${caseStudyId === 'olive' ? 'olive-layout' : ''} ${NO_MEDIA.includes(caseStudyId) ? 'no-media' : ''}`}>
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
                {!NO_MEDIA.includes(caseStudyId) && (
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
                      'radiance': [
                        { type: 'video', src: radianceVideo1, title: 'Radiance by Hotel Roopa' },
                        { type: 'video', src: radianceVideo2, title: 'The Radiance Experience' },
                      ],
                      // aspect: keep each artwork's own shape. bare: transparent cut-out, shown without a card
                      'village': [
                        { type: 'image', src: villageBoxLid, title: 'Village Biryani box: lid artwork', aspect: '1600 / 1292' },
                        { type: 'image', src: villageBucketLid, title: 'Bucket Biryani lid', aspect: '1 / 1', bare: true },
                        { type: 'image', src: villageBucketWrap, title: 'Bucket Biryani wrap-around label', aspect: '1982 / 705', bare: true },
                        { type: 'image', src: villageBucketLabel, title: 'Bucket Biryani label panels', aspect: '2000 / 678' },
                        { type: 'image', src: villageBoxBack, title: 'Village Biryani box: back panel', aspect: '1600 / 1285' },
                      ],
                      'olive': [
                        { type: 'video', src: heroSectionVideo, title: 'Hero Video Showcase' },
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
                        borderRadius: media.bare ? 0 : '12px',
                        overflow: 'hidden',
                        boxShadow: media.bare ? 'none' : '0 12px 40px rgba(0, 0, 0, 0.15)',
                        aspectRatio: media.aspect || (caseStudyId === 'net-zero' ? '3 / 4' : (['amata-building-care', 'eta', 'bolpu', 'olive'].includes(caseStudyId) ? '4 / 5' : '9 / 16')),
                        background: media.bare ? 'transparent' : 'var(--bg-section)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        transition: 'box-shadow 0.3s ease',
                      }}
                      onMouseEnter={(e) => {
                        if (!media.bare) e.currentTarget.style.boxShadow = '0 16px 48px rgba(0, 0, 0, 0.2)'
                      }}
                      onMouseLeave={(e) => {
                        if (!media.bare) e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.15)'
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
                            objectFit: media.bare ? 'contain' : 'cover',
                            display: 'block',
                          }}
                          loading="lazy"
                        />
                      )}
                    </motion.div>
                    ))
                  })()}
                </div>
                )}
              </div>
            </div>
          </section>
        )}

      </main>
  )
}
