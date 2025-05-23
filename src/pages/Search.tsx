import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/Search.css';

interface SearchResult {
  id: number;
  title?: string;
  name?: string;
  poster_path: string;
  overview: string;
  media_type: 'movie' | 'tv';
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
}

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const searchMedia = async () => {
      if (!query) {
        setResults([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const [moviesResponse, seriesResponse] = await Promise.all([
          axios.get(
            `https://api.themoviedb.org/3/search/movie?api_key=${
              import.meta.env.VITE_TMDB_API_KEY
            }&query=${encodeURIComponent(query)}&language=fr-FR`
          ),
          axios.get(
            `https://api.themoviedb.org/3/search/tv?api_key=${
              import.meta.env.VITE_TMDB_API_KEY
            }&query=${encodeURIComponent(query)}&language=fr-FR`
          ),
        ]);

        const movies = moviesResponse.data.results.map((movie: any) => ({
          ...movie,
          media_type: 'movie',
        }));
        const series = seriesResponse.data.results.map((show: any) => ({
          ...show,
          media_type: 'tv',
        }));

        const allResults = [...movies, ...series].sort(
          (a, b) => b.vote_average - a.vote_average
        );

        setResults(allResults);
      } catch (error) {
        console.error('Erreur lors de la recherche:', error);
      } finally {
        setLoading(false);
      }
    };

    searchMedia();
  }, [query]);

  if (loading) {
    return (
      <div className="search-page">
        <div className="loading">Chargement des résultats...</div>
      </div>
    );
  }

  return (
    <div className="search-page">
      <h1>Résultats de recherche pour "{query}"</h1>
      {results.length === 0 ? (
        <p className="no-results">Aucun résultat trouvé</p>
      ) : (
        <div className="results-grid">
          {results.map((result) => (
            <div key={`${result.media_type}-${result.id}`} className="result-card">
              <img
                src={`https://image.tmdb.org/t/p/w500${result.poster_path}`}
                alt={result.title || result.name}
                className="result-poster"
              />
              <div className="result-info">
                <h3>{result.title || result.name}</h3>
                <p className="result-type">
                  {result.media_type === 'movie' ? 'Film' : 'Série'}
                </p>
                <p className="result-date">
                  {result.media_type === 'movie'
                    ? result.release_date?.split('-')[0]
                    : result.first_air_date?.split('-')[0]}
                </p>
                <p className="result-rating">
                  Note: {result.vote_average.toFixed(1)}/10
                </p>
                <p className="result-overview">{result.overview}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search; 