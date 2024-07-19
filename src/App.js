// src/App.js (updated)
import React, { useState } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import MovieCard from './components/MovieCard/MovieCard';
import './App.css';

const App = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchMovies = async (query) => {
        setMovies([]);
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`https://openlibrary.org/search.json?q=${query}`);
            const data = await response.json();
            const filteredData = data.docs.filter((item) => item.title.toLowerCase().includes(query.toLowerCase()));
            console.log(filteredData)
            if(filteredData.length === 0) {
                setError('No Movies found');
            }
            setMovies(filteredData);
        } catch (err) {
            setError('Failed to fetch data');
        }
        setLoading(false);
    };

    return (
        <div className="App">
        <h1 className='heading'>Movie Search Application</h1>
            <SearchBar onSearch={fetchMovies} />
            {loading && (<div className="loader">
                <div className="loaderMiniContainer">
                    <div className="barContainer">
                    <span className="bar"></span>
                    <span className="bar bar2"></span>
                    </div>
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 101 114"
                    className="svgIcon"
                    >
                    <circle
                        strokeWidth="7"
                        stroke="black"
                        transform="rotate(36.0692 46.1726 46.1727)"
                        r="29.5497"
                        cy="46.1727"
                        cx="46.1726"
                    ></circle>
                    <line
                        strokeWidth="7"
                        stroke="black"
                        y2="111.784"
                        x2="97.7088"
                        y1="67.7837"
                        x1="61.7089"
                    ></line>
                    </svg>
                </div>
                </div>
            )}
            {error && <p>{error}</p>}
            <div className="movie-cards">
                {movies.map((movie) => (
                    <MovieCard key={movie.key} movie={movie} />
                ))}
            </div>
        </div>
    );
};

export default App;
