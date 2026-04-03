import { useEffect, useState } from 'react'

export default function Payout({ worker, onBack }) {
  const [visible, setVisible] = useState(false)
  const [flashBg, setFlashBg] = useState(true)
  const [showLog, setShowLog] = useState(false)
  const [logStep, setLogStep] = useState(0)
  const [trustScore, setTrustScore] = useState(0)
  const upiRef = `PPAY${Date.now()}`

  const logEntries = [
    { time: '[17:02:14]', msg: 'IMD Alert Received',                      status: 'passed'    },
    { time: '[17:02:15]', msg: 'Risk Engine Activated',                   status: 'passed'    },
    { time: '[17:02:16]', msg: 'FraudGuard Check Passed',                 status: 'passed'    },
    { time: '[17:02:17]', msg: 'Guidewire Claim #GW-2025-VAD-001 Created',status: 'guidewire' },
    { time: '[17:02:18]', msg: 'ClaimCenter: Auto-Approved',              status: 'passed'    },
    { time: '[17:02:19]', msg: 'BillingCenter: Processing...',            status: 'processing'},
    { time: '[17:02:21]', msg: 'Pre-credit converted → ₹180 secured',     status: 'paid'      },
    { time: '[17:02:22]', msg: 'Additional payout → ₹44 processed',       status: 'paid'      },
    { time: '[17:02:23]', msg: '✦ ₹224 Disbursed to PhonePe',             status: 'final'     },
  ]

  const dotColor = {
    passed:     '#4ADE80',
    guidewire:  '#3B82F6',
    processing: '#FBBF24',
    paid:       '#2DD4BF',
    final:      '#2DD4BF',
  }
  const borderColor = {
    passed:     '#22C55E',
    guidewire:  '#2563EB',
    processing: '#F59E0B',
    paid:       '#0D9488',
    final:      '#0D9488',
  }

  useEffect(() => {
    // Teal flash → white
    setTimeout(() => setFlashBg(false), 400)
    // Checkmark scale in
    setTimeout(() => setVisible(true), 150)
    // Show log after checkmark
    setTimeout(() => setShowLog(true), 600)
  }, [])

  useEffect(() => {
    if (!showLog) return
    if (logStep >= logEntries.length) {
      // Animate trust score after log completes
      const start = Date.now()
      const iv = setInterval(() => {
        const p = Math.min((Date.now() - start) / 900, 1)
        setTrustScore(Math.round(50 * p))
        if (p >= 1) clearInterval(iv)
      }, 20)
      return
    }
    const t = setTimeout(() => setLogStep(s => s + 1), 600)
    return () => clearTimeout(t)
  }, [showLog, logStep])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500&family=JetBrains+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { transform: scale(0); opacity: 0; }
          to   { transform: scale(1); opacity: 1; }
        }
        @keyframes slideLeft {
          from { opacity: 0; transform: translateX(-10px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes barGrow {
          from { width: 0%; }
          to   { width: 22.4%; }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.3; }
        }
        .back-btn:hover { background: #EFF6FF !important; }
      `}</style>

      <div style={{
        minHeight: '100vh',
        background: flashBg ? '#1D9E75' : '#F8F9FB',
        transition: 'background 400ms ease',
        fontFamily: "'DM Sans', sans-serif",
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        padding: '24px 16px 40px',
      }}>
        <div style={{ width: '100%', maxWidth: 390, display: 'flex', flexDirection: 'column', gap: 14 }}>

          {/* Checkmark hero */}
          <div style={{
            background: 'white',
            borderRadius: 20,
            padding: '28px 24px 24px',
            border: '1px solid #E2E8F0',
            boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
            textAlign: 'center',
            animation: 'fadeUp 0.4s ease-out both',
          }}>
            <div style={{
              display: 'flex', justifyContent: 'center',
              marginBottom: 18,
              animation: visible ? 'scaleIn 0.45s cubic-bezier(0.34,1.56,0.64,1) both' : 'none',
            }}>
              <div style={{
                width: 72, height: 72, borderRadius: '50%',
                background: 'linear-gradient(135deg, #1D9E75, #22C55E)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 8px 24px rgba(29,158,117,0.3)',
              }}>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path d="M7 16 L13 22 L25 10"
                    stroke="white" strokeWidth="2.5"
                    strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>

            <h2 style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 26, fontWeight: 800,
              color: '#0F172A', margin: '0 0 6px',
              letterSpacing: '-0.5px',
            }}>₹224 confirmed</h2>
            <p style={{ fontSize: 14, color: '#64748B', margin: '0 0 16px' }}>
              Sent to your PhonePe · No action needed
            </p>

            {/* UPI ref */}
            <div style={{
              background: '#F8F9FB',
              borderRadius: 10, padding: '8px 14px',
              display: 'inline-block',
            }}>
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12, color: '#64748B',
              }}>{upiRef}</span>
            </div>
          </div>

          {/* System Event Log */}
          {showLog && (
            <div style={{
              background: '#0F172A',
              borderRadius: 16, padding: '16px 18px',
              border: '1px solid #1E293B',
              animation: 'fadeUp 0.3s ease-out both',
            }}>
              <p style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11, color: '#475569',
                margin: '0 0 12px', letterSpacing: '0.05em',
              }}>PulsePay System Event Log</p>

              {logEntries.slice(0, logStep).map((entry, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  marginBottom: 8, paddingLeft: 10,
                  borderLeft: `2px solid ${borderColor[entry.status]}`,
                  animation: 'slideLeft 0.3s ease-out both',
                }}>
                  <div style={{
                    width: 7, height: 7, borderRadius: '50%', flexShrink: 0,
                    background: dotColor[entry.status],
                    animation: entry.status === 'processing'
                      ? 'blink 0.9s ease-in-out infinite' : 'none',
                  }} />
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 11, color: '#475569', flexShrink: 0,
                  }}>{entry.time}</span>
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 12,
                    color: entry.status === 'final' ? '#2DD4BF'
                         : entry.status === 'guidewire' ? '#60A5FA'
                         : '#E2E8F0',
                    fontWeight: entry.status === 'final' ? 600 : 400,
                  }}>{entry.msg}</span>
                </div>
              ))}
            </div>
          )}

          {/* Event summary */}
          <div style={{
            background: 'linear-gradient(135deg, #185FA5, #1271C4)',
            borderRadius: 16, padding: 16,
            animation: 'fadeUp 0.4s ease-out 0.1s both',
          }}>
            <p style={{
              fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.6)',
              textTransform: 'uppercase', letterSpacing: '0.08em',
              margin: '0 0 12px',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}>Event Summary</p>
            {[
              ['Event',      'Heavy Rainfall — Vadapalani Zone C'],
              ['Date',       'October 15, 2024 · 8:00 PM'],
              ['DCS Score',  '0.65 — Threshold reached'],
              ['Processed',  '4 min 38 sec'],
              ['Rainfall',   '35.0 mm/hr'],
              ['Source',     'Open-Meteo Archive API'],
            ].map(([k, v]) => (
              <div key={k} style={{
                display: 'flex', justifyContent: 'space-between',
                marginBottom: 8, gap: 12,
              }}>
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', whiteSpace: 'nowrap' }}>{k}</span>
                <span style={{ fontSize: 12, color: 'white', textAlign: 'right', fontWeight: 500 }}>{v}</span>
              </div>
            ))}
          </div>

          {/* Income bar */}
          <div style={{
            background: 'white', borderRadius: 14,
            padding: '14px 16px',
            border: '1px solid #E2E8F0',
            boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
            animation: 'fadeUp 0.4s ease-out 0.2s both',
          }}>
            <div style={{
              display: 'flex', justifyContent: 'space-between',
              marginBottom: 8, fontSize: 13,
            }}>
              <span style={{ color: '#64748B', fontWeight: 500 }}>Income protected this week</span>
              <span style={{ color: '#0F172A', fontWeight: 700,
                fontFamily: "'Plus Jakarta Sans', sans-serif" }}>₹224 / ₹1,000</span>
            </div>
            <div style={{
              height: 8, background: '#F1F5F9',
              borderRadius: 4, overflow: 'hidden',
            }}>
              <div style={{
                height: '100%', borderRadius: 4,
                background: 'linear-gradient(90deg, #1D9E75, #22C55E)',
                animation: 'barGrow 1.2s ease-out 0.5s both',
              }} />
            </div>
            <p style={{ fontSize: 11, color: '#CBD5E1', margin: '6px 0 0', textAlign: 'right' }}>
              22.4% of coverage used
            </p>
          </div>

          {/* Trust score */}
          {logStep >= logEntries.length && (
            <div style={{
              background: '#F0FDF4',
              border: '1px solid #BBF7D0',
              borderRadius: 14, padding: '14px 16px',
              animation: 'fadeUp 0.4s ease-out both',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <p style={{
                  fontSize: 13, fontWeight: 700, color: '#1D9E75',
                  fontFamily: "'Plus Jakarta Sans', sans-serif", margin: 0,
                }}>Trust Score Unlocked</p>
                <span style={{
                  fontSize: 13, fontWeight: 800, color: '#1D9E75',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}>{trustScore}/100</span>
              </div>
              <div style={{
                height: 6, background: '#BBF7D0',
                borderRadius: 3, overflow: 'hidden',
              }}>
                <div style={{
                  height: '100%', borderRadius: 3,
                  background: '#1D9E75',
                  width: `${trustScore}%`,
                  transition: 'width 30ms linear',
                }} />
              </div>
              <p style={{ fontSize: 12, color: '#16A34A', margin: '8px 0 0' }}>
                13 points to 90-second payouts
              </p>
            </div>
          )}

          {/* Back button */}
          <button
            onClick={onBack}
            className="back-btn"
            style={{
              width: '100%', height: 50,
              background: 'white', color: '#185FA5',
              border: '1.5px solid #185FA5',
              borderRadius: 14, fontSize: 14, fontWeight: 700,
              cursor: 'pointer', transition: 'all 200ms',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
          >
            Back to Dashboard
          </button>

        </div>
      </div>
    </>
  )
}