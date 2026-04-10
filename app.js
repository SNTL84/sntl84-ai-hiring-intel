// === HireIntel · SNTL 84 · app.js ===
// Built by Milan · SNTL 84 · https://desidevloper.com

const EXAMPLE_PRESETS = {
  overqualified: {
    role: "Senior Backend Engineer",
    resume: `John Kapoor\nSenior Backend Engineer | 10 Years Experience\njohn.kapoor@email.com | github.com/jkapoor | Mumbai, India\n\nEXPERIENCE\n\nTechFinance Ltd – Staff Engineer (2020–Present)\n• Led 4-person infrastructure team; migrated monolith to microservices (reduced deployment time from 45min → 6min)\n• Designed event-driven payment processing pipeline handling ₹2.3Cr/day with 99.98% uptime\n• Reduced P99 API latency from 800ms to 140ms via Redis caching + query optimization\n• Mentored 3 junior engineers; 2 promoted within 18 months\n\nClearPay Fintech – Backend Developer (2018–2020)\n• Built reconciliation engine processing 400K transactions/day with <0.01% error rate\n• Implemented RBAC auth system; passed PCI-DSS audit on first attempt\n\nDataStack Inc – Software Engineer (2014–2018)\n• Developed ETL pipelines for 12 enterprise clients\n• Reduced data processing cost by 38% via pipeline optimization\n\nSKILLS\nGo, Python, Node.js, PostgreSQL, Redis, Kafka, Docker, Kubernetes, AWS (ECS, RDS, SQS), REST, gRPC, CI/CD\n\nEDUCATION\nB.E. Computer Engineering – VJTI Mumbai, 2014`
  },
  buzzword: {
    role: "Marketing Manager",
    resume: `Priya Sharma\nResults-Driven Marketing Professional\npriya.sharma@email.com | LinkedIn | Bangalore, India\n\nPROFESSIONAL SUMMARY\nPassionate, results-oriented marketing synergist with a proven track record of leveraging omnichannel strategies to create impactful brand narratives. Dynamic team player who excels at thought leadership and stakeholder engagement in fast-paced, agile environments.\n\nEXPERIENCE\n\nBrand Solutions Co – Marketing Manager (2021–Present)\n• Spearheaded transformative go-to-market strategies using innovative frameworks\n• Collaborated cross-functionally to deliver best-in-class customer journeys\n• Utilized data-driven insights to optimize brand positioning across touchpoints\n• Championed digital transformation initiatives with a customer-centric mindset\n\nDigital Agency X – Marketing Executive (2019–2021)\n• Managed social media presence with compelling content strategies\n• Coordinated with stakeholders to align messaging with brand DNA\n• Supported campaign execution across multiple platforms\n\nSKILLS\nMarketing Strategy, Brand Management, Stakeholder Communication, Team Collaboration, MS Office, Social Media, Creative Thinking, Leadership\n\nEDUCATION\nMBA Marketing – Generic Business School, 2019`
  },
  junior: {
    role: "Full Stack Developer",
    resume: `Arjun Patel\nFull Stack Developer | 2 Years\narjun.patel@email.com | github.com/arjunpatel | Surat, India\n\nEXPERIENCE\n\nFreelance Developer (2022–Present)\n• Built e-commerce platform for local textile business (React + Node.js + PostgreSQL); 800+ active users\n• Developed inventory management tool for 3 SME clients; saved ~6hrs/week manual work per client\n• Deployed all projects on AWS EC2 with basic CI/CD via GitHub Actions\n\nWebtech Solutions – Junior Developer (2023–2024, Internship)\n• Maintained Laravel-based CRM for 40+ clients\n• Fixed 60+ production bugs; improved page load time by 22% via image optimization\n\nPROJECTS\n• SplitRight – expense splitting app, 200+ downloads on Play Store\n• PriceAlert – price tracker Chrome extension, 150 users\n\nSKILLS\nReact, Node.js, JavaScript, PostgreSQL, MySQL, PHP/Laravel, Docker (basic), AWS (basic), Git\n\nGAPS\n• No team leadership experience\n• Limited TypeScript knowledge\n• No system design experience at scale\n\nEDUCATION\nB.Sc. Computer Science – Veer Narmad South Gujarat University, 2022`
  }
};

