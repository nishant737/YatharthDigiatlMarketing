import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Injects a static SEO block into the built index.html at build time.
// This runs during the Vite build itself — no Puppeteer or jsdom needed.
// The hidden div is visually invisible (CSS clip) but fully readable by crawlers.
function seoInjectPlugin() {
  return {
    name: 'seo-inject',
    transformIndexHtml(html) {
      const seoBlock = `
  <!-- Static SEO block injected at build time — invisible to users -->
  <div style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0;" aria-hidden="true">
    <h1>Yatharth — Brand Strategy &amp; Digital Marketing Agency India</h1>
    <p>Yatharth is a digital marketing and brand strategy agency founded by Eshwar Shetty, helping businesses across India build a powerful digital presence. We specialise in brand strategy, SEO, content creation, creative direction, and social media management.</p>
    <h2>Our Services</h2>
    <h3>Brand Strategy</h3>
    <p>We define how you are seen. From positioning and identity to the story your brand tells the world — we craft the strategic foundation that makes everything else work.</p>
    <h3>Digital Marketing</h3>
    <p>We make sure you are found. Through SEO, paid campaigns, analytics, and smart targeting — we put your brand exactly where your audience is looking.</p>
    <h3>Content &amp; Storytelling</h3>
    <p>We give your brand a voice. Compelling copy, scroll-stopping visuals, and narratives that resonate — we create content that moves people to action.</p>
    <h3>Creative Direction</h3>
    <p>We shape how it feels. From visual systems to campaign art direction — we ensure every touchpoint carries a cohesive, unforgettable creative vision.</p>
    <h3>Social Presence</h3>
    <p>We build how you show up daily. Strategy-led social content, community engagement, and platform growth — we turn followers into loyal fans.</p>
  </div>`
      return html.replace('<div id="root"></div>', `<div id="root"></div>${seoBlock}`)
    },
  }
}

export default defineConfig({
  plugins: [
    react(),
    seoInjectPlugin(),
  ],
  server: {
    host: true,
  },
})
