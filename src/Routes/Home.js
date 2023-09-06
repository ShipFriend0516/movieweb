import { useEffect, useState } from 'react';
import Movie from '../Components/Movie';

function Home() {

  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);

  const getMovies = async () => {
    const json = await (
      await fetch(
        'https://yts.mx/api/v2/list_movies.json?sort_by=rating&order_by=desc&limit=20&year=2023'
        )
      ).json()
    setMovies(json.data.movies);
    setLoading(false);
  }

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div className='gridWrap'>
      {loading ? <h1>Loading...</h1> 
      :
      <>
      <div className='date'>
        <span>{new Date().toLocaleDateString()}</span>
      </div>
      <h1>Movie List</h1>
      <div className='movieGrid'>
        {movies.map((movie) => {
          return (
            <Movie
              key={movie.id}
              id={movie.id}
              coverImg={movie.medium_cover_image}
              title={movie.title}
              summary={movie.summary}
              genres={movie.genres}
              />
          )
        })}
      </div>
      </>
      }
    </div>
  );
}

export default Home;
