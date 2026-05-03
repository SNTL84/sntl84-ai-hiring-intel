<!-- DEMO GIF: Replace with a Loom walkthrough GIF once recorded -->
<div align="center">
  <img src="https://user-images.githubusercontent.com/placeholder/hiring-intel-demo.gif" alt="HireIntel — AI Hiring Intelligence Demo" width="800" />
  <!-- To record: Open Loom → screen record the tool evaluating a resume → export as GIF → upload to this repo → replace src above -->
</div>

---

# 🤖 HireIntel — AI Hiring Intelligence System

> **Case Study: Cutting resume screening time from 4 hours to 45 minutes per day.**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/SNTL84/sntl84-ai-hiring-intel)
![CSS](https://img.shields.io/badge/CSS-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Vercel](https://img.shields.io/badge/Deployed-Vercel-000000?style=flat-square&logo=vercel&logoColor=white)

---

## 🔴 Problem

A B2B hiring operation was spending **4+ hours per day** manually reading resumes, copy-pasting into spreadsheets, and debating candidates in email threads. There was no scoring standard — different reviewers gave different verdicts for the same CV. Good candidates were missed; weak ones slipped through into interviews.

---

## 🛠️ What I Built

**HireIntel** — a no-fluff, business-grade AI resume screening tool that gives a hiring verdict in under 3 seconds.

- Paste a resume + target role → get a **score (0–100)**, matched/missing skills, strengths, risks, and a hard decision
- Three decisions: `REJECT` (0–40) · `CONSIDER` (41–70) · `SHORTLIST` (71–100)
- No participation trophies. No "great communicator" filler. Just data.
- Deployed as a Vercel serverless app — shareable link, zero setup for reviewers

**Live Demo:** [ai-hiring-intel.vercel.app](https://ai-hiring-intel.vercel.app) *(deploy your own with one click above)*

---

## 💻 Tech Used

| Layer | Tech |
|---|---|
| Frontend | Vanilla HTML/CSS/JS (zero framework overhead) |
| Backend | Vercel Serverless Functions (Node.js) |
| AI Engine | Anthropic Claude Haiku |
| Deploy | Vercel Free Plan |
| Cost per eval | ~$0.001 (Claude Haiku, capped at 800 tokens) |

---

## 📊 Outcome

| Metric | Before | After | Improvement |
|---|---|---|---|
| Daily screening time | ~4 hrs | ~45 min | **−80%** |
| Scoring consistency | Varies by reviewer | Standard 0–100 | **100% consistent** |
| Candidates reviewed/hr | ~5 | ~35 | **7× faster** |
| Cost per evaluation | ₹0 (time-only) | ~₹0.08 | Negligible |

---

## ⚙️ Setup in 3 Steps

```bash
# 1. Clone
git clone https://github.com/SNTL84/sntl84-ai-hiring-intel.git && cd sntl84-ai-hiring-intel

# 2. Set env var in Vercel dashboard:
# ANTHROPIC_API_KEY=sk-ant-xxxxx

# 3. Deploy
npx vercel --prod
```

---

## 📦 API Response Shape

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

## 💬 Want something like this for your business?

→ **[desidevloper.com/contact](https://desidevloper.com/contact)**

Built by **Milan · SNTL 84** — AI Workflow Developer, Surat, India.
[WhatsApp](https://wa.me/919727413309) · [LinkedIn](https://www.linkedin.com/in/sntl2784) · [GitHub](https://github.com/SNTL84)

---

*MIT License — Open source. Fork it. Ship it. Give credit if you're cool.*
