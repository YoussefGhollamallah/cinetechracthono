import { useState } from 'react'
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

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo" onClick={closeMenu}>
          CinéTech
        </Link>
        
        <div className="search-wrapper">
          <SearchBar onSearch={closeMenu} />
        </div>

        <button className="menu-toggle" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </button>

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