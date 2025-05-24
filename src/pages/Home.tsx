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
  const [popularMedia, setPopularMedia] = useState<Media[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPopularMedia = async () => {
      try {
        const [moviesResponse, seriesResponse] = await Promise.all([
          axios.get(`${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&language=fr-FR`),
          axios.get(`${TMDB_BASE_URL}/tv/popular?api_key=${TMDB_API_KEY}&language=fr-FR`)
        ])

        const movies = moviesResponse.data.results.map((movie: any) => ({
          ...movie,
          media_type: 'movie'
        }))
        const series = seriesResponse.data.results.map((show: any) => ({
          ...show,
          media_type: 'tv'
        }))

        setPopularMedia([...movies, ...series].sort(() => Math.random() - 0.5).slice(0, 12))
        setLoading(false)
      } catch (error) {
        console.error('Erreur lors de la récupération des médias:', error)
        setLoading(false)
      }
    }

    fetchPopularMedia()
  }, [])

  if (loading) {
    return <div className="loading">Chargement...</div>
  }

  return (
    <div className="home">
      <section className="hero">
        <h1>Bienvenue sur CinéTech</h1>
        <p>Découvrez les meilleurs films et séries du moment</p>
      </section>

      <section className="popular-media">
        <h2>Tendances</h2>
        <div className="media-grid">
          {popularMedia.map((media) => (
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
    </div>
  )
}

export default Home 