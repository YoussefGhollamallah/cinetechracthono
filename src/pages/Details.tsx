import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './Details.css'

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY
const TMDB_BASE_URL = 'https://api.themoviedb.org/3'

interface MediaDetails {
  id: number
  title?: string
  name?: string
  poster_path: string
  backdrop_path: string
  overview: string
  vote_average: number
  vote_count: number
  release_date?: string
  first_air_date?: string
  runtime?: number
  number_of_seasons?: number
  number_of_episodes?: number
  genres: { id: number; name: string }[]
  production_companies: { id: number; name: string; logo_path: string }[]
  credits: {
    cast: { id: number; name: string; character: string; profile_path: string }[]
    crew: { id: number; name: string; job: string; profile_path: string }[]
  }
}

const Details = () => {
  const { type, id } = useParams<{ type: string; id: string }>()
  const navigate = useNavigate()
  const [media, setMedia] = useState<MediaDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMediaDetails = async () => {
      if (!type || !id) {
        setError('Paramètres invalides')
        setLoading(false)
        return
      }

      try {
        const mediaType = type === 'movie' ? 'movie' : 'tv'
        const [detailsResponse, creditsResponse] = await Promise.all([
          axios.get(`${TMDB_BASE_URL}/${mediaType}/${id}?api_key=${TMDB_API_KEY}&language=fr-FR`),
          axios.get(`${TMDB_BASE_URL}/${mediaType}/${id}/credits?api_key=${TMDB_API_KEY}&language=fr-FR`)
        ])

        const mediaData = {
          ...detailsResponse.data,
          credits: creditsResponse.data
        }

        setMedia(mediaData)
        setLoading(false)
      } catch (error) {
        console.error('Erreur lors de la récupération des détails:', error)
        setError('Erreur lors du chargement des détails')
        setLoading(false)
      }
    }

    fetchMediaDetails()
  }, [type, id])

  if (loading) {
    return <div className="loading">Chargement des détails...</div>
  }

  if (error || !media) {
    return (
      <div className="error">
        <p>{error || 'Média non trouvé'}</p>
        <button onClick={() => navigate(-1)} className="back-button">
          Retour
        </button>
      </div>
    )
  }

  const director = media.credits.crew.find(person => person.job === 'Director')
  const mainCast = media.credits.cast.slice(0, 6)

  return (
    <div className="details">
      <button onClick={() => navigate(-1)} className="back-button">
        ← Retour
      </button>

      <div className="details-hero">
        {media.backdrop_path && (
          <div 
            className="backdrop"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/w1280${media.backdrop_path})`
            }}
          />
        )}
        <div className="details-content">
          <div className="poster-section">
            <img
              src={`https://image.tmdb.org/t/p/w500${media.poster_path}`}
              alt={media.title || media.name}
              className="details-poster"
            />
          </div>
          
          <div className="info-section">
            <h1 className="details-title">{media.title || media.name}</h1>
            
            <div className="rating">
              <span className="star">⭐</span>
              <span className="score">{media.vote_average.toFixed(1)}/10</span>
              <span className="votes">({media.vote_count} votes)</span>
            </div>

            <div className="meta-info">
              <p><strong>Date de sortie:</strong> {media.release_date || media.first_air_date}</p>
              {media.runtime && <p><strong>Durée:</strong> {media.runtime} minutes</p>}
              {media.number_of_seasons && (
                <p><strong>Saisons:</strong> {media.number_of_seasons} ({media.number_of_episodes} épisodes)</p>
              )}
              <p><strong>Genres:</strong> {media.genres.map(genre => genre.name).join(', ')}</p>
              {director && <p><strong>Réalisateur:</strong> {director.name}</p>}
            </div>

            <div className="overview">
              <h3>Synopsis</h3>
              <p>{media.overview || 'Aucun synopsis disponible.'}</p>
            </div>
          </div>
        </div>
      </div>

      {mainCast.length > 0 && (
        <section className="cast-section">
          <h2>Distribution principale</h2>
          <div className="cast-grid">
            {mainCast.map((actor) => (
              <div key={actor.id} className="cast-card">
                {actor.profile_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                    alt={actor.name}
                    className="actor-photo"
                  />
                ) : (
                  <div className="actor-placeholder">👤</div>
                )}
                <div className="actor-info">
                  <h4>{actor.name}</h4>
                  <p>{actor.character}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

export default Details 