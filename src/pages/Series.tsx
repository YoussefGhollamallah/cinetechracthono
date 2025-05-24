import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './Series.css'

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY
const TMDB_BASE_URL = 'https://api.themoviedb.org/3'

interface Series {
  id: number
  name: string
  poster_path: string
  overview: string
  first_air_date: string
  vote_average: number
}

const Series = () => {
  const [series, setSeries] = useState<Series[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const response = await axios.get(
          `${TMDB_BASE_URL}/tv/popular?api_key=${TMDB_API_KEY}&language=fr-FR&page=${page}`
        )
        setSeries(response.data.results)
        setLoading(false)
      } catch (error) {
        console.error('Erreur lors de la récupération des séries:', error)
        setLoading(false)
      }
    }

    fetchSeries()
  }, [page])

  if (loading) {
    return <div className="loading">Chargement...</div>
  }

  return (
    <div className="series-page">
      <div className="page-header">
        <h1>Séries Populaires</h1>
        <p>Découvrez les séries les plus populaires du moment</p>
      </div>
      
      <div className="series-grid">
        {series.map((show) => (
          <div key={show.id} className="series-card">
            <Link to={`/tv/${show.id}`} className="series-poster-link">
              <img
                src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                alt={show.name}
              />
            </Link>
            <div className="series-info">
              <h2>{show.name}</h2>
              <Link to={`/tv/${show.id}`} className="details-button">
                Voir les détails
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1}
          className="pagination-button"
        >
          ← Précédent
        </button>
        <span className="page-info">Page {page}</span>
        <button 
          onClick={() => setPage(p => p + 1)}
          className="pagination-button"
        >
          Suivant →
        </button>
      </div>
    </div>
  )
}

export default Series 