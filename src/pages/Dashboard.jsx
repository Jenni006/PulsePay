import { useEffect, useState } from 'react'
import DCSGauge from '../components/DCSGauge'
import TriggerPill from '../components/TriggerPill'
import TrustScore from '../components/TrustScore'
import useWeatherData from '../hooks/useWeatherData'
import { calculateDCS, calculateWBGT } from '../utils/dcsCalculator'
import { OCT15_REPLAY } from '../data/oct15replay'

export default function Dashboard({ worker, onPayout }) {
  const { weather, loading, isReplay, loadReplay, fetchLive } = useWeatherData()
  const [dcs, setDcs] = useState({ score: 0, zone: 'clear', label: 'Zone Clear' })
  const [wbgt, setWbgt] = useState(0)
  const [replaying, setReplaying] = useState(false)

  useEffect(() => {
    if (!weather) return
    console.log('Weather data:', weather)
    const w = calculateWBGT(weather.temperature, weather.humidity)
    setWbgt(w)
    const result = calculateDCS(weather)
    console.log('DCS result:', result)
    setDcs(result)
  }, [weather])

  const handleReplay = () => {
    setReplaying(true)
    loadReplay()

    // Navigate to payout after animation completes
    setTimeout(() => {
      onPayout()
    }, 3500)
  }

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  const zoneColor = {
    clear: '#1D9E75',
    watch: '#BA7517',
    payout: '#E24B4A',
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              width: 36,
              height: 36,
              border: '3px solid #E2E8F0',
              borderTop: '3px solid #185FA5',
              borderRadius: '50%',
              animation: 'spin 0.8s linear infinite',
              margin: '0 auto 12px',
            }}
          />
          <p style={{ fontSize: 14, color: '#64748B' }}>Fetching live weather data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex justify-center px-4 py-6">
      <div
        style={{
          width: '100%',
          maxWidth: 390,
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}
      >
        {/* Header */}
        <div
          style={{
            background: 'white',
            border: '1px solid #E2E8F0',
            borderRadius: 16,
            padding: '14px 18px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
          }}
        >
          <div>
            <p style={{ fontSize: 13, color: '#64748B', margin: 0 }}>{greeting},</p>
            <p style={{ fontSize: 16, fontWeight: 600, color: '#0F172A', margin: 0 }}>
              {worker?.name || 'Dinesh'}
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: '#1D9E75',
              }}
            />
            <span style={{ fontSize: 13, color: '#1D9E75', fontWeight: 500 }}>Protected</span>
          </div>
        </div>

        {/* DCS Gauge */}
        <div
          style={{
            background: 'white',
            border: '1px solid #E2E8F0',
            borderRadius: 16,
            padding: 20,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
          }}
        >
          <p
            style={{
              fontSize: 12,
              color: '#94A3B8',
              letterSpacing: '0.05em',
              marginBottom: 8,
              textTransform: 'uppercase',
            }}
          >
            Disruption Confidence Score
          </p>
          <DCSGauge
            score={dcs.score}
            label={dcs.label}
            isReplay={isReplay}
          />
        </div>

        {/* AI Analysis */}
        <div
          style={{
            background: 'white',
            border: '1px solid #E2E8F0',
            borderRadius: 16,
            padding: 16,
            boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
          }}
        >
          <p style={{ fontSize: 12, color: '#94A3B8', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            AI Risk Engine
          </p>
          <p style={{ fontSize: 13, color: '#0F172A', margin: 0, lineHeight: 1.6 }}>
            {isReplay
              ? 'Rainfall surge detected in Vadapalani zone. Order activity declined due to road flooding near Cooum corridor. Estimated income disruption: 67%.'
              : weather?.rainfall > 5
              ? `Rainfall of ${weather.rainfall.toFixed(1)}mm detected. Monitor conditions — order activity may decline if rainfall increases.`
              : 'Conditions stable. No disruption signals detected in your zone.'}
          </p>
        </div>

        {/* Trigger Pills */}
        <TriggerPill
          rainfall={weather?.rainfall || 0}
          orderDrop={weather?.orderDrop || 0}
          wbgt={wbgt}
          aqi={weather?.aqi || 60}
        />

        {/* Coverage summary */}
        <div
          style={{
            background: 'white',
            border: '1px solid #E2E8F0',
            borderRadius: 16,
            padding: 16,
            display: 'flex',
            justifyContent: 'space-between',
            boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
          }}
        >
          <div>
            <p style={{ fontSize: 12, color: '#64748B', margin: 0 }}>This week's premium</p>
            <p style={{ fontSize: 18, fontWeight: 600, color: '#0F172A', margin: 0 }}>
              ₹{worker?.zoneData?.premium || 22} paid
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: 12, color: '#64748B', margin: 0 }}>Coverage remaining</p>
            <p style={{ fontSize: 18, fontWeight: 600, color: '#1D9E75', margin: 0 }}>
              ₹{worker?.zoneData?.cap?.toLocaleString() || '1,000'}
            </p>
          </div>
        </div>

        {/* Trust Score */}
        <TrustScore score={50} unlocked={false} />

        {/* Replay button */}
        <button
          onClick={handleReplay}
          disabled={replaying}
          style={{
            width: '100%',
            height: 48,
            background: 'white',
            color: replaying ? '#94A3B8' : '#185FA5',
            border: `1px solid ${replaying ? '#E2E8F0' : '#185FA5'}`,
            borderRadius: 10,
            fontSize: 14,
            fontWeight: 500,
            cursor: replaying ? 'not-allowed' : 'pointer',
            transition: 'all 200ms',
          }}
        >
          {replaying ? 'Replaying event...' : '▶ Replay: Oct 15 2024 — Vadapalani flood event'}
        </button>

        <p style={{ fontSize: 11, color: '#94A3B8', textAlign: 'center', marginTop: -8 }}>
          Verified Open-Meteo archive data — 13.05°N, 80.21°E
        </p>
      </div>
    </div>
  )
}