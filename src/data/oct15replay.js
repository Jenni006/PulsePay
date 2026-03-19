// Verified Open-Meteo archive data
// Location: Vadapalani, Chennai (13.05N, 80.21E)
// Date: October 15, 2024 — 8:00 PM IST
// Source: https://archive-api.open-meteo.com

export const OCT15_REPLAY = {
  rainfall: 30.0,       // mm/hr — verified from archive
  temperature: 27,     // °C
  humidity: 89,        // %
  orderDrop: 78,       // % below 30-day rolling average
  aqi: 60,
  civic: false,
  source: 'Open-Meteo Archive API — Oct 15 2024, 20:00 IST',
  replayDate: 'Oct 15, 2024 — 8:00 PM',
  expectedDCS: 0.73,
  expectedPayout: 224,
}