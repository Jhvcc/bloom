import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import Header from "@/components/header"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  title: "英语学习 | English Learning",
  description: "一个现代化的英语学习应用",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      {/* <body className={`${inter.variable} ${notoSans.variable} ${notoSerif.variable} font-sans bg-gray-100`}> */}
      <body style={{ fontFamily: "Inter" }} className={`font-sans bg-gray-100`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <Header />
          <main className="container mx-auto p-4 sm:p-6 lg:p-8 pb-16">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}
