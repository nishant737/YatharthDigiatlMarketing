import ReactGA from 'react-ga4'

export function initGA() {
  ReactGA.initialize(import.meta.env.VITE_GA_ID)
}

export function trackPageView() {
  ReactGA.send({ hitType: 'pageview', page: window.location.pathname })
}
