"use client"

import type React from "react"

import { useState } from "react"

interface HeroProps {
  onSearch: (query: string) => void
}

export default function Hero({ onSearch }: HeroProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = () => {
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim())
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <section className="min-h-screen flex items-center justify-center px-4 pt-16">
      <div className="text-center max-w-2xl mx-auto animate-fade-in">
        {/* Logo and title */}
        <div className="mb-12">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-primary-500 rounded-2xl flex items-center justify-center">
              <span className="material-icons text-white text-3xl">movie</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-mts-semibold text-white text-shadow tracking-tight">Cinema+</h1>
          </div>
          <p className="text-xl text-navy-400 font-mts-medium">на платформе NBKN.RU</p>
        </div>

        {/* Search bar */}
        <div className="w-full max-w-4xl mx-auto">
          <div className="search-bar flex items-center group w-full">
            <span className="material-icons text-navy-400 mr-4 group-focus-within:text-primary-500 transition-colors">
              search
            </span>
            <input
              type="text"
              placeholder="Поиск..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 bg-transparent text-white text-lg placeholder-navy-400 focus:outline-none w-full"
            />
            <button onClick={handleSearch} className="btn-primary ml-4 flex items-center space-x-2 group flex-shrink-0">
              <span className="material-icons group-hover:scale-110 transition-transform">search</span>
              <span className="hidden sm:inline">Найти</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
