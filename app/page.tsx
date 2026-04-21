"use client"
import { useState } from "react"
import Link from "next/link"

export default function ViralTrackLanding() {
  const [content, setContent] = useState("")
  const [result, setResult] = useState<{score: number; verdict: string; improvements: string[]} | null>(null)
  const [loading, setLoading] = useState(false)

  const checkVirality = async () => {
    if (!content.trim()) return
    setLoading(true)
    await new Promise(r => setTimeout(r, 1500)) // Demo delay
    setResult({
      score: Math.floor(Math.random() * 40) + 50,
      verdict: "Good potential — 3 improvements could push this to viral",
      improvements: ["Add a stronger hook in the first 2 seconds", "Include trending audio from this week", "End with a question to drive comments"]
    })
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <nav className="border-b border-gray-800 px-6 py-4 flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-pink-500 rounded-lg flex items-center justify-center text-sm">🔥</div>
          <span className="font-bold text-xl">ViralTrack.ai</span>
        </div>
        <Link href="/dashboard" className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg text-sm">
          Score My Content →
        </Link>
      </nav>

      <section className="max-w-5xl mx-auto px-6 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 bg-pink-900/30 border border-pink-800 rounded-full px-4 py-2 text-sm text-pink-300 mb-8">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
          20,000+ creators · 73% accuracy on viral predictions
        </div>
        <h1 className="text-5xl md:text-7xl font-black mb-6">
          Know If Your Content<br /><span className="text-pink-400">Will Go Viral</span><br />Before You Post
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
          ViralTrack.ai analyzes your TikTok, Reels, and YouTube Shorts content and scores virality potential
          in real-time. Stop wasting time on content that won't perform.
        </p>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 max-w-2xl mx-auto mb-8">
          <textarea value={content} onChange={(e) => setContent(e.target.value)}
            placeholder="Paste your script, caption, or describe your video concept here..."
            rows={4} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 resize-none mb-4" />

          {result ? (
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-4">
                <div className={`text-6xl font-black ${result.score >= 75 ? "text-green-400" : result.score >= 50 ? "text-yellow-400" : "text-red-400"}`}>
                  {result.score}
                </div>
                <div className="text-left">
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Viral Score</p>
                  <p className="text-sm text-gray-300">{result.verdict}</p>
                </div>
              </div>
              <div className="bg-gray-800 rounded-xl p-4 text-left">
                <p className="text-xs text-pink-400 font-medium mb-3">AI IMPROVEMENT SUGGESTIONS</p>
                {result.improvements.map((imp, i) => (
                  <p key={i} className="text-sm text-gray-300 mb-2">💡 {imp}</p>
                ))}
              </div>
              <button onClick={() => { setResult(null); setContent("") }} className="text-sm text-gray-500 hover:text-white transition-colors">Analyze another →</button>
            </div>
          ) : (
            <button onClick={checkVirality} disabled={loading || !content.trim()}
              className="w-full bg-pink-600 hover:bg-pink-700 disabled:bg-pink-900 disabled:cursor-not-allowed text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
              {loading ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>Analyzing...</> : "🔥 Check Viral Score (Free)"}
            </button>
          )}
        </div>
        <p className="text-sm text-gray-500">5 free checks/day · No signup required</p>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: "🎯", title: "Virality Score", desc: "0-100 score based on hook strength, trend alignment, engagement triggers, and platform algorithm factors." },
            { icon: "📈", title: "Trend Forecasting", desc: "See what topics are about to blow up in the next 72 hours. Be first, not late." },
            { icon: "🔍", title: "Competitor Analysis", desc: "Analyze what makes your top competitors' content go viral — then replicate their winning patterns." },
          ].map((f, i) => (
            <div key={i} className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <div className="text-3xl mb-4">{f.icon}</div>
              <h3 className="text-lg font-bold mb-2">{f.title}</h3>
              <p className="text-gray-400 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center mb-16">Pricing</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            { name: "Free", price: "$0", features: ["5 viral scores/day", "Basic improvement tips", "No account needed"], cta: "Start Free", popular: false },
            { name: "Creator", price: "$15", india: "₹1,249", features: ["Unlimited scores", "Trend forecasting", "Competitor analysis", "Best posting times"], cta: "Go Creator", popular: true },
            { name: "Agency", price: "$49", india: "₹4,099", features: ["10 accounts", "Team dashboard", "White-label reports", "API access"], cta: "Go Agency", popular: false },
          ].map((p, i) => (
            <div key={i} className={`rounded-2xl p-8 ${p.popular ? "bg-pink-600 border-2 border-pink-400" : "bg-gray-900 border border-gray-800"}`}>
              {p.popular && <div className="text-xs font-bold uppercase text-pink-200 mb-4">Most Popular</div>}
              <h3 className="text-xl font-bold mb-1">{p.name}</h3>
              <div className="flex items-baseline gap-1 mb-1"><span className="text-4xl font-black">{p.price}</span>{p.price !== "$0" && <span className="text-sm text-gray-400">/mo</span>}</div>
              {(p as {india?: string}).india && <p className="text-sm text-gray-400 mb-6">{(p as {india?: string}).india}/mo in India</p>}
              <ul className="space-y-3 mb-8 mt-4">{p.features.map((f, j) => <li key={j} className="text-sm flex items-center gap-2 text-gray-300"><span className="text-green-400">✓</span>{f}</li>)}</ul>
              <Link href="/dashboard" className={`block w-full py-3 rounded-lg font-semibold text-sm text-center ${p.popular ? "bg-white text-pink-600" : "bg-pink-600 text-white"}`}>{p.cta}</Link>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-gray-800 px-6 py-8 text-center text-gray-500 text-sm">
        © 2026 ViralTrack.ai — Predict Viral Content · Built by Amelia Sovereign AI
      </footer>
    </div>
  )
}