"use client"

import { useState, useEffect } from "react"

interface MovieCardProps {
  movie: any
  onClick: () => void
  delay?: number
}

export default function MovieCard({ movie, onClick, delay = 0 }: MovieCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [posterUrl, setPosterUrl] = useState<string>("")

  useEffect(() => {
    const fetchPosterUrl = async () => {
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

    fetchPosterUrl()
  }, [movie.id])

  const rating = movie.rating?.kinopoisk?.value ? movie.rating.kinopoisk.value.toFixed(1) : "—"
  const year = movie.year || "—"

  return (
    <div
      className="movie-card animate-scale-in cursor-pointer"
      style={{ animationDelay: `${delay}s` }}
      onClick={onClick}
    >
      <div className="relative aspect-[2/3] overflow-hidden">
        {!imageError && posterUrl ? (
          <img
            src={posterUrl || "/placeholder.svg"}
            alt={movie.title?.russian || "Без названия"}
            className={`w-full h-full object-cover transition-all duration-300 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-navy-800 flex items-center justify-center">
            {posterUrl ? (
              <div className="loading-spinner" />
            ) : (
              <span className="material-icons text-navy-600 text-4xl">movie</span>
            )}
          </div>
        )}

        {/* Loading overlay */}
        {!imageLoaded && !imageError && posterUrl && (
          <div className="absolute inset-0 bg-navy-800 flex items-center justify-center">
            <div className="loading-spinner" />
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="flex items-center justify-center mb-2">
              <span className="material-icons text-primary-500 mr-1">play_circle</span>
              <span className="text-white font-semibold">Смотреть</span>
            </div>
          </div>
        </div>
      </div>

      {/* Movie info */}
      <div className="p-4">
        <h3 className="font-semibold text-white text-sm mb-2 line-clamp-2 leading-tight">
          {movie.title?.russian || "Без названия"}
        </h3>
        <div className="flex items-center justify-between text-xs text-navy-400">
          <span>{year}</span>
          <div className="flex items-center">
            <span className="material-icons text-yellow-500 text-sm mr-1">star</span>
            <span>{rating}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
