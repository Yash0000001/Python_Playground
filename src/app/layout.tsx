import "../globals.css";
import { Providers } from "./Providers";
import { Inter } from 'next/font/google'
import { Toaster } from "@/components/ui/toaster"
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css"


export const metadata = {
  title: 'CodeCollab - Real-time Collaborative Code Editor',
  description: 'A powerful, real-time collaborative code editor with instant code execution.',
};

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link
          href="https://liveblocks.io/favicon-32x32.png"
          rel="icon"
          sizes="32x32"
          type="image/png"
        />
        <link
          href="https://liveblocks.io/favicon-16x16.png"
          rel="icon"
          sizes="16x16"
          type="image/png"
        />
      </head>
      <body className={inter.className}>

        <Providers>
          {children}
            <Toaster />
          
        </Providers>
      </body>
    </html>
  );
}
