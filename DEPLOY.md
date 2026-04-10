# Deploy Instructions — HireIntel · SNTL 84

## Step 1: Create GitHub Repo ✅ (already done)
Repo: https://github.com/SNTL84/ai-hiring-intel

## Step 2: Deploy to Vercel

Option A — One-Click:
https://vercel.com/new/clone?repository-url=https://github.com/SNTL84/ai-hiring-intel

Option B — CLI:
```bash
npx vercel --prod
```

Option C — Dashboard:
1. Go to https://vercel.com/new
2. Import GitHub repo: SNTL84/ai-hiring-intel
3. Framework Preset: Other
4. Root Directory: ./

## Step 3: Add API Key

In Vercel Dashboard → Project → Settings → Environment Variables:
```
Name:  ANTHROPIC_API_KEY
Value: sk-ant-xxxxxxxxxxxxx
```
Redeploy after adding.

## Done!
Your live URL: https://ai-hiring-intel.vercel.app

---
Built by Milan · SNTL 84 · https://desidevloper.com