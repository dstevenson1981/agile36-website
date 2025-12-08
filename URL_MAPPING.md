# URL Mapping - Old to New Structure

This document shows how your old URLs map to the new structure.

## 🔄 Automatic Redirects (301 Permanent)

All redirects are configured in `next.config.ts` and will automatically redirect visitors and preserve SEO.

| Old URL (agile36.com) | New URL | Status |
|----------------------|---------|--------|
| `/safe-agilist-leading-safe` | `/courses/leading-safe` | ✅ Active |
| `/safe-product-owner-product-manager-course` | `/courses/product-owner-manager` | ✅ Active |
| `/safe-lean-portfolio-management-course` | `/courses/lean-portfolio-management` | ✅ Active |
| `/safe-scrum-master-course` | `/courses/scrum-master` | ✅ Active |
| `/safe-for-teams-course` | `/courses/safe-for-teams` | ✅ Active |
| `/safe-responsible-ai-course` | `/courses/responsible-ai` | ✅ Active |
| `/safe-devops-certification-training` | `/courses/devops` | ✅ Active |
| `/safe-advanced-scrum-master-certification-course` | `/courses/advanced-scrum-master` | ✅ Active |
| `/safe-release-train-engineer-rte-certification-training` | `/release-train-engineer-certification-training` | ✅ Active |
| `/safe-value-stream-mapping-microcredential-course` | `/courses/value-stream-mapping` | ✅ Active |
| `/certified-ai-product-manager-pmai` | `/courses/certified-ai-product-manager` | ✅ Active |
| `/certified-genai-practitioner` | `/courses/certified-genai-practitioner` | ✅ Active |

## 📍 Additional Convenience Redirects

These redirects ensure consistency across the site:

| Short URL | Full URL | Status |
|-----------|----------|--------|
| `/ai-driven-scrum-master` | `/courses/ai-driven-scrum-master` | ✅ Active |
| `/executive-genai-leadership` | `/courses/executive-genai-leadership` | ✅ Active |
| `/generative-ai-project-managers` | `/courses/generative-ai-project-managers` | ✅ Active |
| `/ai-agent-builder` | `/courses/ai-agent-builder` | ✅ Active |
| `/agile-product-management` | `/courses/agile-product-management` | ✅ Active |
| `/pmp-certification` | `/courses/pmp-certification` | ✅ Active |

## 🌐 Domain Structure

**Primary Domain**: `www.agile36.com`

**Naked Domain**: `agile36.com` (redirects to www)

## 🔗 Full URL Examples

### SAFe Courses:
- `https://www.agile36.com/courses/leading-safe`
- `https://www.agile36.com/courses/product-owner-manager`
- `https://www.agile36.com/courses/lean-portfolio-management`
- `https://www.agile36.com/courses/scrum-master`
- `https://www.agile36.com/courses/advanced-scrum-master`
- `https://www.agile36.com/courses/safe-for-teams`
- `https://www.agile36.com/courses/devops`
- `https://www.agile36.com/courses/responsible-ai`
- `https://www.agile36.com/courses/value-stream-mapping`
- `https://www.agile36.com/release-train-engineer-certification-training`

### Generative AI Courses:
- `https://www.agile36.com/courses/certified-genai-practitioner`
- `https://www.agile36.com/courses/ai-driven-scrum-master`
- `https://www.agile36.com/courses/executive-genai-leadership`
- `https://www.agile36.com/courses/generative-ai-project-managers`

### AI Product Courses:
- `https://www.agile36.com/courses/certified-ai-product-manager`
- `https://www.agile36.com/courses/ai-agent-builder`

### Other Courses:
- `https://www.agile36.com/courses/agile-product-management`
- `https://www.agile36.com/courses/pmp-certification`

### Other Pages:
- `https://www.agile36.com/` (Homepage)
- `https://www.agile36.com/corporate` (Corporate Training)
- `https://www.agile36.com/contact` (Contact Us)
- `https://www.agile36.com/blog` (Coming Soon)

## 📊 SEO Benefits

**301 Permanent Redirects** tell search engines:
- ✅ Content has permanently moved
- ✅ Transfer all SEO value (PageRank, backlinks)
- ✅ Update search results to show new URLs
- ✅ No duplicate content penalties

## 🧪 Testing Redirects

After deployment, test redirects with:

```bash
# Test a redirect (should return 308 or 301)
curl -I https://www.agile36.com/safe-agilist-leading-safe

# Expected response:
HTTP/2 308
location: https://www.agile36.com/courses/leading-safe
```

Or simply visit old URLs in your browser - they should automatically redirect to the new structure.

## 📝 Notes

- All redirects are **permanent (301/308)** for SEO purposes
- Redirects happen server-side (no client-side delay)
- Works for all pages, schedule pages, and checkout flows
- Old URLs in emails, bookmarks, and external links will continue to work




