import { useEffect, useState } from "react";
import Movie from "../Components/Movie";
import Footer from "../Components/Footer";
import christ from "../Styles/Christmas.css";

function Home() {
  const fetch = require("node-fetch");
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);

  const url = "https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NTQwOThjZGZhZGIwM2U0YWNjZDc4OWU5NThhMTU0OCIsInN1YiI6IjY0ZmMzNzkxZTBjYTdmMDEwZGU4NTM5ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gSg60wlfcCgpWc9n-E2jV1uO5SqLDR0S_h9xgcMCa2w",
    },
  };

  const getMovies = async () => {
    try {
      const response = await fetch(url, options);
      const json = await response.json();

      setMovies(json.results);
      setLoading(false);
    } catch (e) {
      console.error("에러발생 " + e.message);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div className="gridWrap">
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <div className="date">
            <span>{new Date().toLocaleDateString()}</span>
          </div>
          <h1 className="neonText">Movie List</h1>
          <div className="movieGrid">
            {movies.map((movie) => {
              return (
                <Movie
                  key={movie.id}
                  id={movie.id}
                  coverImg={movie.poster_path}
                  title={movie.title}
                  overview={movie.overview}
                  genres={movie.genre_ids}
                  vote={movie.vote_average}
                />
              );
            })}
          </div>
          <Footer />
        </>
      )}
    </div>
  );
}

export default Home;
