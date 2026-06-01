import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Code2, Trophy, Zap, Terminal, ExternalLink, Activity, Award } from "lucide-react";

// Robust fallback statistics used as initial state and offline fallback
const FALLBACK_STATS = {
  username: "z8YKPFGW0q",
  profileUrl: "https://leetcode.com/u/z8YKPFGW0q/",
  totalSolved: 56,
  totalQuestions: 3100,
  ranking: "2,333,784",
  streak: 5,
  categories: [
    { name: "Arrays & Hashing", solved: 18, total: 40, color: "#00FF00" },
    { name: "Dynamic Programming", solved: 6, total: 30, color: "#FF3366" },
    { name: "Two Pointers & Sliding Window", solved: 12, total: 30, color: "#00FFFF" },
    { name: "Trees & Graphs", solved: 10, total: 50, color: "#FF9900" },
    { name: "Greedy & Backtracking", solved: 5, total: 20, color: "#CC66FF" },
    { name: "Sorting & Binary Search", solved: 5, total: 30, color: "#FFD700" }
  ],
  difficulties: [
    { 
      type: "Easy", 
      solved: 13, 
      total: 800, 
      color: "#00E676", // Vibrant light green
      borderColor: "rgba(0, 230, 118, 0.2)",
      glowColor: "rgba(0, 230, 118, 0.4)"
    },
    { 
      type: "Medium", 
      solved: 30, 
      total: 1600, 
      color: "#FFB300", // Warm amber
      borderColor: "rgba(255, 179, 0, 0.2)",
      glowColor: "rgba(255, 179, 0, 0.4)"
    },
    { 
      type: "Hard", 
      solved: 13, 
      total: 700, 
      color: "#FF1744", // Neon bright red
      borderColor: "rgba(255, 23, 68, 0.2)",
      glowColor: "rgba(255, 23, 68, 0.4)"
    }
  ]
};

