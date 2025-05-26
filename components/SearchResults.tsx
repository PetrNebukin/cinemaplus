"use client"

import type React from "react"

import { useState } from "react"
import MovieCard from "./MovieCard"

interface SearchResultsProps {
  query: string
  results: any[]
  onMovieSelect: (movie: any) => void
  onSearch: (query: string) => void
  isSearching?: boolean
}

export default function SearchResults({
  query,
  results,
  onMovieSelect,
  onSearch,
  isSearching = false,
}: SearchResultsProps) {
  const [searchQuery, setSearchQuery] = useState(query)

  const handleSearch = async () => {
    if (searchQuery.trim()) {
      await onSearch(searchQuery.trim())
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <section className="pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Search bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="search-bar flex items-center">
            <span className="material-icons text-navy-400 mr-3">search</span>
            <input
              type="text"
              placeholder="Поиск фильмов и сериалов..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 bg-transparent text-white placeholder-navy-400 focus:outline-none"
            />
            <button
              onClick={handleSearch}
              disabled={isSearching}
              className="btn-primary ml-3 flex items-center space-x-2 disabled:opacity-50"
            >
              {isSearching ? (
                <div className="loading-spinner w-5 h-5" />
              ) : (
                <span className="material-icons">search</span>
              )}
              <span>Найти</span>
            </button>
          </div>
        </div>

        {/* Results header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">Результаты по запросу: "{query}"</h2>
          <p className="text-navy-400">
            Найдено {results.length} {results.length === 1 ? "результат" : "результатов"}
          </p>
        </div>

        {/* Results grid */}
        {isSearching ? (
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <div className="loading-spinner mx-auto mb-4" />
              <p className="text-navy-400">Ищу...</p>
            </div>
          </div>
        ) : results.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {results.map((movie, index) => (
              <MovieCard key={movie.id} movie={movie} onClick={() => onMovieSelect(movie)} delay={index * 0.05} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <span className="material-icons text-navy-600 text-6xl mb-4 block">search_off</span>
            <h3 className="text-xl font-semibold text-navy-400 mb-2">Ничего не найдено</h3>
            <p className="text-navy-500">Попробуйте изменить поисковый запрос</p>
          </div>
        )}
      </div>
    </section>
  )
}
