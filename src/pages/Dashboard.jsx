import { useEffect, useState } from 'react'
import DCSGauge from '../components/DCSGauge'
import TriggerPill from '../components/TriggerPill'
import TrustScore from '../components/TrustScore'
import useWeatherData from '../hooks/useWeatherData'
import { calculateDCS, calculateWBGT } from '../utils/dcsCalculator'

export default function Dashboard({ worker, onPayout }) {
  const { weather, loading, isReplay, loadReplay } = useWeatherData()
  const [dcs, setDcs]               = useState({ score: 0, zone: 'clear', label: 'Zone Clear' })
  const [wbgt, setWbgt]             = useState(0)
  const [simulating, setSimulating] = useState(false)
  const [showPreCredit, setShowPreCredit] = useState(true)

  useEffect(() => {
    if (!weather) return
    const w = calculateWBGT(weather.temperature, weather.humidity)
    setWbgt(w)
    const result = calculateDCS(weather)
    setDcs(result)
  }, [weather])

  const handleSimulate = () => {
    setSimulating(true)
    loadReplay()
    setTimeout(() => onPayout(), 3500)
  }

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'morning' : hour < 17 ? 'afternoon' : 'evening'
  const workerName = worker?.name || 'Raj'
  const premium = worker?.premium || 22
  const cap     = worker?.coverage || 1000
  const zone    = worker?.zone || 'Vadapalani — Zone C'

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        background: '#F8F9FB', flexDirection: 'column', gap: 12,
      }}>
        <div style={{
          width: 36, height: 36,
          border: '3px solid #E2E8F0',
          borderTop: '3px solid #185FA5',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }} />
        <p style={{
          fontSize: 14, color: '#64748B',
          fontFamily: "'DM Sans', sans-serif",
        }}>Fetching live weather data...</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    )
  }

  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(186,117,23,0.15); }
          50%       { box-shadow: 0 0 0 6px rgba(186,117,23,0.05); }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .dash-card { animation: fadeUp 0.4s ease-out both; }
        .sim-btn:hover { background: #EFF6FF !important; }
        .sim-btn:active { transform: scale(0.98); }
      `}</style>

      <div style={{
        minHeight: '100vh',
        background: '#F8F9FB',
        fontFamily: "'DM Sans', sans-serif",
      }}>

        {/* ── Hero Header ── */}
        <div style={{
          background: 'linear-gradient(135deg, #185FA5 0%, #1271C4 100%)',
          padding: '44px 24px 70px',
          position: 'relative',
          overflow: 'hidden',
          borderBottomLeftRadius: '32px',
          borderBottomRightRadius: '32px',
          boxShadow: '0 10px 25px rgba(24, 95, 165, 0.15)',
          zIndex: 1
        }}>
          <div style={{
            position: 'absolute', top: -40, right: -40,
            width: 180, height: 180, borderRadius: '50%',
            background: 'rgba(255,255,255,0.05)',
          }} />
          <div style={{
            position: 'absolute', bottom: -20, right: 40,
            width: 100, height: 100, borderRadius: '50%',
            background: 'rgba(255,255,255,0.05)',
          }} />

          <p style={{
            fontSize: 14, color: 'rgba(255,255,255,0.75)',
            margin: '0 0 4px',
          }}>
            Good {greeting} 👋
          </p>
          <h1 style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 26, fontWeight: 800,
            color: 'white', margin: '0 0 4px',
            letterSpacing: '-0.5px',
          }}>
            {workerName}
          </h1>
          <p style={{
            fontSize: 15, fontWeight: 600,
            color: 'rgba(255,255,255,0.9)',
            margin: '0 0 16px',
          }}>
            {zone}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              background: 'rgba(255,255,255,0.15)',
              backdropFilter: 'blur(8px)',
              borderRadius: 20, padding: '5px 12px',
            }}>
              <div style={{
                width: 7, height: 7, borderRadius: '50%',
                background: '#4ADE80',
              }} />
              <span style={{ fontSize: 12, color: 'white', fontWeight: 600 }}>
                Protected
              </span>
            </div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              background: 'rgba(255,255,255,0.15)',
              backdropFilter: 'blur(8px)',
              borderRadius: 20, padding: '5px 12px',
            }}>
              <span style={{ fontSize: 12, color: 'white' }}>
                📍 13.05°N, 80.21°E
              </span>
            </div>
          </div>
        </div>

        {/* ── Cards Container ── */}
        <div style={{
          maxWidth: 390, margin: '0 auto',
          padding: '0 16px',
          marginTop: -35,
          display: 'flex', flexDirection: 'column', gap: 14,
          position: 'relative',
          zIndex: 2
        }}>

          {/* Pre-Credit Card */}
          {showPreCredit && (
            <div className="dash-card" style={{
              background: 'white',
              borderRadius: 20,
              padding: '16px 18px',
              border: '1px solid #E2E8F0',
              borderLeft: '4px solid #BA7517',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              animation: 'pulse-glow 2.5s ease-in-out infinite, fadeUp 0.4s ease-out both',
              position: 'relative',
            }}>
              <button
                onClick={() => setShowPreCredit(false)}
                style={{
                  position: 'absolute', top: 12, right: 14,
                  background: 'none', border: 'none',
                  color: '#94A3B8', cursor: 'pointer',
                  fontSize: 18, lineHeight: 1,
                }}
              >×</button>

              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <span style={{ fontSize: 18 }}>🌧</span>
                <span style={{
                  fontSize: 11, fontWeight: 700,
                  background: '#FEF3C7', color: '#BA7517',
                  padding: '2px 10px', borderRadius: 20,
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  letterSpacing: '0.04em',
                }}>FORECAST ALERT</span>
              </div>

              <p style={{
                fontSize: 13, color: '#64748B',
                margin: '0 0 6px', lineHeight: 1.5,
              }}>
                Rain forecast tomorrow 5–8 PM · 74% probability
              </p>
              <p style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: 20, fontWeight: 800,
                color: '#0F172A', margin: '0 0 10px',
                letterSpacing: '-0.3px',
              }}>
                ₹180 pre-credited
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{
                  fontSize: 11, fontWeight: 700,
                  background: '#E0FAF4', color: '#1D9E75',
                  padding: '3px 10px', borderRadius: 20,
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}>ACTIVE</span>
                <span style={{ fontSize: 11, color: '#94A3B8' }}>
                  Auto-reverses if DCS stays below 0.65
                </span>
              </div>
            </div>
          )}

          {/* DCS Gauge */}
          <div className="dash-card" style={{
            background: 'white',
            borderRadius: 20,
            padding: '20px 20px 16px',
            border: '1px solid #E2E8F0',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            animationDelay: '0.05s',
          }}>
            <p style={{
              fontSize: 11, fontWeight: 700,
              color: '#94A3B8', textTransform: 'uppercase',
              letterSpacing: '0.08em', margin: '0 0 12px',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}>Disruption Confidence Score</p>
            <DCSGauge score={dcs.score} label={dcs.label} isReplay={isReplay} />
            <p style={{ fontSize: 11, color: '#CBD5E1', margin: '10px 0 0' }}>
              Last updated 3 min ago
            </p>
          </div>

          {/* AI Risk Engine */}
          <div className="dash-card" style={{
            background: 'white',
            borderRadius: 20,
            padding: 16,
            border: '1px solid #E2E8F0',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            animationDelay: '0.1s',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <p style={{
                fontSize: 11, fontWeight: 700,
                color: '#94A3B8', textTransform: 'uppercase',
                letterSpacing: '0.08em', margin: 0,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}>AI Risk Engine</p>
              <div style={{
                width: 6, height: 6, borderRadius: '50%',
                background: '#1D9E75',
                boxShadow: '0 0 0 2px rgba(29,158,117,0.2)',
              }} />
            </div>
            <p style={{
              fontSize: 13, color: '#0F172A',
              margin: 0, lineHeight: 1.7,
            }}>
              {isReplay
                ? 'Rainfall surge detected in Vadapalani zone. Order activity declined due to road flooding near Cooum corridor. Estimated income disruption: 67%.'
                : weather?.rainfall > 5
                ? `Rainfall of ${weather.rainfall.toFixed(1)}mm detected. Monitor conditions — order activity may decline if rainfall increases.`
                : 'Conditions stable. No disruption signals detected in your zone.'}
            </p>
          </div>

          {/* Trigger Pills */}
          <div className="dash-card" style={{ animationDelay: '0.15s' }}>
            <TriggerPill
              rainfall={weather?.rainfall || 0}
              orderDrop={weather?.orderDrop || 0}
              wbgt={wbgt}
              aqi={weather?.aqi || 60}
            />
          </div>

          {/* Coverage Summary */}
          <div className="dash-card" style={{
            background: 'white',
            borderRadius: 20,
            padding: 16,
            border: '1px solid #E2E8F0',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            animationDelay: '0.2s',
          }}>
            <p style={{
              fontSize: 11, fontWeight: 700,
              color: '#94A3B8', textTransform: 'uppercase',
              letterSpacing: '0.08em', margin: '0 0 12px',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}>Coverage Summary</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14 }}>
              <div>
                <p style={{ fontSize: 12, color: '#64748B', margin: '0 0 2px' }}>Premium paid</p>
                <p style={{
                  fontSize: 22, fontWeight: 700, color: '#0F172A', margin: 0,
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}>₹{premium}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: 12, color: '#64748B', margin: '0 0 2px' }}>Remaining cover</p>
                <p style={{
                  fontSize: 22, fontWeight: 700, color: '#1D9E75', margin: 0,
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}>₹{cap.toLocaleString()}</p>
              </div>
            </div>
            <div style={{
              width: '100%', height: 6,
              background: '#F1F5F9', borderRadius: 3, overflow: 'hidden',
            }}>
              <div style={{
                width: '22.4%', height: '100%',
                background: 'linear-gradient(90deg, #1D9E75, #22C55E)',
                borderRadius: 3,
              }} />
            </div>
            <p style={{
              fontSize: 11, color: '#CBD5E1',
              margin: '6px 0 0', textAlign: 'right',
            }}>₹224 used of ₹{cap.toLocaleString()}</p>
          </div>

          {/* Trust Score */}
          <div className="dash-card" style={{ animationDelay: '0.25s' }}>
            <TrustScore score={50} unlocked={false} />
          </div>

          {/* Simulate Button */}
          <div className="dash-card" style={{ animationDelay: '0.3s' }}>
            <button
              onClick={handleSimulate}
              disabled={simulating}
              className="sim-btn"
              style={{
                width: '100%', height: 50,
                background: simulating ? '#F8F9FB' : 'white',
                color: simulating ? '#94A3B8' : '#185FA5',
                border: `1.5px solid ${simulating ? '#E2E8F0' : '#185FA5'}`,
                borderRadius: 16,
                fontSize: 13, fontWeight: 600,
                cursor: simulating ? 'not-allowed' : 'pointer',
                transition: 'all 200ms',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            >
              {simulating ? '⏳ Simulating...' : 'Simulate Thursday 5:00 PM →'}
            </button>
            <p style={{
              fontSize: 11, color: '#CBD5E1',
              textAlign: 'center', marginTop: 8,
            }}>
              Verified Open-Meteo archive · 13.05°N, 80.21°E
            </p>
          </div>

        </div>

      </div>
    </>
  )
}