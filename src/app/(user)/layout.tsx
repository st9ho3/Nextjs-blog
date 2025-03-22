import Header from "../(components)/header"
export const metadata = {
    title: 'Next.js',
    description: 'Generated by Next.js',
  }
  
  export default function UserLayout({
    children,
  }: {
    children: React.ReactNode,
    params : string
  }) {

    return (
      <html lang="en">
        <body>
          <Header />
          {children}
          </body>
      </html>
    )
  }
  