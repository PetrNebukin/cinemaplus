"use client"

import { useEffect, useState } from "react"

interface MoviePlayerProps {
  movie: any
  onBack: () => void
}

export default function MoviePlayer({ movie, onBack }: MoviePlayerProps) {
  const [movieDetails, setMovieDetails] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [posterUrl, setPosterUrl] = useState<string>("")

  useEffect(() => {
    loadMovieDetails()
    loadPosterUrl()
  }, [movie.id])

  const loadMovieDetails = async () => {
    try {
      const response = await fetch(`https://kp.kinobox.tv/films/${movie.id}`)
      if (response.ok) {
        const data = await response.json()
        setMovieDetails(data.data)
      }
    } catch (error) {
      console.error("Error loading movie details:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const loadPosterUrl = async () => {
    // Постер
    let posterUrl
    try {
      const response = await fetch(`https://kp.kinobox.tv/films/${movie.id}`)
      if (response.ok) {
        const movieDetails = await response.json()
        if (movieDetails.data) {
          const details = movieDetails.data
          if (details.posterUrl) {
            posterUrl = details.posterUrl
          } else if (details.poster) {
            posterUrl = details.poster
          }
        }
      }
    } catch (e) {
      console.warn("Failed to fetch movie details:", e)
    }
    if (!posterUrl) {
      if (movie.poster?.previewUrl) {
        posterUrl = movie.poster.previewUrl
      } else if (movie.gallery?.posterUrl) {
        posterUrl = movie.gallery.posterUrl
      } else if (movie.gallery?.coverUrl) {
        posterUrl = movie.gallery.coverUrl
      } else {
        posterUrl = "https://placehold.co/300x450/transparent/FF?text=%C3%97"
      }
    }
    // Исправляем относительный URL на абсолютный, если нужно
    if (posterUrl && posterUrl.startsWith("//")) {
      posterUrl = "https:" + posterUrl
    }
    // Заменяем 'orig' на '300x450' в ссылке на изображение
    if (posterUrl && posterUrl.includes("orig")) {
      posterUrl = posterUrl.replace("orig", "300x450")
    }

    setPosterUrl(posterUrl)
  }

  useEffect(() => {
    // Load Kinobox player
    const script = document.createElement("script")
    script.src = "https://kinobox.tv/kinobox.min.js"
    script.onload = () => {
      if (window.kbox) {
        window.kbox(".kinobox-player", {
          search: { kinopoisk: movie.id },
          notFoundMessage: "Фильм не найден",
          players: {
            alloha: { enable: true, position: 1 },
            kodik: { enable: true, position: 2 },
            videocdn: { enable: false, position: 3 },
            turbo: { enable: false, position: 4 },
          },
        })
      }
    }
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [movie.id])

  const details = movieDetails || movie
  const rating = details.rating?.kinopoisk?.value ? details.rating.kinopoisk.value.toFixed(1) : "—"
  const ratingCount = details.rating?.kinopoisk?.count ? `(${formatNumber(details.rating.kinopoisk.count)})` : ""

  return (
    <section className="pt-20 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Back button */}
        <button
          onClick={onBack}
          className="btn-secondary mb-6 flex items-center space-x-2 hover:scale-105 transition-transform"
        >
          <span className="material-icons">arrow_back</span>
          <span>Назад к результатам</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Player */}
          <div className="lg:col-span-2">
            <div className="bg-navy-900 rounded-xl overflow-hidden mb-6 aspect-video">
              <div className="kinobox-player w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="loading-spinner mx-auto mb-4" />
                  <p className="text-navy-400">Загрузка плеера...</p>
                </div>
              </div>
            </div>
          </div>

          {/* Movie details */}
          <div className="lg:col-span-1">
            <div className="bg-navy-900 rounded-xl p-6 sticky top-24">
              {/* Movie poster */}
              {posterUrl && (
                <div className="mb-6">
                  <img
                    src={posterUrl || "/placeholder.svg"}
                    alt={details.title?.russian || "Без названия"}
                    className="w-full max-w-xs mx-auto rounded-lg shadow-lg"
                  />
                </div>
              )}

              {isLoading ? (
                <div className="text-center py-8">
                  <div className="loading-spinner mx-auto mb-4" />
                  <p className="text-navy-400">Загрузка информации...</p>
                </div>
              ) : (
                <>
                  <h1 className="text-2xl font-bold text-white mb-2">{details.title?.russian || "Без названия"}</h1>

                  {details.title?.original && <h2 className="text-lg text-navy-400 mb-4">{details.title.original}</h2>}

                  {/* Rating and basic info */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    <div className="chip">{details.year || "—"}</div>
                    <div className="chip flex items-center">
                      <span className="material-icons text-yellow-500 text-sm mr-1">star</span>
                      {rating} {ratingCount}
                    </div>
                    {details.duration && <div className="chip">{details.duration}</div>}
                  </div>

                  {/* Genres */}
                  {details.genres && details.genres.length > 0 && (
                    <div className="mb-4">
                      <h3 className="font-semibold text-white mb-2">Жанры</h3>
                      <div className="flex flex-wrap gap-2">
                        {details.genres.map((genre: any, index: number) => (
                          <span key={index} className="chip text-xs">
                            {genre.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Countries */}
                  {details.countries && details.countries.length > 0 && (
                    <div className="mb-4">
                      <h3 className="font-semibold text-white mb-2">Страны</h3>
                      <p className="text-navy-300">
                        {details.countries.map((country: any) => country.name).join(", ")}
                      </p>
                    </div>
                  )}

                  {/* Description */}
                  {details.description && (
                    <div className="mb-4">
                      <h3 className="font-semibold text-white mb-2">Описание</h3>
                      <p className="text-navy-300 text-sm leading-relaxed">{details.description}</p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M"
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K"
  }
  return num.toString()
}

declare global {
  interface Window {
    kbox: any
  }
}
