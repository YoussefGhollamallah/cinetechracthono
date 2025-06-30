import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import SearchBar from './SearchBar'
import './Header.css'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  // Fermer le menu si on clique en dehors ou si on appuie sur Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeMenu()
      }
    }

    const handleResize = () => {
      if (window.innerWidth > 768) {
        closeMenu()
      }
    }

    if (isMenuOpen) {
      document.addEventListener('keydown', handleEscape)
      window.addEventListener('resize', handleResize)
      // Empêcher le scroll du body quand le menu est ouvert
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      window.removeEventListener('resize', handleResize)
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo" onClick={closeMenu}>
          CinéTech
        </Link>
        
        <div className="search-wrapper">
          <SearchBar onSearch={closeMenu} />
        </div>

        <button 
          className={`menu-toggle ${isMenuOpen ? 'nav-open' : ''}`} 
          onClick={toggleMenu}
          aria-label="Menu de navigation"
          aria-expanded={isMenuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Overlay pour fermer le menu en cliquant en dehors */}
        {isMenuOpen && (
          <div 
            className="menu-overlay" 
            onClick={closeMenu}
            aria-hidden="true"
          />
        )}

        <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
          <Link to="/" className="nav-link" onClick={closeMenu}>Accueil</Link>
          <Link to="/films" className="nav-link" onClick={closeMenu}>Films</Link>
          <Link to="/series" className="nav-link" onClick={closeMenu}>Séries</Link>
        </nav>
      </div>
    </header>
  )
}

export default Header 