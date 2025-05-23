import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>À propos</h3>
          <p>CinéTech est votre destination pour découvrir les meilleurs films et séries.</p>
        </div>
        
        <div className="footer-section">
          <h3>Liens utiles</h3>
          <ul>
            <li><a href="/films">Films</a></li>
            <li><a href="/series">Séries</a></li>
            <li><a href="/tendances">Tendances</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Contact</h3>
          <p>Email: contact@cinetech.com</p>
          <div className="social-links">
            <a href="#" className="social-link">Twitter</a>
            <a href="#" className="social-link">Facebook</a>
            <a href="#" className="social-link">Instagram</a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2024 CinéTech. Tous droits réservés.</p>
      </div>
    </footer>
  )
}

export default Footer 