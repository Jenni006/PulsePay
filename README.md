# PulsePay 
### Parametric Income Protection for Chennai's Quick Commerce Delivery Workers

> *"PulsePay doesn't wait for a claim. It pays before you've stopped riding."*

**Guidewire DEVTrails 2026 | Team: Git Set Go | SRM Institute of Science and Technology**  
**Persona:** Quick Commerce Delivery Partners (Zepto / Blinkit / Swiggy Instamart) — Chennai  
**Platform:** Responsive Web Application

---

## 1. The Problem

India has over 12 million active gig delivery workers as of 2024, projected to reach 23.5 million by 2030 (NITI Aayog, 2022). External disruptions — heavy rain, extreme heat, floods, bandhs — cause 20–30% monthly income loss on average. When income gaps hit, the majority of workers with no formal savings turn to informal credit, with no safety net to fall back on (NITI Aayog, 2022).

Chennai is one of the most disruption-exposed cities in India for delivery workers. The northeast monsoon (October–December) floods zones like Vadapalani, Tambaram, Adyar, Porur, and Mudichur every year. Our own analysis of Open-Meteo archive data for Vadapalani (lat 13.05, lon 80.21) shows rainfall peaking at 13.1mm/hr on October 16, 2024 — a verified heavy rain event that would have halted deliveries across the zone for hours. Meanwhile, January–March 2025 data from the same coordinates shows near-zero rainfall, confirming Chennai's dry season pattern and validating why our premium model applies a 0.85× off-season multiplier. The data backs every design decision we made.

There is currently zero income protection for these workers. PulsePay changes that.

---

## 2. Why Quick Commerce

We evaluated all three delivery segments. Quick commerce won on every dimension that matters for parametric insurance.

The **10-minute SLA** is the defining insight. A Zomato rider can shelter during rain and wait it out — they lose one order. A Blinkit rider cannot make that choice. Stopping means losing performance score, zone priority, and potentially active status. Income collapse is faster, sharper, and more complete than any other segment.

The **dark store geography** creates a natural parametric unit. Each dark store serves a 1.5–2.5km radius. All workers in that zone are affected simultaneously when disruption hits — the ideal structure for automated payouts.

| Criteria | Food Delivery | E-Commerce | Quick Commerce |
|---|---|---|---|
| Can shelter during rain? | Partially | Yes | **No — SLA prevents it** |
| Geographic precision | City-wide | Wide radius | **1.5–2.5km dark store zone** |
| Earnings digitisation | Partial | Weekly | **Daily UPI settlement** |
| Income predictability | Moderate | High | **Very high by time slot** |

**Chosen city: Chennai.** Highest northeast monsoon exposure among Indian metros. Vadapalani, Adyar, and Tambaram are documented flood-prone zones. Quick commerce platforms operate multiple dark stores across the city with high worker density.

---

## 3. Persona — Dinesh R.

**Age:** 23 | **Platform:** Blinkit | **Zone:** Vadapalani dark store  
**Vehicle:** TVS Jupiter | **Active hours:** 8am–1pm, 5pm–9pm  
**Average weekly earnings:** ₹4,200 | **Payment:** PhonePe | **Savings:** None

A Blinkit delivery partner publicly reported earning ₹763 after completing 28 orders across a 15-hour shift (*Indian Express*, 2024). This corroborates our weekly earnings baseline of ₹4,200 for an active quick commerce rider working full shifts.

On a normal Wednesday evening Dinesh earns around ₹420 across 7–9 deliveries in his zone.

**What disruption actually looks like:**

On October 15, 2024, rainfall in Vadapalani hit 30.0mm/hr at 8pm and sustained through the evening — verified from Open-Meteo archive data for coordinates 13.05°N, 80.21°E. Roads near the Cooum drainage corridor flooded within 20 minutes. Dinesh couldn't ride. He earned ₹140 that evening instead of ₹420 — a loss of ₹280. He skipped groceries that week to make rent.

**With PulsePay:**

Rainfall crosses the 8mm trigger threshold at 8:00pm. By 8:05pm — five minutes later — ₹224 is in Dinesh's PhonePe. He gets a notification: *"Heavy rain detected in your zone. ₹224 sent to your PhonePe. Stay safe."*

Worker action required: **Zero.** No claim filed. No form uploaded. No phone call made.

He pays ₹20/week for this. Less than a single auto ride.

---

## 4. What PulsePay Does

PulsePay is a **parametric income continuity platform** — not a traditional insurance product.

Traditional insurance: *Worker loses income → files claim → insurer reviews → pays (days later)*

PulsePay: *System detects disruption → estimates loss → pays → worker gets notification*

