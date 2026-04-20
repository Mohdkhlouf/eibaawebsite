import { notFound } from 'next/navigation'

const languages = ['ar', 'fi', 'en'];
const direction = { ar: 'rtl', fi: 'ltr', en: 'ltr' };

export default async function PublicLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;  // ← params is a Promise now
}) {
  const { lang } = await params;  // ← await it

  if (!languages.includes(lang)) notFound();

  return (
    <html lang={lang} dir={direction[lang as keyof typeof direction]}>
      <body>
        {/* Language switcher */}
        <nav style={{ padding: '1rem' }}>
          {languages.map(l => (
            <a
              key={l}
              href={`/${l}`}
              style={{
                fontWeight: l === lang ? 'bold' : 'normal',
                marginRight: '1rem'
              }}
            >
              {l.toUpperCase()}
            </a>
          ))}
        </nav>
        {children}
      </body>
    </html>
  );
}
