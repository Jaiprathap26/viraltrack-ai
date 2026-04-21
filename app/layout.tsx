import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
const inter = Inter({ subsets: ["latin"] })
export const metadata: Metadata = {
  title: "ViralTrack.ai — Predict Viral Content Before You Post",
  description: "AI-powered virality scoring for TikTok, Reels, and YouTube. Know if your content will go viral before posting.",
  keywords: "viral content predictor, TikTok viral score, content virality, social media AI",
}
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en"><body className={inter.className}>{children}</body></html>)
}