```
Worker enrolls via mobile OTP + Aadhaar eKYC (90 seconds)
        ↓
Weekly premium auto-deducted from platform earnings
        ↓
PulsePay monitors 5 data streams every 5 minutes
        ↓
Disruption Confidence Score calculated continuously
        ↓
DCS ≥ 0.65 → IncomeLens estimates loss → FraudGuard validates
        ↓
Guidewire Autopilot — zero-touch claim workflow triggered
        ↓
Guidewire ClaimCenter — claim auto-created and approved
        ↓
Guidewire BillingCenter — payout processed
        ↓
UPI transfer to worker PhonePe
        ↓
"Heavy rain in your zone. ₹224 sent to PhonePe. Stay safe."
```

**Covers:** Lost income during verifiable external disruptions only.  
**Does not cover:** Health, accidents, vehicle damage, platform deactivation, or any worker-caused income loss.

---

## 5. Parametric Triggers

Five triggers. No trigger relies on worker-reported data. All verified from at least two independent sources. Payouts fire only when the **Disruption Confidence Score (DCS)** crosses **0.65**.

```
DCS = (0.35 × Rainfall) + (0.30 × Order Velocity) + (0.18 × Heat Stress)
    + (0.10 × Air Quality) + (0.07 × Civic Alert)

DCS ≥ 0.65  →  Payout triggered
DCS 0.50–0.64  →  Watch mode, no payout yet
DCS < 0.50  →  All clear
```

**Why this matters:** Light drizzle with normal order volumes keeps DCS below 0.65 — no false payout. Heavy rain AND order collapse together pushes DCS over threshold fast. The system requires convergent evidence, not a single bad reading.

| Trigger | Measures | Source | Payout |
|---|---|---|---|
| **Hyperlocal Rainfall (HRI)** | mm/hr at 500m zone grid | Open-Meteo API | 40–100% of time-slot baseline |
| **Heat Stress (WBGT)** | Wet bulb temperature — humidity + heat combined, not just air temp | Open-Meteo + NASA POWER | 30–100% of time-slot baseline |
| **Order Velocity Collapse (OVC)** | % drop in order ping rate vs 30-day rolling average | Worker-side passive SDK (consent-based) | 50–80% of hourly baseline |
| **AQI Breach (AHB)** | PM2.5 crossing CPCB "Very Poor" / "Severe" thresholds | CPCB API + OpenAQ | 25–80% of daily baseline |
| **Civic Disruption (CDA)** | Bandhs, curfews, Section 144 in operating zone | RSS feeds (Times of India, The Hindu) + OVC consensus | 85–100% for declared hours |

*Daily cap: 8 hours maximum payout across all triggers combined.*

**Why WBGT not "temperature > 45°C":** Chennai's humidity makes dry bulb temperature a poor indicator. At 37°C with 80% humidity — a typical April afternoon — WBGT reaches 34°C, the WHO threshold for reduced safe outdoor activity. Dry bulb alone misses this entirely.

**Why OVC is our strongest signal:** It's a direct income measurement, not a proxy. When order pings stop coming, income stops. It also catches what weather triggers miss — platform outages, payment gateway failures, sudden demand collapse.

---

## 6. Weekly Premium Model

| Factor | What It Measures | Weight |
|---|---|---|
| Zone Risk Score | Historical DCS≥0.65 rate for dark store zone, 365-day rolling | 40% |
| Earnings Baseline | Worker's average weekly income — sets coverage ceiling | 25% |
| Seasonal Multiplier | Northeast monsoon Oct–Dec: 1.5×. Summer Apr–Jun: 1.2×. Off-season: 0.85× | 20% |
| Trust Score Factor | Discount unlocked as Trust Score increases over time | 15% |

**Chennai Zone Tiers:**

| Zone | Areas | Weekly Premium | Coverage Cap |
|---|---|---|---|
| Zone A — Low Risk | Sholinganallur, Porur outskirts | ₹12 | ₹600 |
| Zone B — Medium | Anna Nagar, T Nagar, OMR | ₹18 | ₹800 |
| Zone C — High Risk | Vadapalani, Adyar, Velachery | ₹22 | ₹1,000 |
| Zone D — Flood Prone | Tambaram, Mudichur, Perungudi | ₹28 | ₹1,300 |

Premium auto-debits from platform earnings weekly. No separate payment needed.

**Honest note:** This product needs reinsurance backing at launch and 2–3 monsoon cycles of real loss data before premiums are precisely calibrated. The DCS threshold of 0.65 filters minor disruptions significantly. The viable path to profitability runs through scale and the data asset — not premium margin alone.

---

## 7. AI/ML Integration

Three systems. All implemented as rule-based mock models for the prototype, documented for production ML replacement.

**DynamicPricer** (XGBoost) — Calculates weekly premium using worker's 90-day earnings average and variance, zone historical trigger rate, Chennai Corporation flood zone score, week-of-year seasonality, and tenure weeks. Output: premium in ₹ + one-line explanation shown to worker.

