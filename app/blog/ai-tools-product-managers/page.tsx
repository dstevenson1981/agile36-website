import Image from "next/image";
import Link from "next/link";

export default function AIToolsProductManagersBlogPost() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header Image */}
      <div className="w-full h-64 bg-[#01203d] relative flex items-center justify-center overflow-hidden">
        {/* Decorative golden dots - top left */}
        <div className="absolute top-4 left-4 flex flex-col gap-1">
          <div className="flex gap-1">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
            ))}
          </div>
          <div className="flex gap-1">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
            ))}
          </div>
        </div>
        {/* Decorative golden dots - bottom right */}
        <div className="absolute bottom-4 right-4 flex flex-col gap-1">
          <div className="flex gap-1">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
            ))}
          </div>
          <div className="flex gap-1">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
            ))}
          </div>
        </div>
        {/* Title */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center px-8 relative z-10">
          Top AI Tools Every Product Manager Should Know in 2025
        </h1>
      </div>

      {/* Blog Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8 text-sm text-gray-600">
          <Link href="/" className="hover:text-[#01203d]">Home</Link>
          <span>/</span>
          <Link href="/#blog" className="hover:text-[#01203d]">Blog</Link>
          <span>/</span>
          <span>AI Tools for Product Managers</span>
        </div>

        {/* Category and Date */}
        <div className="flex items-center justify-between mb-6">
          <span className="bg-[#fa4a23] text-white text-sm font-semibold px-4 py-1 rounded-full">AI</span>
          <span className="text-sm text-[#718aa5]">Latest</span>
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-700 mb-6">
            Product management has fundamentally changed. The PMs winning in 2025 aren't just using AI tools—they're leveraging AI across the entire product lifecycle to move faster, make better decisions, and deliver more value than competitors.
          </p>

          <p className="text-lg text-gray-700 mb-6">
            If you're still managing products the 2023 way, you're already behind.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-10 mb-4">Why Product Managers Need AI Tools Now</h2>
          <p className="text-lg text-gray-700 mb-4">
            <strong>Speed has become table stakes.</strong> Markets move faster. Customer expectations evolve constantly. AI tools let you analyze thousands of user comments in minutes instead of weeks, generate testable prototypes in hours instead of days, and validate hypotheses at scale that were previously impossible.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            <strong>Data volume exceeds human capacity.</strong> Modern PMs have access to more customer data, market intelligence, and product metrics than any human can process manually. AI tools turn this data deluge into actionable insights.
          </p>
          <p className="text-lg text-gray-700 mb-8">
            <strong>Competitive pressure is intensifying.</strong> Your competitors are using AI. If you're not, you're operating with a significant disadvantage in speed, insight quality, and execution efficiency.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-10 mb-4">AI Tools for Product Discovery and Research</h2>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-3">Dovetail - User Interview Analysis</h3>
          <p className="text-lg text-gray-700 mb-2">
            <strong>What it does:</strong> Transcribes and analyzes user interviews automatically, identifying themes, pain points, and patterns across dozens of conversations.
          </p>
          <p className="text-lg text-gray-700 mb-2">
            <strong>Why PMs love it:</strong> Get instant pattern recognition across your entire research library. Ask "What are the top onboarding frustrations?" and get synthesized answers with supporting quotes.
          </p>
          <p className="text-lg text-gray-700 mb-6">
            <strong>Price:</strong> Starting at $29/month
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-3">Monterey AI - Customer Feedback Analysis</h3>
          <p className="text-lg text-gray-700 mb-2">
            <strong>What it does:</strong> Aggregates feedback from support tickets, reviews, surveys, and social media, then uses AI to categorize, prioritize, and surface actionable insights.
          </p>
          <p className="text-lg text-gray-700 mb-2">
            <strong>Why PMs love it:</strong> Single source of truth for "what are customers actually saying?" Automatically identifies emerging issues before they become crises.
          </p>
          <p className="text-lg text-gray-700 mb-6">
            <strong>Price:</strong> Custom pricing
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-3">AlphaSense - Market Intelligence</h3>
          <p className="text-lg text-gray-700 mb-2">
            <strong>What it does:</strong> Uses AI to search millions of business documents, earnings calls, and research reports to surface competitive intelligence and market trends.
          </p>
          <p className="text-lg text-gray-700 mb-2">
            <strong>Why PMs love it:</strong> Competitive research that used to take hours now takes minutes.
          </p>
          <p className="text-lg text-gray-700 mb-8">
            <strong>Price:</strong> Enterprise pricing (typically $10K+/year)
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-10 mb-4">AI Tools for Product Strategy and Prioritization</h2>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-3">ChatGPT Plus / Claude Pro - Strategic Analysis</h3>
          <p className="text-lg text-gray-700 mb-2">
            <strong>What it does:</strong> Advanced language models help PMs brainstorm positioning, analyze competitive landscapes, draft strategy documents, and think through complex decisions.
          </p>
          <p className="text-lg text-gray-700 mb-2">
            <strong>Why PMs love it:</strong> 24/7 strategic thinking partner for SWOT analysis, positioning options, stress-testing assumptions, and drafting PRDs faster.
          </p>
          <p className="text-lg text-gray-700 mb-2">
            <strong>Price:</strong> $20/month each
          </p>
          <p className="text-lg text-gray-700 mb-6 italic">
            <strong>Pro tip:</strong> Learn effective prompt engineering through structured training like the AI Product Manager (PMAI) or Certified AI Product Innovator certifications from Agile36 to maximize these tools' impact.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-3">Productboard - Roadmap Prioritization</h3>
          <p className="text-lg text-gray-700 mb-2">
            <strong>What it does:</strong> AI analyzes customer feedback to automatically score feature requests, identify patterns, and suggest prioritization based on customer impact.
          </p>
          <p className="text-lg text-gray-700 mb-2">
            <strong>Why PMs love it:</strong> More objective, data-driven prioritization. AI surfaces which features have the most momentum and business impact.
          </p>
          <p className="text-lg text-gray-700 mb-6">
            <strong>Price:</strong> Starting at $25/user/month
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-3">Causal - Scenario Planning</h3>
          <p className="text-lg text-gray-700 mb-2">
            <strong>What it does:</strong> AI-powered financial modeling that helps PMs forecast outcomes and understand business impact of product decisions.
          </p>
          <p className="text-lg text-gray-700 mb-2">
            <strong>Why PMs love it:</strong> Answer "What happens if we change pricing?" without complex spreadsheets.
          </p>
          <p className="text-lg text-gray-700 mb-8">
            <strong>Price:</strong> Starting at $50/user/month
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-10 mb-4">AI Tools for Product Design and Prototyping</h2>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-3">v0.dev by Vercel - UI/UX Generation</h3>
          <p className="text-lg text-gray-700 mb-2">
            <strong>What it does:</strong> Generates production-ready React components and complete interfaces from text descriptions.
          </p>
          <p className="text-lg text-gray-700 mb-2">
            <strong>Why PMs love it:</strong> Turn concepts into working prototypes in minutes. Iterate on UI at unprecedented speed.
          </p>
          <p className="text-lg text-gray-700 mb-6">
            <strong>Price:</strong> Free tier available, paid from $20/month
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-3">Galileo AI - Design Generation</h3>
          <p className="text-lg text-gray-700 mb-2">
            <strong>What it does:</strong> Generates high-fidelity UI designs from text prompts with proper layouts, typography, and visual hierarchy.
          </p>
          <p className="text-lg text-gray-700 mb-2">
            <strong>Why PMs love it:</strong> Explore design directions quickly without designer bottlenecks.
          </p>
          <p className="text-lg text-gray-700 mb-6">
            <strong>Price:</strong> Free tier available, pro from $19/month
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-3">Figma AI - Design Refinement</h3>
          <p className="text-lg text-gray-700 mb-2">
            <strong>What it does:</strong> Auto-layout suggestions, design system recommendations, content generation, and intelligent image editing.
          </p>
          <p className="text-lg text-gray-700 mb-2">
            <strong>Why PMs love it:</strong> Speeds up design collaboration and removes tedious work.
          </p>
          <p className="text-lg text-gray-700 mb-8">
            <strong>Price:</strong> Included with Figma Professional ($12/editor/month)
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-10 mb-4">AI Tools for Development and Technical Support</h2>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-3">GitHub Copilot - Code Understanding</h3>
          <p className="text-lg text-gray-700 mb-2">
            <strong>What it does:</strong> AI pair programmer that suggests code completions, generates functions, and explains code in plain English.
          </p>
          <p className="text-lg text-gray-700 mb-2">
            <strong>Why PMs love it:</strong> Understand technical discussions, review PRs effectively, and prototype simple features.
          </p>
          <p className="text-lg text-gray-700 mb-6">
            <strong>Price:</strong> $10/month individual, $19/user/month business
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-3">Cursor - Technical Documentation</h3>
          <p className="text-lg text-gray-700 mb-2">
            <strong>What it does:</strong> AI-powered code editor that reads entire codebases, answers implementation questions, and generates code from descriptions.
          </p>
          <p className="text-lg text-gray-700 mb-2">
            <strong>Why PMs love it:</strong> Ask "How does our authentication work?" in plain English and get instant, accurate answers.
          </p>
          <p className="text-lg text-gray-700 mb-6">
            <strong>Price:</strong> Free tier available, pro from $20/month
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-3">Zapier AI - API and Integration</h3>
          <p className="text-lg text-gray-700 mb-2">
            <strong>What it does:</strong> AI suggests automation workflows and connects tools without coding.
          </p>
          <p className="text-lg text-gray-700 mb-2">
            <strong>Why PMs love it:</strong> Prototype integrations quickly to validate product concepts.
          </p>
          <p className="text-lg text-gray-700 mb-8">
            <strong>Price:</strong> Free tier available, paid from $19.99/month
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-10 mb-4">AI Tools for Product Analytics and Insights</h2>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-3">Amplitude AI - Behavioral Analytics</h3>
          <p className="text-lg text-gray-700 mb-2">
            <strong>What it does:</strong> Automatically identifies significant changes in user behavior, predicts churn, and surfaces unexpected patterns.
          </p>
          <p className="text-lg text-gray-700 mb-2">
            <strong>Why PMs love it:</strong> AI surfaces anomalies, trends, and opportunities you'd miss in massive datasets.
          </p>
          <p className="text-lg text-gray-700 mb-6">
            <strong>Price:</strong> Free tier available, custom paid plans
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-3">Mixpanel - Product Analytics</h3>
          <p className="text-lg text-gray-700 mb-2">
            <strong>What it does:</strong> AI detects anomalies, predicts user actions, and recommends metrics to track.
          </p>
          <p className="text-lg text-gray-700 mb-2">
            <strong>Why PMs love it:</strong> Focus on acting on insights rather than finding them.
          </p>
          <p className="text-lg text-gray-700 mb-6">
            <strong>Price:</strong> Free tier available, paid from $20/month
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-3">Fullstory - Session Replay with AI</h3>
          <p className="text-lg text-gray-700 mb-2">
            <strong>What it does:</strong> Records user sessions and uses AI to identify rage clicks, error patterns, and frustrating experiences automatically.
          </p>
          <p className="text-lg text-gray-700 mb-2">
            <strong>Why PMs love it:</strong> Know exactly where users struggle without manually reviewing hundreds of sessions.
          </p>
          <p className="text-lg text-gray-700 mb-8">
            <strong>Price:</strong> Custom enterprise pricing
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-10 mb-4">AI Tools for Customer Communication</h2>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-3">Intercom Fin AI - Customer Support</h3>
          <p className="text-lg text-gray-700 mb-2">
            <strong>What it does:</strong> Answers customer questions automatically using help docs, provides instant support, escalates to humans when needed.
          </p>
          <p className="text-lg text-gray-700 mb-2">
            <strong>Why PMs love it:</strong> Reduces support load while improving response times.
          </p>
          <p className="text-lg text-gray-700 mb-6">
            <strong>Price:</strong> Starting at $39/month, Fin AI additional
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-3">Notion AI - Knowledge Base</h3>
          <p className="text-lg text-gray-700 mb-2">
            <strong>What it does:</strong> Helps write and organize product documentation, FAQs, and help articles with AI-assisted writing.
          </p>
          <p className="text-lg text-gray-700 mb-2">
            <strong>Why PMs love it:</strong> Create comprehensive documentation faster with consistent quality.
          </p>
          <p className="text-lg text-gray-700 mb-6">
            <strong>Price:</strong> $10/user/month added to Notion workspace
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-3">Drift Conversational AI - Chatbots</h3>
          <p className="text-lg text-gray-700 mb-2">
            <strong>What it does:</strong> AI chatbot qualifies leads, answers questions, and guides users through your product.
          </p>
          <p className="text-lg text-gray-700 mb-2">
            <strong>Why PMs love it:</strong> Engage users at the right moment with personalized guidance.
          </p>
          <p className="text-lg text-gray-700 mb-8">
            <strong>Price:</strong> Custom enterprise pricing
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-10 mb-4">AI Tools for Product Marketing</h2>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-3">Copy.ai - Content Creation</h3>
          <p className="text-lg text-gray-700 mb-2">
            <strong>What it does:</strong> Generates product descriptions, landing page copy, ad copy, and social media content.
          </p>
          <p className="text-lg text-gray-700 mb-2">
            <strong>Why PMs love it:</strong> Create launch materials without waiting for marketing resources.
          </p>
          <p className="text-lg text-gray-700 mb-6">
            <strong>Price:</strong> Free tier available, paid from $49/month
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-3">Midjourney / DALL-E 3 - Visual Content</h3>
          <p className="text-lg text-gray-700 mb-2">
            <strong>What it does:</strong> Creates product illustrations, graphics, and presentation visuals from text descriptions.
          </p>
          <p className="text-lg text-gray-700 mb-2">
            <strong>Why PMs love it:</strong> Generate professional visuals instantly without design bottlenecks.
          </p>
          <p className="text-lg text-gray-700 mb-6">
            <strong>Price:</strong> Midjourney from $10/month, DALL-E 3 included with ChatGPT Plus
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-3">Descript - Video Creation</h3>
          <p className="text-lg text-gray-700 mb-2">
            <strong>What it does:</strong> Edits video as text, removes filler words, generates captions, creates video from scripts.
          </p>
          <p className="text-lg text-gray-700 mb-2">
            <strong>Why PMs love it:</strong> Create product demos and tutorials without video editing expertise.
          </p>
          <p className="text-lg text-gray-700 mb-8">
            <strong>Price:</strong> Free tier available, paid from $12/month
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-10 mb-4">AI Tools for Productivity</h2>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-3">Otter.ai - Meeting Intelligence</h3>
          <p className="text-lg text-gray-700 mb-2">
            <strong>What it does:</strong> Transcribes meetings in real-time, generates summaries, identifies action items, makes meetings searchable.
          </p>
          <p className="text-lg text-gray-700 mb-2">
            <strong>Why PMs love it:</strong> Never miss details from stakeholder meetings or user interviews.
          </p>
          <p className="text-lg text-gray-700 mb-6">
            <strong>Price:</strong> Free tier available, paid from $16.99/month
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-3">Gamma - Presentation Creation</h3>
          <p className="text-lg text-gray-700 mb-2">
            <strong>What it does:</strong> Generates complete presentations from outlines with professional design automatically applied.
          </p>
          <p className="text-lg text-gray-700 mb-2">
            <strong>Why PMs love it:</strong> Turn strategy docs into stakeholder presentations in minutes.
          </p>
          <p className="text-lg text-gray-700 mb-6">
            <strong>Price:</strong> Free tier available, paid from $8/month
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-3">Superhuman AI - Email Management</h3>
          <p className="text-lg text-gray-700 mb-2">
            <strong>What it does:</strong> AI triages emails, drafts responses, summarizes threads, and reminds you to follow up.
          </p>
          <p className="text-lg text-gray-700 mb-2">
            <strong>Why PMs love it:</strong> Spend less time in email without missing important messages.
          </p>
          <p className="text-lg text-gray-700 mb-8">
            <strong>Price:</strong> $30/month
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-10 mb-4">How to Choose the Right AI Tools</h2>
          <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
            <li><strong>Start with your biggest bottleneck.</strong> Where do you spend the most unproductive time? Choose tools addressing your biggest pain point first.</li>
            <li><strong>Consider your product stage.</strong> Discovery-stage PMs need research and prototyping tools. Growth-stage PMs need analytics and optimization tools.</li>
            <li><strong>Check integration capabilities.</strong> Tools that integrate with your existing stack provide more value.</li>
            <li><strong>Test before committing.</strong> Most AI tools offer free tiers or trials. Test 2-3 options before committing.</li>
            <li><strong>Calculate ROI on your time.</strong> If a tool saves you 5 hours per week and costs $50/month, that's a clear win.</li>
          </ul>

          <h2 className="text-3xl font-bold text-gray-900 mt-10 mb-4">Building AI Product Management Skills</h2>
          <p className="text-lg text-gray-700 mb-4">
            Tools are only as good as the PM using them. Develop AI capabilities through:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
            <li>Understanding AI capabilities and limitations to identify appropriate use cases</li>
            <li>Learning prompt engineering to craft effective prompts for better outputs</li>
            <li>Developing AI product sense to evaluate AI features and make AI-specific trade-offs</li>
            <li>Getting formal training through programs like the AI Product Manager (PMAI) or Certified AI Product Innovator certifications from Agile36, which teach PMs how to leverage AI tools effectively, build AI-powered products, and even design AI agent systems</li>
          </ul>

          <h2 className="text-3xl font-bold text-gray-900 mt-10 mb-4">Common Mistakes to Avoid</h2>
          <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
            <li><strong>Tool hoarding without strategy.</strong> Choose strategically and master a focused toolkit.</li>
            <li><strong>Trusting AI outputs blindly.</strong> Always verify important insights.</li>
            <li><strong>Replacing judgment with automation.</strong> AI augments PM judgment; it doesn't replace it.</li>
            <li><strong>Ignoring data privacy.</strong> Be careful about what data you share with AI tools.</li>
            <li><strong>Not investing in learning.</strong> Allocate time to develop effective usage skills.</li>
          </ul>

          <h2 className="text-3xl font-bold text-gray-900 mt-10 mb-4">Conclusion</h2>
          <p className="text-lg text-gray-700 mb-4">
            AI tools have fundamentally changed what's possible for product managers. The PMs dominating in 2025 aren't necessarily smarter—they're leveraging AI to move faster, decide better, and deliver more value.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            Start with 3-5 tools addressing your biggest bottlenecks. Master them. Then gradually expand your AI toolkit.
          </p>
          <p className="text-xl font-bold text-gray-900 mb-8">
            Your competitors are already doing this. The question is whether you'll lead or follow.
          </p>

          <div className="bg-[#f0f9ff] border-l-4 border-[#fa4a23] p-6 my-8">
            <h3 className="text-xl font-bold text-gray-900 mb-3">About Agile36</h3>
            <p className="text-gray-700">
              We help product managers build world-class capabilities at the intersection of agile methodologies and AI. Based in Fort Lauderdale, Florida, we offer specialized certifications including the AI Product Manager (PMAI) and Certified AI Product Innovator programs—teaching PMs how to effectively leverage AI tools, build AI-powered products, and design AI agent systems. Whether you're an individual PM looking to upskill or an organization building AI product capabilities, learn more about our certifications or contact us.
            </p>
          </div>

          {/* Back to Blog Link */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <Link href="/#blog" className="inline-flex items-center gap-2 text-[#fa4a23] font-semibold hover:underline">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Blog
            </Link>
          </div>
        </div>
      </article>

      {/* Footer */}
      <footer className="w-full bg-[#01203d] text-white py-16 px-4 sm:px-6 lg:px-20 mt-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>About us</li>
                <li>Accreditation</li>
                <li>Careers</li>
                <li>Contact us</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Offerings</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>Live virtual (Online)</li>
                <li>Classroom (In-Person)</li>
                <li>Corporate training</li>
                <li>Training Schedule</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>Practice Tests</li>
                <li>Webinars</li>
                <li>Blogs</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Get Our Weekly Newsletter</h4>
              <div className="flex gap-2 mb-4">
                <input 
                  type="email" 
                  placeholder="Email*" 
                  className="flex-1 px-4 py-2 rounded-md text-gray-900"
                />
                <button className="bg-[#34595f] hover:bg-[#2a474c] text-white font-bold px-6 py-2 rounded-md">
                  Subscribe
                </button>
              </div>
              <div className="flex gap-4 mt-6">
                <div className="w-8 h-8 bg-gray-600 rounded"></div>
                <div className="w-8 h-8 bg-gray-600 rounded"></div>
                <div className="w-8 h-8 bg-gray-600 rounded"></div>
                <div className="w-8 h-8 bg-gray-600 rounded"></div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-600 pt-8 text-center text-sm text-gray-300">
            <p>© 2024 Agile36. All Rights Reserved</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
