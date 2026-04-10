// api/evaluate.js — SNTL 84 · HireIntel
// Vercel Serverless Function (Node.js)
// Built by Milan · SNTL 84 · https://desidevloper.com

const MASTER_PROMPT = `You are a hiring intelligence system.

Your job is to evaluate candidates like a strict, experienced recruiter focused on business outcomes, not buzzwords.

INPUT: Resume text + optional job role

OUTPUT (JSON ONLY):
{
  "score": number (0-100),
  "matched_skills": [],
  "missing_skills": [],
  "strengths": [],
  "risks": [],
  "decision": "reject" | "consider" | "shortlist"
}

EVALUATION RULES:
- Be strict and realistic, not optimistic
- Penalize vague or generic resumes
- Reward measurable achievements and real projects
- Prioritize impact over tools
- Detect fluff and reduce score accordingly
- Identify actual business value signals

SCORING LOGIC:
- Strong skill match → +20 to +40
- Real project experience → +15 to +30
- Measurable results (metrics) → +20
- Missing core skills → -20 each
- Buzzword-heavy resume → -10 to -30
- No real experience → cap score at 40

DECISION LOGIC:
- 0–40 → reject
- 41–70 → consider
- 71–100 → shortlist

OUTPUT RULES:
- Return ONLY valid JSON — no markdown, no code fences, no extra text
- Keep insights sharp and concise (max 6 items per array)
- Avoid generic phrases like "good communication skills"

TONE: Analytical. Direct. No fluff. Business-focused.

GOAL: Help companies avoid bad hires and identify high-impact candidates fast.`;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { resume, role } = req.body || {};
  if (!resume || typeof resume !== 'string' || resume.trim().length < 50) {
    return res.status(400).json({ error: 'Resume text is required (min 50 chars)' });
  }

  const userPrompt = role
    ? `JOB ROLE: ${role.trim()}\n\nRESUME:\n${resume.trim()}`
    : `RESUME:\n${resume.trim()}`;

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'API key not configured' });

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 800,
        system: MASTER_PROMPT,
        messages: [{ role: 'user', content: userPrompt }]
      })
    });
    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      return res.status(502).json({ error: 'Evaluation service unavailable. Try again.' });
    }
    const data = await response.json();
    const rawText = data?.content?.[0]?.text || '';
    const cleaned = rawText.replace(/```json|```/g, '').trim();
    let parsed;
    try { parsed = JSON.parse(cleaned); }
    catch { return res.status(502).json({ error: 'Could not parse evaluation result. Please retry.' }); }
    const result = {
      score: Math.min(100, Math.max(0, Number(parsed.score) || 0)),
      matched_skills: Array.isArray(parsed.matched_skills) ? parsed.matched_skills.slice(0, 8) : [],
      missing_skills: Array.isArray(parsed.missing_skills) ? parsed.missing_skills.slice(0, 8) : [],
      strengths: Array.isArray(parsed.strengths) ? parsed.strengths.slice(0, 6) : [],
      risks: Array.isArray(parsed.risks) ? parsed.risks.slice(0, 6) : [],
      decision: ['reject', 'consider', 'shortlist'].includes(parsed.decision) ? parsed.decision : 'consider'
    };
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' });
  }
}