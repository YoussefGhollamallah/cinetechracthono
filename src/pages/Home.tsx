import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './Home.css'

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY
const TMDB_BASE_URL = 'https://api.themoviedb.org/3'

interface Media {
  id: number
  title?: string
  name?: string
  poster_path: string
  overview: string
  media_type: 'movie' | 'tv'
}

const Home = () => {
  const [popularMovies, setPopularMovies] = useState<Media[]>([])
  const [popularSeries, setPopularSeries] = useState<Media[]>([])
  const [trendingMovies, setTrendingMovies] = useState<Media[]>([])
  const [trendingSeries, setTrendingSeries] = useState<Media[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAllMedia = async () => {
      try {
        const [popularMoviesRes, popularSeriesRes, trendingMoviesRes, trendingSeriesRes] = await Promise.all([
          axios.get(`${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&language=fr-FR`),
          axios.get(`${TMDB_BASE_URL}/tv/popular?api_key=${TMDB_API_KEY}&language=fr-FR`),
          axios.get(`${TMDB_BASE_URL}/trending/movie/week?api_key=${TMDB_API_KEY}&language=fr-FR`),
          axios.get(`${TMDB_BASE_URL}/trending/tv/week?api_key=${TMDB_API_KEY}&language=fr-FR`)
        ])

        const movies = popularMoviesRes.data.results.slice(0, 8).map((movie: any) => ({
          ...movie,
          media_type: 'movie'
        }))
        
        const series = popularSeriesRes.data.results.slice(0, 8).map((show: any) => ({
          ...show,
          media_type: 'tv'
        }))

        const trendingMoviesData = trendingMoviesRes.data.results.slice(0, 8).map((movie: any) => ({
          ...movie,
          media_type: 'movie'
        }))

        const trendingSeriesData = trendingSeriesRes.data.results.slice(0, 8).map((show: any) => ({
          ...show,
          media_type: 'tv'
        }))

        setPopularMovies(movies)
        setPopularSeries(series)
        setTrendingMovies(trendingMoviesData)
        setTrendingSeries(trendingSeriesData)
        setLoading(false)
      } catch (error) {
        console.error('Erreur lors de la récupération des médias:', error)
        setLoading(false)
      }
    }

    fetchAllMedia()
  }, [])

  const renderMediaSection = (title: string, mediaList: Media[]) => (
    <section className="media-section">
      <h2>{title}</h2>
      <div className="media-grid">
        {mediaList.map((media) => (
          <div key={media.id} className="media-card">
            <Link
              to={`/${media.media_type}/${media.id}`}
              className="media-poster-link"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${media.poster_path}`}
                alt={media.title || media.name}
              />
            </Link>
            <div className="media-info">
              <h3>{media.title || media.name}</h3>
              <Link
                to={`/${media.media_type}/${media.id}`}
                className="details-button"
              >
                Voir les détails
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  )

  if (loading) {
    return <div className="loading">Chargement...</div>
  }

  return (
    <div className="home">
      <section className="hero">
        <h1>Bienvenue sur CinéTech</h1>
        <p>Découvrez les meilleurs films et séries du moment</p>
      </section>

      {renderMediaSection("Films Populaires", popularMovies)}
      {renderMediaSection("Séries Populaires", popularSeries)}
      {renderMediaSection("Films Tendance", trendingMovies)}
      {renderMediaSection("Séries Tendance", trendingSeries)}
    </div>
  )
}

export default Home 