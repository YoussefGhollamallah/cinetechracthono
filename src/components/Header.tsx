import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Header.css'

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/recherche?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery('')
    }
  }

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          CinéTech
        </Link>
        
        <div className="search-container">
          <form className="search-form" onSubmit={handleSearch}>
            <input
              type="text"
              className="search-input"
              placeholder="Rechercher un film ou une série..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="search-button">
              Rechercher
            </button>
          </form>
        </div>

        <nav className="nav">
          <Link to="/" className="nav-link">Accueil</Link>
          <Link to="/films" className="nav-link">Films</Link>
          <Link to="/series" className="nav-link">Séries</Link>
        </nav>
      </div>
    </header>
  )
}

export default Header 