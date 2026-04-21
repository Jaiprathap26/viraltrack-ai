"use client"
import { useState } from "react"

export default function ViralDashboard() {
  const [content, setContent] = useState("")
  const [platform, setPlatform] = useState("TikTok")
  const [niche, setNiche] = useState("General")
  const [result, setResult] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const analyzeVirality = async () => {
    if (!content.trim()) { setError("Please enter content to analyze"); return }
    setLoading(true); setError(""); setResult("")
    try {
      const res = await fetch("/api/analyze-virality", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, platform, niche }),
      })
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      setResult(data.analysis)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Analysis failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <nav className="border-b border-gray-800 px-6 py-4 flex items-center gap-2">
        <div className="w-8 h-8 bg-pink-500 rounded-lg flex items-center justify-center">🔥</div>
        <span className="font-bold text-xl">ViralTrack.ai</span>
        <span className="text-gray-500 ml-2">/ Analyzer</span>
      </nav>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-2">Content Virality Analyzer</h1>
        <p className="text-gray-400 mb-10">Score your content and get AI optimization suggestions.</p>
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
            <div className="space-y-5">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Your Content / Script *</label>
                <textarea value={content} onChange={(e) => setContent(e.target.value)}
                  placeholder="Paste your video script, caption, or describe your video concept..."
                  rows={6} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Platform</label>
                  <select value={platform} onChange={(e) => setPlatform(e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-pink-500">
                    {["TikTok", "Instagram Reels", "YouTube Shorts", "LinkedIn", "Twitter/X"].map(p => <option key={p}>{p}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Niche</label>
                  <select value={niche} onChange={(e) => setNiche(e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-pink-500">
                    {["General", "Fitness", "Finance", "Tech", "Fashion", "Food", "Business", "Education", "Entertainment", "Travel"].map(n => <option key={n}>{n}</option>)}
                  </select>
                </div>
              </div>
              {error && <div className="bg-red-900/30 border border-red-800 rounded-lg px-4 py-3"><p className="text-red-400 text-sm">{error}</p></div>}
              <button onClick={analyzeVirality} disabled={loading}
                className="w-full bg-pink-600 hover:bg-pink-700 disabled:bg-pink-900 text-white py-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
                {loading ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>Analyzing...</> : "🔥 Analyze Viral Potential"}
              </button>
            </div>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
            <h2 className="text-lg font-semibold mb-6">AI Viral Analysis</h2>
            {result ? (
              <div>
                <span className="text-green-400 text-sm">✓ Analysis complete</span>
                <button onClick={() => navigator.clipboard.writeText(result)} className="float-right text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 px-3 py-1 rounded-lg">Copy</button>
                <div className="clear-both mt-4 bg-gray-800 rounded-xl p-4 max-h-[500px] overflow-y-auto">
                  <pre className="text-sm text-gray-300 whitespace-pre-wrap font-mono leading-relaxed">{result}</pre>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <div className="text-5xl mb-4">🔥</div>
                <p className="text-gray-500 text-sm">Enter your content and click Analyze to get your virality score and AI-powered improvement suggestions.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}