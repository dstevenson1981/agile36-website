import './seo-programmatic.css';

export default function SeoProgrammaticSlugLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="seo-programmatic-page bg-white">{children}</div>;
}
