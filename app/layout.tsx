// app/layout.tsx — neutral, no Arabic
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html >
      <body>{children}</body>
    </html>
  )
}
