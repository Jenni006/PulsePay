import { useState, useEffect } from 'react'

const LIVE_URL =
  'https://api.open-meteo.com/v1/forecast?latitude=13.05&longitude=80.21&current=precipitation,temperature_2m,relative_humidity_2m&timezone=Asia/Kolkata'

export default function useWeatherData(replayMode = false) {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isReplay, setIsReplay] = useState(false)

  const fetchLive = async () => {
    try {
      setLoading(true)
      const res = await fetch(LIVE_URL)
      const data = await res.json()
      const current = data.current
      setWeather({
        rainfall: current.precipitation ?? 0,
        temperature: current.temperature_2m ?? 28,
        humidity: current.relative_humidity_2m ?? 70,
        orderDrop: 0,
        aqi: 60,
        civic: false,
        source: 'live',
      })
      setIsReplay(false)
    } catch (err) {
      setError('Failed to fetch weather data')
    } finally {
      setLoading(false)
    }
  }

  const loadReplay = () => {
    // Oct 15 2024 — verified Open-Meteo archive data, Vadapalani 13.05N 80.21E
    setWeather({
      rainfall: 8.0,
      temperature: 27,
      humidity: 89,
      orderDrop: 78,
      aqi: 60,
      civic: false,
      source: 'replay',
      replayDate: 'Oct 15, 2024 — 8:00 PM',
    })
    setIsReplay(true)
    setLoading(false)
  }

  useEffect(() => {
    fetchLive()
  }, [])

  return { weather, loading, error, isReplay, loadReplay, fetchLive }
}