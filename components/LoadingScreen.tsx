"use client"

import { useEffect, useState } from "react"

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 2
      })
    }, 40)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 bg-navy-950 flex items-center justify-center z-50">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-navy-800">
        <div className="h-full bg-primary-500 transition-all duration-100 ease-out" style={{ width: `${progress}%` }} />
      </div>

      {/* Logo and loading content */}
      <div className="text-center animate-fade-in">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-white mb-2">Cinema+</h1>
          <p className="text-xl text-navy-400">на платформе NBKN.RU</p>
        </div>

        <div className="loading-spinner mx-auto mb-4" />
        <p className="text-navy-400">Загрузка...</p>
      </div>
    </div>
  )
}
