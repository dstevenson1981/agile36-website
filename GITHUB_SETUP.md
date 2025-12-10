# 🔧 GitHub Setup Guide

Follow these steps to save your code to GitHub and deploy to Vercel.

---

## Option 1: Using GitHub Desktop (Easiest)

### Step 1: Download GitHub Desktop
1. Go to [desktop.github.com](https://desktop.github.com)
2. Download and install for Mac

### Step 2: Create Repository
1. Open GitHub Desktop
2. Click **"Add"** → **"Add Existing Repository"**
3. Choose the `agile36-site` folder
4. Click **"Create Repository"**

### Step 3: Publish to GitHub
1. Click **"Publish repository"**
2. Name it: `agile36-website`
3. Uncheck **"Keep this code private"** (or keep checked if you want it private)
4. Click **"Publish repository"**

### Step 4: Done!
✅ Your code is now on GitHub
✅ You can now connect it to Vercel

---

## Option 2: Using Terminal (Advanced)

### Step 1: Create .gitignore file
Already created for you! ✅

### Step 2: Initialize Git
```bash
cd "/Users/deadrastevenson/Desktop/Agile Redesign/agile36-site"
git init
git add .
git commit -m "Initial commit - Agile36 website ready for production"
```

### Step 3: Create GitHub Repository
1. Go to [github.com/new](https://github.com/new)
2. Repository name: `agile36-website`
3. Description: "Agile36 - Enterprise Agile & AI Training Platform"
4. Choose Public or Private
5. **DO NOT** initialize with README (we already have files)
6. Click **"Create repository"**

### Step 4: Connect and Push
After creating the repo, GitHub will show you commands. Use these:

```bash
git remote add origin https://github.com/YOUR_USERNAME/agile36-website.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

---

## Option 3: Using VS Code (If you use VS Code)

### Step 1: Open Folder in VS Code
1. Open VS Code
2. File → Open Folder
3. Select `agile36-site` folder

### Step 2: Initialize Git
1. Click the **Source Control** icon (left sidebar)
2. Click **"Initialize Repository"**
3. Click **"Publish to GitHub"**
4. Choose repository name: `agile36-website`
5. Choose Public or Private
6. Click **"Publish"**

### Step 3: Done!
✅ Code is on GitHub

---

## After Code is on GitHub

### Deploy to Vercel:
1. Go to [vercel.com](https://vercel.com)
2. Click **"Add New Project"**
3. Click **"Import Git Repository"**
4. Select your `agile36-website` repo
5. Click **"Deploy"**

**Benefits:**
- ✅ Automatic deployments on every push
- ✅ Preview deployments for testing
- ✅ Easy rollback if needed
- ✅ Version control

---

## Files That Will NOT Be Saved (Ignored)

The `.gitignore` file prevents these from being uploaded:

- ❌ `node_modules/` (dependencies)
- ❌ `.next/` (build files)
- ❌ `.env` files (sensitive keys)
- ❌ `.DS_Store` (Mac system files)

This is **good** - these files shouldn't be in version control!

---

## 🚨 Important: Environment Variables

**DO NOT** commit `.env.local` or any files with API keys!

Your sensitive keys should **only** be in:
- ✅ Vercel Environment Variables (production)
- ✅ Local `.env.local` file (NOT committed to Git)

---

## Recommended: Option 1 (GitHub Desktop)

**Easiest for beginners:**
- ✅ Visual interface
- ✅ No terminal commands
- ✅ Easy to understand
- ✅ Free

---

## Need Help?

### GitHub Help:
- [GitHub Desktop Tutorial](https://docs.github.com/en/desktop)
- [Git Basics](https://git-scm.com/book/en/v2/Getting-Started-Git-Basics)

### Vercel Integration:
- [Import from GitHub](https://vercel.com/docs/concepts/git/vercel-for-github)

---

**Choose the option that works best for you and follow the steps!**







