import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Movies from './pages/Movies'
import Series from './pages/Series'
import Search from './pages/Search'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/films" element={<Movies />} />
            <Route path="/series" element={<Series />} />
            <Route path="/recherche" element={<Search />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App 