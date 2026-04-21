import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html style={{ height: '100%' }}>
      <body style={{ height: '100%', margin: 0 }}>
        {children}
      </body>
    </html>
  );
}