export default function LeetCode() {
  const [stats, setStats] = useState(FALLBACK_STATS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLeetCodeData() {
      try {
        const username = FALLBACK_STATS.username;
        // Fetch profile details and solved details in parallel
        const [profileRes, solvedRes] = await Promise.all([
          fetch(`https://alfa-leetcode-api.onrender.com/${username}`),
          fetch(`https://alfa-leetcode-api.onrender.com/${username}/solved`)
        ]);

        if (!profileRes.ok || !solvedRes.ok) {
          throw new Error("Failed to fetch statistics from LeetCode API");
        }

        const profileData = await profileRes.json();
        const solvedData = await solvedRes.json();

        // Calculate and build dynamic categories proportionally if counts changed
        const newTotal = solvedData.solvedProblem || FALLBACK_STATS.totalSolved;
        const scaleFactor = newTotal / FALLBACK_STATS.totalSolved;

        const updatedCategories = FALLBACK_STATS.categories.map(cat => {
          const scaledSolved = Math.min(
            Math.round(cat.solved * scaleFactor),
            cat.total
          );
          return {
            ...cat,
            solved: scaledSolved
          };
        });

        // Set state with verified api data
        setStats({
          username: username,
          profileUrl: FALLBACK_STATS.profileUrl,
          totalSolved: newTotal,
          totalQuestions: 3200, // Approximate total questions
          ranking: profileData.ranking ? Number(profileData.ranking).toLocaleString() : FALLBACK_STATS.ranking,
          streak: FALLBACK_STATS.streak, // Retain fallback streak
          categories: updatedCategories,
          difficulties: [
            { 
              type: "Easy", 
              solved: solvedData.easySolved !== undefined ? solvedData.easySolved : FALLBACK_STATS.difficulties[0].solved, 
              total: 820, 
              color: "#00E676",
              borderColor: "rgba(0, 230, 118, 0.2)",
              glowColor: "rgba(0, 230, 118, 0.4)"
            },
            { 
              type: "Medium", 
              solved: solvedData.mediumSolved !== undefined ? solvedData.mediumSolved : FALLBACK_STATS.difficulties[1].solved, 
              total: 1650, 
              color: "#FFB300",
              borderColor: "rgba(255, 179, 0, 0.2)",
              glowColor: "rgba(255, 179, 0, 0.4)"
            },
            { 
              type: "Hard", 
              solved: solvedData.hardSolved !== undefined ? solvedData.hardSolved : FALLBACK_STATS.difficulties[2].solved, 
              total: 730, 
              color: "#FF1744",
              borderColor: "rgba(255, 23, 68, 0.2)",
              glowColor: "rgba(255, 23, 68, 0.4)"
            }
          ]
        });
      } catch (err) {
        console.warn("Using offline fallback data for LeetCode statistics:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchLeetCodeData();
  }, []);

  return (
    <section id="leetcode" className="py-24 md:py-40 bg-[#0a0a0a] relative overflow-hidden border-y border-white/5">
      {/* Absolute Neon Glow background decorations */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-accent/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-[#00FFFF]/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div>
            <div className="text-accent text-xs md:text-sm font-bold uppercase tracking-[0.3em] mb-4">
              04 — Problem Solving
            </div>
            <h2 className="text-4xl md:text-7xl font-display font-medium flex items-center gap-4">
              LeetCode Analytics
              {loading && (
                <span className="inline-flex h-3 w-3 rounded-full bg-accent/50 animate-ping relative" />
              )}
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <a 
              href={stats.profileUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-6 py-3 border border-white/10 text-white hover:text-black hover:bg-white text-xs font-bold uppercase tracking-widest rounded-full transition-all flex items-center gap-3 group"
            >
              <Code2 size={16} className="text-accent group-hover:text-black transition-colors" />
              View Profile
              <ExternalLink size={14} />
            </a>
          </div>
        </div>

        {/* Analytics Grid */}
        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* Main Ring & Counter (5 cols) */}
          <div className="lg:col-span-5 bg-[#050505]/60 border border-white/5 p-8 md:p-12 rounded-3xl flex flex-col items-center justify-center relative overflow-hidden group hover:border-accent/20 transition-colors">
            <div className="absolute top-4 left-4 text-[10px] text-white/30 uppercase tracking-widest font-bold flex items-center gap-2">
              <Trophy size={12} className="text-accent" /> Overview
            </div>

            {/* Circular Progress Ring */}
            <div className="relative w-64 h-64 flex items-center justify-center mt-6">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
                {/* Background Track Circle */}
                <circle 
                  cx="100" 
                  cy="100" 
                  r="85" 
                  className="stroke-white/[0.03] fill-transparent" 
                  strokeWidth="12" 
                />
                
                {/* Easy Ring */}
                <motion.circle 
                  cx="100" 
                  cy="100" 
                  r="85" 
                  className="stroke-[#00E676] fill-transparent" 
                  strokeWidth="12" 
                  strokeDasharray={`${2 * Math.PI * 85}`}
                  initial={{ strokeDashoffset: `${2 * Math.PI * 85}` }}
                  animate={{ 
                    strokeDashoffset: `${2 * Math.PI * 85 * (1 - stats.difficulties[0].solved / stats.difficulties[0].total)}` 
                  }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  strokeLinecap="round"
                />

                {/* Medium Ring */}
                <motion.circle 
                  cx="100" 
                  cy="100" 
                  r="71" 
                  className="stroke-[#FFB300] fill-transparent" 
                  strokeWidth="10" 
                  strokeDasharray={`${2 * Math.PI * 71}`}
                  initial={{ strokeDashoffset: `${2 * Math.PI * 71}` }}
                  animate={{ 
                    strokeDashoffset: `${2 * Math.PI * 71 * (1 - stats.difficulties[1].solved / stats.difficulties[1].total)}` 
                  }}
                  transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
                  strokeLinecap="round"
                />

                {/* Hard Ring */}
                <motion.circle 
                  cx="100" 
                  cy="100" 
                  r="57" 
                  className="stroke-[#FF1744] fill-transparent" 
                  strokeWidth="8" 
                  strokeDasharray={`${2 * Math.PI * 57}`}
                  initial={{ strokeDashoffset: `${2 * Math.PI * 57}` }}
                  animate={{ 
                    strokeDashoffset: `${2 * Math.PI * 57 * (1 - stats.difficulties[2].solved / stats.difficulties[2].total)}` 
                  }}
                  transition={{ duration: 1.5, delay: 0.4, ease: "easeOut" }}
                  strokeLinecap="round"
                />
              </svg>

              {/* Central Text Counter */}
              <div className="absolute flex flex-col items-center justify-center text-center">
                <span className="text-5xl md:text-6xl font-display font-black text-white">
                  {stats.totalSolved}
                </span>
                <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold mt-1">Solved</span>
              </div>
            </div>

            {/* Quick Stat Blocks */}
            <div className="grid grid-cols-2 gap-12 w-full mt-10 border-t border-white/5 pt-6">
              <div className="text-center">
                <div className="text-white/30 text-[10px] uppercase font-bold tracking-widest mb-1 flex items-center justify-center gap-1.5">
                  <Award size={12} className="text-accent" /> Global Rank
                </div>
                <div className="text-xl md:text-2xl font-display font-bold text-white group-hover:text-accent transition-colors">
                  {stats.ranking}
                </div>
              </div>
              <div className="text-center">
                <div className="text-white/30 text-[10px] uppercase font-bold tracking-widest mb-1 flex items-center justify-center gap-1.5">
                  <Zap size={12} className="text-orange-400" /> Active Streak
                </div>
                <div className="text-xl md:text-2xl font-display font-bold text-white group-hover:text-orange-400 transition-colors">
                  {stats.streak} Days
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Breakdown & Topics (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Difficulty Bar breakdown */}
            <div className="bg-[#050505]/60 border border-white/5 p-8 rounded-3xl group hover:border-[#00FFFF]/20 transition-colors">
              <h3 className="text-sm font-bold uppercase tracking-widest text-white/70 mb-8 flex items-center gap-2">
                <Terminal size={16} className="text-[#00FFFF]" /> Solved Breakdown
              </h3>

              <div className="space-y-6">
                {stats.difficulties.map((diff, index) => {
                  const percent = Math.round((diff.solved / diff.total) * 100);
                  return (
                    <div key={diff.type} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-semibold" style={{ color: diff.color }}>{diff.type}</span>
                        <span className="text-white/40">
                          <strong className="text-white font-bold">{diff.solved}</strong> / {diff.total} ({percent}%)
                        </span>
                      </div>
                      
                      {/* Progress bar container */}
                      <div className="h-2 w-full bg-white/[0.03] rounded-full overflow-hidden relative">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${percent}%` }}
                          transition={{ duration: 1.2, delay: index * 0.1, ease: "easeOut" }}
                          className="h-full rounded-full relative"
                          style={{ 
                            backgroundColor: diff.color,
                            boxShadow: `0 0 10px ${diff.glowColor}`
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Custom Problem Solving Specializations (Grid) */}
            <div className="bg-[#050505]/60 border border-white/5 p-8 rounded-3xl flex-1 group hover:border-white/10 transition-colors">
              <h3 className="text-sm font-bold uppercase tracking-widest text-white/70 mb-6 flex items-center gap-2">
                <Activity size={16} className="text-accent" /> Strongest Fields
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                {stats.categories.map((cat) => {
                  const percent = Math.round((cat.solved / cat.total) * 100);
                  return (
                    <div 
                      key={cat.name} 
                      className="border border-white/5 rounded-2xl p-4 bg-white/[0.01] hover:bg-white/[0.03] hover:border-white/10 transition-all flex flex-col justify-between"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="text-xs font-semibold text-white/80 line-clamp-1">{cat.name}</div>
                        <span className="text-[10px] font-bold py-0.5 px-2 bg-white/5 rounded-full text-white/60" style={{ color: cat.color }}>
                          {percent}%
                        </span>
                      </div>
                      
                      {/* Small subtle indicator bar */}
                      <div className="h-1 w-full bg-white/[0.05] rounded-full mt-3 overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${percent}%` }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: cat.color }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
