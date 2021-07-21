import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {

  const [movies, setMovies] =  useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  async function fetchMoviesHandler() {
    setIsLoading(true);
    setError(null);
    try{
      const response = await fetch('https://swapi.dev/api/films');

      if(!response.ok){
        throw new Error("Something went wrong");
      }
        const data  = await response.json();
          const transformedMovies = data.results.map(movieData => {
            return {
              id: movieData.episode_id,
              title: movieData.title,
              releaseDate: movieData.release_date,
              openingText: movieData.opening_crawl
            };
        });
      setMovies(transformedMovies);
    } catch(error){
      setError(error.message);
      console.log(error);
    }
    setIsLoading(false);

  }
  // Alternative way to bind the renders
  // let content = <p>No Movies Found</p>;

  // if(movies.length > 0) {
  //   content = <MoviesList movies={movies} />
  // }

  // if(isLoading) {
  //   contet = <p>Loading...</p>
  // }

  // if(error){
  //   content = <p>{error}</p>
  // }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && !error && <p>No Movie Found</p>}
        {!isLoading && error && <p>{error}</p>}
        {isLoading &&  <p>Loading...</p>} 
      </section>
    </React.Fragment>
  );
}

export default App;
