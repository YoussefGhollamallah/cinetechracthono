import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './Movies.css'

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY
const TMDB_BASE_URL = 'https://api.themoviedb.org/3'

interface Movie {
  id: number
  title: string
  poster_path: string
  overview: string
  release_date: string
  vote_average: number
}

const Movies = () => {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&language=fr-FR&page=${page}`
        )
        setMovies(response.data.results)
        setLoading(false)
      } catch (error) {
        console.error('Erreur lors de la récupération des films:', error)
        setLoading(false)
      }
    }

    fetchMovies()
  }, [page])

  if (loading) {
    return <div className="loading">Chargement...</div>
  }

  return (
    <div className="movies-page">
      <h1>Films Populaires</h1>
      
      <div className="movies-grid">
        {movies.map((movie) => (
          <Link to={`/movie/${movie.id}`} key={movie.id} className="movie-card">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <div className="movie-info">
              <h2>{movie.title}</h2>
              <div className="movie-meta">
                <span className="release-date">
                  {new Date(movie.release_date).getFullYear()}
                </span>
                <span className="rating">
                  ★ {movie.vote_average.toFixed(1)}
                </span>
              </div>
              <p>{movie.overview.substring(0, 100)}...</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="pagination">
        <button
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          Précédent
        </button>
        <span>Page {page}</span>
        <button onClick={() => setPage(p => p + 1)}>
          Suivant
        </button>
      </div>
    </div>
  )
}

export default Movies 