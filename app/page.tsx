"use client"

import { useState, useEffect } from "react"
import Header from "@/components/Header"
import Hero from "@/components/Hero"
import SearchResults from "@/components/SearchResults"
import MoviePlayer from "@/components/MoviePlayer"
import Footer from "@/components/Footer"
import LoadingScreen from "@/components/LoadingScreen"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [currentView, setCurrentView] = useState<"hero" | "results" | "player">("hero")
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [isSearching, setIsSearching] = useState(false)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const handleSearch = async (query: string) => {
    setSearchQuery(query)
    setCurrentView("results")
    setIsSearching(true)

    try {
      const response = await fetch(`https://kp.kinobox.tv/movies/search/?query=${encodeURIComponent(query)}&limit=20`)
      if (response.ok) {
        const data = await response.json()
        const filtered =
          data.data?.items?.filter((movie: any) => movie.title?.russian && movie.title.russian !== "Без названия") || []
        setSearchResults(filtered)
      }
    } catch (error) {
      console.error("Search error:", error)
      setSearchResults([])
    } finally {
      setIsSearching(false)
    }
  }

  const handleMovieSelect = (movie: any) => {
    setSelectedMovie(movie)
    setCurrentView("player")
  }

  const handleBackToResults = () => {
    setCurrentView("results")
  }

  const handleBackToHome = () => {
    setCurrentView("hero")
    setSearchQuery("")
    setSearchResults([])
  }

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <div className="min-h-screen bg-navy-950">
      <Header onSearch={handleSearch} onHome={handleBackToHome} showSearch={currentView !== "hero"} />

      <main className="relative">
        {currentView === "hero" && <Hero onSearch={handleSearch} />}

        {currentView === "results" && (
          <SearchResults
            query={searchQuery}
            results={searchResults}
            onMovieSelect={handleMovieSelect}
            onSearch={handleSearch}
            isSearching={isSearching}
          />
        )}

        {currentView === "player" && selectedMovie && (
          <MoviePlayer movie={selectedMovie} onBack={handleBackToResults} />
        )}
      </main>

      <Footer />
    </div>
  )
}
