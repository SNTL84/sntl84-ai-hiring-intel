# HireIntel — AI Hiring Intelligence System

> **I Automate What's Costing You Money.**
> **Milan · SNTL 84 · AI Workflow Developer · Surat, India**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/SNTL84/ai-hiring-intel)

---

## What Is This?

HireIntel is a no-fluff, business-grade AI resume screening tool.

Paste a resume. Get a hiring decision in 3 seconds.

No participation trophies. No "great communication skills" nonsense.  
Just a strict score, matched/missing skills, strengths, risks, and a verdict.

**Decisions:** `REJECT` (0–40) · `CONSIDER` (41–70) · `SHORTLIST` (71–100)

---

## Live Demo

🔗 [ai-hiring-intel.vercel.app](https://ai-hiring-intel.vercel.app) _(deploy to activate)_

---

## Stack

| Layer | Tech |
|-------|------|
| Frontend | Vanilla HTML/CSS/JS (zero dependencies) |
| API | Vercel Serverless Functions (Node.js) |
| AI Engine | Anthropic Claude Haiku (fast + cost-efficient) |
| Deploy | Vercel Free Plan |

---

## Setup in 3 Steps

### 1. Clone
```bash
git clone https://github.com/SNTL84/ai-hiring-intel.git
cd ai-hiring-intel
```

### 2. Set Environment Variable
In Vercel dashboard → Settings → Environment Variables:
```
ANTHROPIC_API_KEY=sk-ant-xxxxx
```

### 3. Deploy
```bash
npx vercel --prod
```

---

## API

### `POST /api/evaluate`
**Request:**
```json
{ "resume": "Full resume text...", "role": "Senior Backend Engineer" }
```
**Response:**
```json
{
  "score": 82,
  "matched_skills": ["Node.js", "PostgreSQL", "AWS"],
  "missing_skills": ["Kubernetes", "TypeScript"],
  "strengths": ["Measurable latency reduction", "Led team of 4"],
  "risks": ["No recent system design at scale"],
  "decision": "shortlist"
}
```

---

## Credit Protection
- Uses **Claude Haiku** (cheapest model, ~$0.001/eval)
- `max_tokens: 800` — strict cap
- Input sanitized: min 50 chars, max ~8000 chars
- No streaming, single call per evaluation

---

## Built By

```
Milan · SNTL 84
AI Workflow Developer · Surat, India
AI Systems | Full-Stack Builds | Supply Chain Business Intelligence
Built for founders who move fast and waste nothing.
```

🚀 **Hire Me:**
- 🌐 Website: [desidevloper.com](https://desidevloper.com/)
- 💬 WhatsApp: [+91 97274 13309](https://wa.me/919727413309)
- 🔗 LinkedIn: [sntl2784](https://www.linkedin.com/in/sntl2784)
- 💻 GitHub: [SNTL84](https://github.com/SNTL84)

---

## License

MIT — Open source. Fork it. Ship it. Give credit if you're cool.