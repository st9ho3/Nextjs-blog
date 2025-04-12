// app/layout.tsx
import type { Metadata } from "next";
// Import the necessary fonts
import { Brygada_1918, Inter} from "next/font/google";
import "../global.css";
import "@blocknote/mantine/style.css"
import Header from "../(components)/header";

// Configure Inter (for headings and default)
const inter = Inter({
  subsets: ["latin"],
  display: 'swap', // Good practice for font loading
  variable: "--font-inter", // CSS variable
});

// Configure Noto Serif Display (for lists, paragraphs)
const notoSerifDisplay = Brygada_1918({
  subsets: ["latin", 'greek'],
  weight: [ '400', '700'], // Include needed weights
  display: 'swap',
  variable: "--font-noto-serif-display", // CSS variable
});

export const metadata: Metadata = {
  title: "My Content App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Apply Inter as the main font class, making it the default */}
      {/* Use variables for specific overrides */}
      <body className={`${inter.className} ${notoSerifDisplay.variable}`}>
        <Header />
        {children}
      </body>
    </html>
  );
}