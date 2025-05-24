import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './SearchBar.css'

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY
const TMDB_BASE_URL = 'https://api.themoviedb.org/3'

interface SearchSuggestion {
  id: number
  title?: string
  name?: string
  media_type: 'movie' | 'tv'
  poster_path: string
}

interface SearchBarProps {
  onSearch?: () => void
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const searchRef = useRef<HTMLDivElement>(null)
  const debounceRef = useRef<number>()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const fetchSuggestions = async (query: string) => {
    if (query.length < 2) {
      setSuggestions([])
      setShowSuggestions(false)
      return
    }

    setLoading(true)
    try {
      const response = await axios.get(
        `${TMDB_BASE_URL}/search/multi?api_key=${TMDB_API_KEY}&language=fr-FR&query=${encodeURIComponent(query)}`
      )
      
      const filteredResults = response.data.results
        .filter((item: any) => item.media_type === 'movie' || item.media_type === 'tv')
        .slice(0, 5)
        .map((item: any) => ({
          id: item.id,
          title: item.title,
          name: item.name,
          media_type: item.media_type,
          poster_path: item.poster_path
        }))

      setSuggestions(filteredResults)
      setShowSuggestions(true)
    } catch (error) {
      console.error('Erreur lors de la récupération des suggestions:', error)
      setSuggestions([])
    }
    setLoading(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchQuery(value)

    // Debounce pour éviter trop de requêtes
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }

    debounceRef.current = setTimeout(() => {
      fetchSuggestions(value)
    }, 300)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/recherche?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery('')
      setShowSuggestions(false)
      onSearch?.()
    }
  }

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    navigate(`/${suggestion.media_type}/${suggestion.id}`)
    setSearchQuery('')
    setShowSuggestions(false)
    onSearch?.()
  }

  const handleInputFocus = () => {
    if (suggestions.length > 0) {
      setShowSuggestions(true)
    }
  }

  return (
    <div className="search-container" ref={searchRef}>
      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          className="search-input"
          placeholder="Rechercher un film ou une série..."
          value={searchQuery}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
        />
        <button type="submit" className="search-button">
          🔍
        </button>
      </form>

      {showSuggestions && (
        <div className="suggestions-dropdown">
          {loading && (
            <div className="suggestion-item loading-suggestion">
              Recherche en cours...
            </div>
          )}
          
          {!loading && suggestions.length === 0 && searchQuery.length >= 2 && (
            <div className="suggestion-item no-results">
              Aucun résultat trouvé
            </div>
          )}

          {!loading && suggestions.map((suggestion) => (
            <div
              key={`${suggestion.media_type}-${suggestion.id}`}
              className="suggestion-item"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <div className="suggestion-poster">
                {suggestion.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w92${suggestion.poster_path}`}
                    alt={suggestion.title || suggestion.name}
                  />
                ) : (
                  <div className="poster-placeholder">🎬</div>
                )}
              </div>
              <div className="suggestion-info">
                <div className="suggestion-title">
                  {suggestion.title || suggestion.name}
                </div>
                <div className="suggestion-type">
                  {suggestion.media_type === 'movie' ? 'Film' : 'Série'}
                </div>
              </div>
            </div>
          ))}

          {!loading && suggestions.length > 0 && (
            <div className="suggestion-item see-all" onClick={handleSearch}>
              Voir tous les résultats pour "{searchQuery}"
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default SearchBar 