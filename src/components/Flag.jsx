// Simple national flags drawn as SVG (no emoji, no external images). Shapes follow
// each flag's basic design; detailed emblems (e.g. Malta's George Cross) are simplified.
const FLAGS = {
  fr: <><rect width="1" height="2" fill="#0055A4" /><rect x="1" width="1" height="2" fill="#fff" /><rect x="2" width="1" height="2" fill="#EF4135" /></>,
  it: <><rect width="1" height="2" fill="#009246" /><rect x="1" width="1" height="2" fill="#fff" /><rect x="2" width="1" height="2" fill="#CE2B37" /></>,
  de: <><rect width="3" height="0.667" fill="#000" /><rect y="0.667" width="3" height="0.667" fill="#DD0000" /><rect y="1.333" width="3" height="0.667" fill="#FFCE00" /></>,
  nl: <><rect width="3" height="0.667" fill="#AE1C28" /><rect y="0.667" width="3" height="0.667" fill="#fff" /><rect y="1.333" width="3" height="0.667" fill="#21468B" /></>,
  pl: <><rect width="3" height="1" fill="#fff" /><rect y="1" width="3" height="1" fill="#DC143C" /></>,
  es: <><rect width="3" height="0.5" fill="#AA151B" /><rect y="0.5" width="3" height="1" fill="#F1BF00" /><rect y="1.5" width="3" height="0.5" fill="#AA151B" /></>,
  mt: <><rect width="1.5" height="2" fill="#fff" /><rect x="1.5" width="1.5" height="2" fill="#CF142B" /><path d="M0.27 0.36h0.14v-0.14h0.12v0.14h0.14v0.12h-0.14v0.14h-0.12v-0.14h-0.14z" fill="#A7A7A7" /></>,
  fi: <><rect width="3" height="2" fill="#fff" /><rect x="0.83" width="0.5" height="2" fill="#002F6C" /><rect y="0.75" width="3" height="0.5" fill="#002F6C" /></>,
  ch: <><rect width="3" height="2" fill="#DA291C" /><rect x="1.3" y="0.45" width="0.4" height="1.1" fill="#fff" /><rect x="0.95" y="0.8" width="1.1" height="0.4" fill="#fff" /></>,
  gr: <>
    {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => <rect key={i} y={i * (2 / 9)} width="3" height={2 / 9} fill={i % 2 ? '#fff' : '#0D5EAF'} />)}
    <rect width={(2 / 9) * 5} height={(2 / 9) * 5} fill="#0D5EAF" />
    <rect x={(2 / 9) * 2} width={2 / 9} height={(2 / 9) * 5} fill="#fff" />
    <rect y={(2 / 9) * 2} width={(2 / 9) * 5} height={2 / 9} fill="#fff" />
  </>,
}

export default function Flag({ code, label, size = 20 }) {
  const shape = FLAGS[code]
  if (!shape) return null
  return (
    <svg className="flag" viewBox="0 0 3 2" width={size * 1.5} height={size} role="img" aria-label={label ? `Flag of ${label}` : undefined} aria-hidden={label ? undefined : true}>
      {shape}
    </svg>
  )
}