**IncomeLens** (Random Forest Regressor) — Estimates personalised income loss per worker during a disruption. Uses each worker's own earnings history by day-of-week and time-slot, not a city average. A flat payout for all workers is actuarially crude — Dinesh's Wednesday 6pm baseline is not the same as city-average Wednesday 6pm. Output: estimated loss ₹ + recommended payout at 80–90% of estimate.

**FraudGuard** (Isolation Forest + XGBoost Classifier) — Detects GPS spoofing (cross-referenced with accelerometer + cell tower data), out-of-zone claims (hard GeoJSON boundary), duplicate accounts (Aadhaar + device fingerprint), and coordinated slowdowns (OVC requires environmental corroboration — never fires alone). Output: fraud risk score 0–1 → auto-approve / hold / manual review.

---

## 8. Three Things That Make Us Different

**Predictive Pre-Credit — not just reactive payout**

Every morning at 7am, PulsePay runs a 12-hour forecast for each zone using IMD extended forecasts and historical disruption patterns. If disruption probability exceeds 70% during a worker's active window, PulsePay pre-credits the estimated income buffer to their wallet before the disruption starts. If it doesn't materialise, the credit is silently reversed. The worker never experiences a financial gap — the disruption becomes financially invisible.

**Proof of Recovery — a new financial primitive**

Every payout is proof. Proof that this worker showed up, 
got disrupted, and came back. PulsePay introduces Proof of 
Recovery — verified evidence of a worker's ability to bounce 
back from income loss.

India has credit scores for repayment. We built the first 
verified resilience record for workers formal finance has 
never seen.

Workers with High Recovery badge unlock disruption liquidity 
— not a loan, money available only when income stops, 
auto-repaid from next week's platform earnings.

**Income Infrastructure, Not Just Insurance** — After 24 months PulsePay holds the most granular verified income dataset for informal workers in India. This enables gig worker credit scoring (NBFC partnerships), platform risk intelligence (sold to Blinkit/Zepto for supply planning), and reinsurance data products. PulsePay starts as income protection. It becomes the financial identity layer for India's gig workforce.

**Built on Guidewire** — PulsePay is designed as a parametric module that sits on top of Guidewire's PolicyCenter — not a replacement, but an extension that brings real-time environmental triggers into existing insurer workflows.

---

## 9. Platform Choice

**Web app** — single codebase for both worker (mobile view) and insurer (desktop dashboard), instant Vercel deployment, no app store delay on a 6-week timeline.

---

## 10. Tech Stack

```
Frontend:   React 18 + TypeScript, Tailwind CSS, Recharts
Backend:    Node.js 20 + Express.js, PostgreSQL, Redis, JWT auth
ML:         Python 3.11, scikit-learn, XGBoost, FastAPI
APIs:       Open-Meteo (weather — free, no key)
            OpenAQ (AQI — free)
            RSS feeds — Times of India + The Hindu (civic alerts — free, no key)
            Razorpay test mode (UPI payout simulation)
            UIDAI sandbox (eKYC simulation)
Guidewire:  Autopilot — zero-touch parametric claim workflow
            PolicyCenter API — policy creation and weekly premium management
            ClaimCenter API  — parametric claim initiation and lifecycle tracking
            BillingCenter API — payout processing
Hosting:    Vercel (frontend), Railway.app (backend + DB), Render.com (ML) — all free tier
```

---

## 11. Development Plan

**Phase 1 — March 4–20 (Ideation & Foundation)**
- [x] Persona research — Chennai quick commerce geography, northeast monsoon rainfall analysis
- [x] Parametric trigger design and DCS formula with weight justification
- [x] Weekly premium model with Chennai zone mapping
- [x] Real rainfall data verification — Open-Meteo archive, Vadapalani coordinates
- [x] Tech stack finalised
- [x] Worker onboarding screen 
- [x] DynamicPricer premium calculator 

**Phase 2 — March 21–April 4 (Automation & Protection)**
- [x] Registration + Aadhaar eKYC flow (UIDAI sandbox)
- [x] 5 triggers wired to Open-Meteo, OpenAQ, RSS feeds
- [x] DCS calculation engine (5-minute polling loop)
- [x] Automated claim pipeline — detect → estimate → validate → pay
- [x] Worker dashboard with live DCS gauge and Trust Score
- [x] Pre-credit morning forecast system

### Phase 3 — April 5–17 (Scale & Optimise)

- [ ] Proof of Recovery — disruption liquidity product (NBFC partnership model)
- [ ] FraudGuard — GPS spoofing detection (Isolation Forest + XGBoost)
- [ ] Razorpay test mode — real UPI simulation
- [ ] Guidewire Autopilot — full mock integration for demo
- [ ] Insurer analytics dashboard
- [ ] 5-minute demo video + pitch deck

