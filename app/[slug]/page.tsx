import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { seoPages } from '@/data/seoPages';
import FaqItem from './FaqItem';

type SeoPageEntry = {
  slug: string;
  title: string;
  h1: string;
  description: string;
  body: string;
  category?: string;
  comparisonTable?: { headers: string[]; rows: string[][] };
  faq?: { question: string; answer: string }[];
  relatedCourses?: unknown[];
};

export const dynamicParams = false;

export function generateStaticParams() {
  return seoPages.map((page: SeoPageEntry) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = seoPages.find((p: SeoPageEntry) => p.slug === slug);

  if (!page) {
    return {
      title: 'Page not found | Agile36',
      description: 'The page you requested could not be found.',
    };
  }

  return {
    title: page.title,
    description: page.description,
  };
}

function formatBodyContent(body: string | undefined) {
  if (!body) return null;

  const paragraphs = body.split(/\n\n+/).filter((p) => p.trim());

  return paragraphs.map((para, idx) => {
    const trimmed = para.trim();

    if (trimmed.startsWith('## ')) {
      return <h2 key={idx}>{trimmed.replace(/^## /, '')}</h2>;
    }
    if (trimmed.startsWith('### ')) {
      return <h3 key={idx}>{trimmed.replace(/^### /, '')}</h3>;
    }
    if (trimmed.startsWith('#### ')) {
      return <h4 key={idx}>{trimmed.replace(/^#### /, '')}</h4>;
    }

    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      const items = trimmed.split(/\n(?=-|\*)/).map((item) => item.replace(/^[-*] /, '').trim());
      return (
        <ul key={idx}>
          {items.map((item, i) => {
            const parts = item.split(/(\*\*[^*]+\*\*)/g);
            return (
              <li key={i}>
                {parts.map((part, pIdx) => {
                  if (part.startsWith('**') && part.endsWith('**')) {
                    return <strong key={pIdx}>{part.slice(2, -2)}</strong>;
                  }
                  return part;
                })}
              </li>
            );
          })}
        </ul>
      );
    }

    const parts = trimmed.split(/(\*\*[^*]+\*\*)/g);
    return (
      <p key={idx}>
        {parts.map((part, pIdx) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={pIdx}>{part.slice(2, -2)}</strong>;
          }
          return part;
        })}
      </p>
    );
  });
}

function getCategoryTag(category: string | undefined) {
  if (!category) return null;

  const tagMap: Record<string, string> = {
    'ai-agile': 'AI',
    comparison: 'Comparison',
    location: 'Location',
    'safe-certification': 'SAFe',
    course: 'Course',
  };

  return tagMap[category] || category.charAt(0).toUpperCase() + category.slice(1);
}

export default async function SeoProgrammaticPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = seoPages.find((p: SeoPageEntry) => p.slug === slug) as SeoPageEntry | undefined;

  if (!page) {
    notFound();
  }

  const categoryTag = getCategoryTag(page.category);

  return (
    <div
      className="bg-black text-[#1f2c4a]"
      style={{
        minHeight: '60vh',
      }}
    >
      {/* Dark-theme overrides for the scoped seo-programmatic.css (graphite glass theme) */}
      <style>{`
        .seo-programmatic-page {
          --seo-primary-blue: #d97706;
          --seo-primary-blue-dark: #f59e0b;
          --seo-accent-orange: #d97706;
          --seo-text-dark: #ffffff;
          --seo-text-medium: #d1d5db;
          --seo-text-light: #9ca3af;
          --seo-border-color: rgba(255, 255, 255, 0.15);
          --seo-bg-white: rgba(255, 255, 255, 0.06);
          --seo-bg-light: rgba(255, 255, 255, 0.04);
          background-color: transparent;
        }
        .seo-programmatic-page article h2,
        .seo-programmatic-page article h3,
        .seo-programmatic-page article h4,
        .seo-programmatic-page .faq-title,
        .seo-programmatic-page .cta-title {
          font-weight: 400;
          letter-spacing: -0.03em;
        }
        .seo-programmatic-page .article-tag {
          background-color: rgba(251, 191, 36, 0.12);
          color: #d97706;
        }
        .seo-programmatic-page .comparison-table tbody tr:hover {
          background-color: rgba(255, 255, 255, 0.08);
        }
        .seo-programmatic-page .faq-item {
          border-radius: 1rem;
        }
        .seo-programmatic-page .cta-section {
          border-radius: 1rem;
        }
        .seo-programmatic-page .cta-button {
          background-color: #ffffff;
          color: #000000;
          border-radius: 0.5rem;
          font-weight: 500;
        }
        .seo-programmatic-page .cta-button:hover {
          background-color: #f3f4f6;
          color: #000000;
        }
      `}</style>
      <main
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '3rem 2rem 4rem 2rem',
        }}
      >
        <div style={{ marginBottom: '3rem' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: '1rem',
            }}
          >
            {categoryTag && <span className="article-tag">{categoryTag}</span>}
            <span className="article-meta" style={{ marginLeft: 'auto' }}>
              Latest
            </span>
          </div>

          <h1
            style={{
              fontSize: '2.5rem',
              fontWeight: '400',
              letterSpacing: '-0.03em',
              color: '#ffffff',
              marginBottom: '1.5rem',
              lineHeight: '1.2',
              maxWidth: '90%',
            }}
          >
            {page.h1}
          </h1>
        </div>

        <article
          style={{
            lineHeight: '1.7',
            color: '#d1d5db',
          }}
        >
          {formatBodyContent(page.body)}
        </article>

        {page.comparisonTable && (
          <div style={{ marginTop: '3rem' }}>
            <h2
              style={{
                fontSize: '1.75rem',
                marginBottom: '1.5rem',
                fontWeight: '400',
                letterSpacing: '-0.03em',
                color: '#ffffff',
              }}
            >
              Comparison Table
            </h2>
            <table className="comparison-table">
              <thead>
                <tr>
                  {page.comparisonTable.headers.map((header, idx) => (
                    <th key={idx}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {page.comparisonTable.rows.map((row, idx) => (
                  <tr key={idx}>
                    {row.map((cell, cellIdx) => (
                      <td key={cellIdx}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {page.faq && page.faq.length > 0 && (
          <div style={{ marginTop: '3rem' }}>
            <h2 className="faq-title">Frequently Asked Questions</h2>
            <div className="faq-section">
              {page.faq.map((item, idx) => (
                <FaqItem key={idx} question={item.question} answer={item.answer} />
              ))}
            </div>
          </div>
        )}

        {page.relatedCourses && page.relatedCourses.length > 0 && (
          <div className="cta-section">
            <h2 className="cta-title">Ready to Get Started?</h2>
            <p className="cta-description">
              Explore our comprehensive training courses and certifications to advance your career.
            </p>
            <a href="/courses" className="cta-button">
              View All Courses
            </a>
          </div>
        )}
      </main>
    </div>
  );
}
