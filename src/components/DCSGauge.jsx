import { useEffect, useState } from 'react'

export default function DCSGauge({ score, label, isReplay }) {
  const [displayed, setDisplayed] = useState(0)

  useEffect(() => {
    const start = displayed
    const end = score
    const duration = 2000
    const startTime = performance.now()

    const animate = (now) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const val = start + (end - start) * eased
      setDisplayed(Math.round(val * 100) / 100)
      if (progress < 1) requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)
  }, [score])

  const size = 240
  const cx = 120
  const cy = 130
  const r = 90

  const toRad = (d) => (d * Math.PI) / 180

  const pt = (deg) => ({
    x: cx + r * Math.cos(toRad(deg)),
    y: cy - r * Math.sin(toRad(deg)),
  })

  const arc = (a1, a2) => {
    const s = pt(a1)
    const e = pt(a2)
    const large = Math.abs(a2 - a1) > 180 ? 1 : 0
    const sweep = a2 > a1 ? 0 : 1
    return `M ${s.x} ${s.y} A ${r} ${r} 0 ${large} ${sweep} ${e.x} ${e.y}`
  }

  const scoreToAngle = (s) => 180 - s * 180

  const greenEnd = scoreToAngle(0.49)
  const amberEnd = scoreToAngle(0.64)
  const needleAngle = scoreToAngle(Math.min(displayed, 1))
  const tip = pt(needleAngle)

  const zoneColor =
    displayed >= 0.65 ? '#E24B4A'
    : displayed >= 0.50 ? '#BA7517'
    : '#1D9E75'

  const thresholdAngle = scoreToAngle(0.65)
  const innerPt = {
    x: cx + (r - 12) * Math.cos(toRad(thresholdAngle)),
    y: cy - (r - 12) * Math.sin(toRad(thresholdAngle))
  }
  const outerPt = {
    x: cx + (r + 12) * Math.cos(toRad(thresholdAngle)),
    y: cy - (r + 12) * Math.sin(toRad(thresholdAngle))
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <svg width={size} height={Math.round(size * 0.65)} viewBox={`0 0 ${size} ${Math.round(size * 0.65)}`}>
        {/* Background track */}
        <path d={arc(180, 0)} fill="none" stroke="#F1F5F9" strokeWidth={14} strokeLinecap="round" />

        {/* Zone bands */}
        <path d={arc(180, greenEnd)} fill="none" stroke="#1D9E75" strokeWidth={14} strokeLinecap="round" opacity={0.25} />
        <path d={arc(greenEnd, amberEnd)} fill="none" stroke="#BA7517" strokeWidth={14} opacity={0.25} />
        <path d={arc(amberEnd, 0)} fill="none" stroke="#E24B4A" strokeWidth={14} strokeLinecap="round" opacity={0.25} />

        {/* Active fill */}
        {displayed > 0 && (
          <path d={arc(180, needleAngle)} fill="none" stroke={zoneColor} strokeWidth={14} strokeLinecap="round" />
        )}

        {/* Threshold marker */}
        <line x1={innerPt.x} y1={innerPt.y} x2={outerPt.x} y2={outerPt.y} stroke="#E24B4A" strokeWidth={2.5} strokeDasharray="4 2" />

        {/* Needle */}
        <line x1={cx} y1={cy} x2={tip.x} y2={tip.y} stroke="#1E293B" strokeWidth={2.5} strokeLinecap="round" />
        <circle cx={cx} cy={cy} r={6} fill="#1E293B" />
        <circle cx={cx} cy={cy} r={3} fill="white" />

        {/* Score number */}
        <text x={cx} y={cy - 16} textAnchor="middle"
          style={{ fontSize: 34, fontWeight: 700, fill: zoneColor, fontFamily: "'Instrument Sans', sans-serif" }}>
          {displayed.toFixed(2)}
        </text>

        {/* Zone label */}
        <text x={cx} y={cy + 22} textAnchor="middle"
          style={{ fontSize: 12, fill: '#94A3B8', fontFamily: "'DM Sans', sans-serif" }}>
          {label}
        </text>

        {/* Min/max */}
        <text x={16} y={cy + 22} textAnchor="middle" style={{ fontSize: 10, fill: '#CBD5E1' }}>0.0</text>
        <text x={size - 16} y={cy + 22} textAnchor="middle" style={{ fontSize: 10, fill: '#CBD5E1' }}>1.0</text>

        {/* Threshold label */}
        <text
          x={cx + (r + 24) * Math.cos(toRad(thresholdAngle))}
          y={cy - (r + 24) * Math.sin(toRad(thresholdAngle)) + 4}
          textAnchor="middle"
          style={{ fontSize: 9, fill: '#E24B4A' }}
        >
          0.65
        </text>
      </svg>

      {/* Live / Replay badge */}
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        background: isReplay ? '#FFF7ED' : '#F0FDF4',
        border: `1px solid ${isReplay ? '#FDE68A' : '#BBF7D0'}`,
        borderRadius: 20,
        padding: '4px 12px',
        marginTop: 8,
      }}>
        <div style={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: isReplay ? '#BA7517' : '#1D9E75',
        }} />
        <span style={{ fontSize: 11, color: isReplay ? '#BA7517' : '#1D9E75', fontWeight: 500 }}>
          {isReplay ? 'Replaying Oct 15 2024 event' : 'Live — updated 5 min ago'}
        </span>
      </div>
    </div>
  )
}