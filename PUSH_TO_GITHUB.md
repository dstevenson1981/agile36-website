# 🚀 Push Your Code to GitHub - SIMPLE STEPS

Your code is now ready! Follow these steps:

---

## Step 1: Create a GitHub Repository (2 minutes)

1. **Go to GitHub**: [github.com/new](https://github.com/new)
   
2. **Fill in the details**:
   - **Repository name**: `agile36-website`
   - **Description**: "Agile36 - Enterprise Agile & AI Training Platform"
   - **Public** or **Private**: Choose what you prefer
   - **⚠️ IMPORTANT**: Do NOT check any boxes (no README, no .gitignore, no license)
   
3. **Click** "Create repository"

---

## Step 2: Copy Your Repository URL

After creating the repository, GitHub will show you a page with commands.

**Look for your repository URL**. It will look like:
```
https://github.com/YOUR_USERNAME/agile36-website.git
```

Copy this URL!

---

## Step 3: Run These Commands in Terminal

Open Terminal and run these commands **one at a time**:

### Connect to GitHub:
```bash
cd "/Users/deadrastevenson/Desktop/Agile Redesign/agile36-site"

git remote add origin https://github.com/YOUR_USERNAME/agile36-website.git
```
**⚠️ Replace `YOUR_USERNAME` with your actual GitHub username!**

### Push to GitHub:
```bash
git branch -M main

git push -u origin main
```

### Enter Your Credentials:
- **Username**: Your GitHub username
- **Password**: Use a **Personal Access Token** (not your password!)

---

## Step 4: Create Personal Access Token (If Needed)

If you don't have a token:

1. Go to [github.com/settings/tokens](https://github.com/settings/tokens)
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. **Name it**: "Agile36 Website"
4. **Select scopes**: Check **"repo"** (full control)
5. Click **"Generate token"**
6. **Copy the token** (you won't see it again!)
7. Use this token as your password when pushing

---

## ✅ Done!

Your code is now on GitHub! 🎉

**Next Steps:**

### Option A: Deploy to Vercel (Recommended)
1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click **"Add New Project"**
4. Click **"Import"** next to `agile36-website`
5. Follow `DEPLOYMENT_QUICK_START.md`

### Option B: Keep Working Locally
Whenever you make changes:
```bash
git add .
git commit -m "Description of changes"
git push
```

---

## 🚨 Troubleshooting

### "Permission denied" error?
- Make sure you're using a Personal Access Token (not password)
- Check the token has "repo" permissions

### "Remote already exists" error?
```bash
git remote remove origin
git remote add origin YOUR_GITHUB_URL
```

### Wrong username in URL?
```bash
git remote set-url origin https://github.com/CORRECT_USERNAME/agile36-website.git
```

---

## Quick Reference

### Check what's changed:
```bash
git status
```

### Save changes:
```bash
git add .
git commit -m "Your message"
git push
```

### See your commits:
```bash
git log
```

---

**Your repository will be at**:
```
https://github.com/YOUR_USERNAME/agile36-website
```

🎉 **You're all set!**







