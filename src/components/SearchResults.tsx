import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './SearchResults.css'

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY
const TMDB_BASE_URL = 'https://api.themoviedb.org/3'

interface SearchResult {
  id: number
  title?: string
  name?: string
  poster_path: string
  overview: string
  media_type: 'movie' | 'tv'
  release_date?: string
  first_air_date?: string
  vote_average: number
}

interface SearchResultsProps {
  query: string
}

const SearchResults = ({ query }: SearchResultsProps) => {
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const searchMedia = async () => {
      if (!query.trim()) {
        setResults([])
        setLoading(false)
        return
      }

      try {
        const [moviesResponse, seriesResponse] = await Promise.all([
          axios.get(
            `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&language=fr-FR&query=${encodeURIComponent(query)}`
          ),
          axios.get(
            `${TMDB_BASE_URL}/search/tv?api_key=${TMDB_API_KEY}&language=fr-FR&query=${encodeURIComponent(query)}`
          )
        ])

        const movies = moviesResponse.data.results.map((movie: any) => ({
          ...movie,
          media_type: 'movie'
        }))
        const series = seriesResponse.data.results.map((show: any) => ({
          ...show,
          media_type: 'tv'
        }))

        setResults([...movies, ...series].sort((a, b) => b.vote_average - a.vote_average))
        setLoading(false)
      } catch (error) {
        console.error('Erreur lors de la recherche:', error)
        setLoading(false)
      }
    }

    const debounceTimer = setTimeout(searchMedia, 500)
    return () => clearTimeout(debounceTimer)
  }, [query])

  if (loading) {
    return <div className="loading">Recherche en cours...</div>
  }

  if (!query.trim()) {
    return null
  }

  if (results.length === 0) {
    return <div className="no-results">Aucun résultat trouvé pour "{query}"</div>
  }

  return (
    <div className="search-results">
      <h2>Résultats pour "{query}"</h2>
      <div className="results-grid">
        {results.map((result) => (
          <Link
            to={`/${result.media_type}/${result.id}`}
            key={`${result.media_type}-${result.id}`}
            className="result-card"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${result.poster_path}`}
              alt={result.title || result.name}
            />
            <div className="result-info">
              <h3>{result.title || result.name}</h3>
              <div className="result-meta">
                <span className="type">
                  {result.media_type === 'movie' ? 'Film' : 'Série'}
                </span>
                <span className="date">
                  {new Date(result.release_date || result.first_air_date || '').getFullYear()}
                </span>
                <span className="rating">★ {result.vote_average.toFixed(1)}</span>
              </div>
              <p>{result.overview.substring(0, 100)}...</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default SearchResults 