let lastRawResult = null;
const $ = id => document.getElementById(id);
const show = id => $(id).classList.remove('hidden');
const hide = id => $(id).classList.add('hidden');

$('resumeText').addEventListener('input', () => {
  const len = $('resumeText').value.length;
  $('charCount').textContent = `${len.toLocaleString()} characters`;
});

function loadExample() { loadPreset('junior'); }

function loadPreset(key) {
  const p = EXAMPLE_PRESETS[key];
  if (!p) return;
  $('jobRole').value = p.role;
  $('resumeText').value = p.resume;
  $('resumeText').dispatchEvent(new Event('input'));
  document.querySelector('.app-container').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function resetForm() {
  hide('resultState'); hide('errorState'); show('emptyState'); hide('loadingState');
  $('analyzeBtn').disabled = false;
  lastRawResult = null;
}

function copyResult() {
  if (!lastRawResult) return;
  navigator.clipboard.writeText(JSON.stringify(lastRawResult, null, 2))
    .then(() => {
      const btn = document.querySelector('.result-footer .btn-ghost:last-child');
      if (btn) { btn.textContent = 'Copied!'; setTimeout(() => { btn.textContent = 'Copy JSON'; }, 2000); }
    });
}

function animateRing(score) {
  const circumference = 2 * Math.PI * 52;
  const offset = circumference - (score / 100) * circumference;
  const ring = $('ringFill');
  ring.style.strokeDasharray = circumference;
  if (score >= 71) ring.style.stroke = 'var(--green)';
  else if (score >= 41) ring.style.stroke = 'var(--orange)';
  else ring.style.stroke = 'var(--red)';
  setTimeout(() => { ring.style.strokeDashoffset = offset; }, 50);
}

function renderResult(data) {
  lastRawResult = data;
  $('scoreNum').textContent = data.score;
  animateRing(data.score);
  const dec = (data.decision || '').toLowerCase();
  const badge = $('decisionBadge');
  const icons = { shortlist: '▲', consider: '◆', reject: '✗' };
  badge.className = `decision-badge ${dec}`;
  $('decisionIcon').textContent = icons[dec] || '◆';
  $('decisionText').textContent = dec.toUpperCase();
  $('resultMeta').innerHTML = `Score: ${data.score}/100<br>Decision: ${dec}`;
  $('matchedSkills').innerHTML = (data.matched_skills || []).map(s => `<span class="skill-tag">${s}</span>`).join('') || '—';
  $('missingSkills').innerHTML = (data.missing_skills || []).map(s => `<span class="skill-tag missing">${s}</span>`).join('') || 'None critical';
  $('strengthsList').innerHTML = (data.strengths || []).map(s => `<li>${s}</li>`).join('');
  $('risksList').innerHTML = (data.risks || []).map(s => `<li>${s}</li>`).join('');
  hide('loadingState'); hide('emptyState'); hide('errorState');
  show('resultState');
}

async function analyzeResume() {
  const resume = $('resumeText').value.trim();
  const role = $('jobRole').value.trim();
  if (resume.length < 50) {
    alert('Please paste a resume (minimum 50 characters).');
    return;
  }
  hide('emptyState'); hide('resultState'); hide('errorState');
  show('loadingState');
  $('analyzeBtn').disabled = true;
  try {
    const res = await fetch('/api/evaluate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ resume, role })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Evaluation failed');
    renderResult(data);
  } catch (err) {
    hide('loadingState');
    $('errorMsg').textContent = err.message || 'Something went wrong. Please try again.';
    show('errorState');
    $('analyzeBtn').disabled = false;
  }
}