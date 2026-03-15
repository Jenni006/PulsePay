// WBGT formula — WHO standard for outdoor heat stress
export function calculateWBGT(temp, humidity) {
  const e = (humidity / 100) * 6.105 * Math.exp((17.27 * temp) / (237.7 + temp))
  return 0.567 * temp + 0.393 * e + 3.94
}

// Normalise each trigger to 0.0–1.0
function rainfallScore(mm) {
  if (mm >= 30) return 1.0
  if (mm >= 15) return 0.7 + ((mm - 15) / 15) * 0.3
  if (mm >= 8) return 0.4 + ((mm - 8) / 7) * 0.3
  return mm / 8 * 0.4
}

function orderDropScore(pct) {
  if (pct >= 75) return 1.0
  if (pct >= 50) return 0.5 + ((pct - 50) / 25) * 0.5
  return pct / 50 * 0.5
}

function wbgtScore(wbgt) {
  if (wbgt >= 38) return 1.0
  if (wbgt >= 35) return 0.6 + ((wbgt - 35) / 3) * 0.4
  if (wbgt >= 32) return 0.3 + ((wbgt - 32) / 3) * 0.3
  return 0
}

function aqiScore(aqi) {
  if (aqi >= 400) return 1.0
  if (aqi >= 300) return 0.5 + ((aqi - 300) / 100) * 0.5
  return 0
}

function civicScore(active) {
  return active ? 1.0 : 0
}

// DCS formula with weights from README
export function calculateDCS(weather) {
  const { rainfall = 0, orderDrop = 0, temperature = 28, humidity = 70, aqi = 60, civic = false } = weather

  const wbgt = calculateWBGT(temperature, humidity)

  const w1 = 0.35 // Rainfall
  const w2 = 0.30 // Order velocity
  const w3 = 0.18 // Heat stress
  const w4 = 0.10 // AQI
  const w5 = 0.07 // Civic

  const score =
    w1 * rainfallScore(rainfall) +
    w2 * orderDropScore(orderDrop) +
    w3 * wbgtScore(wbgt) +
    w4 * aqiScore(aqi) +
    w5 * civicScore(civic)

  const rounded = Math.round(score * 100) / 100

  let zone = 'clear'
  let label = 'Zone Clear'
  if (rounded >= 0.65) { zone = 'payout'; label = 'Payout Triggered' }
  else if (rounded >= 0.50) { zone = 'watch'; label = 'Watch Mode' }

  return { score: rounded, zone, label, wbgt: Math.round(wbgt * 10) / 10 }
}