---

## 12. Adversarial Defense & Anti-Spoofing Strategy

### The Threat

A coordinated syndicate uses GPS spoofing apps to fake 
presence inside disruption zones while at home, triggering 
mass false payouts. Simple location verification is not enough.

### Our Core Insight — Fraudsters Cannot Spoof Hunger

This defense is specific to quick commerce. Blinkit and Zepto 
workers must be actively logged into the platform and accepting 
orders to earn income. A genuine stranded worker has an order 
history that stops abruptly when disruption hits. A fraudster 
who was never riding has no order history at all.

GPS says Vadapalani. Order pings say home. FraudGuard catches 
the contradiction.

### Three-Signal Validation

**Signal 1 — Platform activity trace (primary)**
Every claim is cross-referenced against the worker's order 
ping history in the 60 minutes before the disruption event. 
Genuine workers show active pings that suddenly elongate as 
roads flood. Fraudsters show zero pre-disruption activity — 
they logged in only when the weather alert fired. No 
pre-disruption activity = automatic hold. This signal alone 
eliminates the majority of spoofing attempts.

**Signal 2 — Accelerometer-GPS contradiction**
A phone on a scooter in heavy rain produces characteristic 
vibration signatures. A phone on a table at home does not. 
GPS spoofing apps cannot simultaneously manipulate 
accelerometer and gyroscope outputs. Any GPS-accelerometer 
contradiction flags the claim immediately.

**Signal 3 — Coordinated ring temporal signature**
Organic disruption claims spread gradually over 30–45 minutes 
as workers individually reach shelter. Coordinated syndicate 
claims cluster within minutes of each other — a temporal 
pattern that Isolation Forest detects as anomalous. The 
larger the syndicate, the stronger the signal.

### Why This Is Economically Self-Defeating

A syndicate must coordinate GPS spoofing, fake accelerometer 
patterns, and stagger claim timing simultaneously across 
multiple devices. The operational cost of defeating three 
independent signals exceeds the ₹200–400 payout per attempt. 
Fraud becomes economically irrational before it becomes 
technically impossible.

### Protecting Honest Workers

FraudGuard never hard-blocks. It holds and re-evaluates.

| Fraud Risk Score | Action |
|---|---|
| 0.00–0.25 | Auto-approve |
| 0.25–0.60 | Approve with enhanced logging |
| 0.60–0.80 | 10-minute observation hold |
| 0.80–1.00 | Manual review, worker notified immediately |

**Network drop grace period** — GPS loss during heavy rain 
triggers a 15-minute hold using last known zone location, 
not a block. Genuine workers are not penalised for bad weather 
degrading their signal.

**Trust Score shield** — workers above score 80 receive 
automatic benefit of the doubt on ambiguous signals. 
A worker with 18 months of honest history is not blocked 
by a single anomalous reading.

## 13. References

1. NITI Aayog (2022). *India's Booming Gig and Platform Economy.* https://www.niti.gov.in/sites/default/files/2022-06/25th_June_Final_Report_27062022.pdf
2. ILO (2021). *World Employment and Social Outlook: The Role of Digital Labour Platforms in Transforming the World of Work.* https://www.ilo.org/publications/flagship-reports/role-digital-labour-platforms-transforming-world-work
3. Open-Meteo Archive API (2024–25). *Hourly Precipitation — Vadapalani, Chennai (13.05°N, 80.21°E).* https://archive-api.open-meteo.com
4. Central Pollution Control Board (2024). *National Real-Time Air Quality Index.* https://cpcb.nic.in
5. OpenAQ (2024). *Open Air Quality Data Platform.* https://openaq.org
6. Open-Meteo (2024). *Free Weather API Documentation.* https://open-meteo.com/en/docs
7. Indian Express (2024). *Blinkit delivery agent reveals he earns ₹763 after delivering 28 orders in 15 hours.* https://indianexpress.com/article/trending/trending-in-india/blinkit-delivery-agent-reveals-he-earns-rs-763-after-delivering-28-orders-in-15-hours-video-sparks-backlash-10420867/

---

## Quick Start

```bash
git clone https://github.com/Jenni006/pulsepay
cd pulsepay

cd frontend && npm install && npm run dev
cd ../backend && npm install && npm run dev
cd ../ml-service && pip install -r requirements.txt && uvicorn main:app --reload

cp .env.example .env
# Open-Meteo and RSS feeds need no API key
# Add: OPENAQ_KEY, RAZORPAY_TEST_KEY, UIDAI_SANDBOX_KEY
```

---

*Git Set Go — SRM Institute of Science and Technology | Guidewire DEVTrails 2026*  
*Built for the people who deliver everything, through everything.*
