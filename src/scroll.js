// Shared access to the Lenis smooth-scroll instance (null when reduced motion is on).
let lenis = null
export const setLenis = (instance) => { lenis = instance }

const NAV_OFFSET = -100

export function scrollToId(id, { immediate = false } = {}) {
  const el = document.getElementById(id)
  if (!el) return
  if (lenis) lenis.scrollTo(el, { offset: NAV_OFFSET, immediate })
  else window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + NAV_OFFSET, behavior: immediate ? 'auto' : 'smooth' })
}
