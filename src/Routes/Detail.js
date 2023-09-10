import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Detail = () => {
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();

  const { id } = useParams();

  const url = `https://api.themoviedb.org/3/movie/${id}?language=ko-KR`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NTQwOThjZGZhZGIwM2U0YWNjZDc4OWU5NThhMTU0OCIsInN1YiI6IjY0ZmMzNzkxZTBjYTdmMDEwZGU4NTM5ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gSg60wlfcCgpWc9n-E2jV1uO5SqLDR0S_h9xgcMCa2w",
    },
  };

  const getMovie = async () => {
    const json = await (await fetch(url, options)).json();
    console.log(json);
    setMovie(json);
    setLoading(false);
  };

  useEffect(() => {
    getMovie();
  }, []);

  return (
    <div className="movieDetailWrap p-3">
      {loading ? (
        <div className="blurWrap movieDetail">Movie is loading...</div>
      ) : (
        <div className="movieDetail">
          <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} />
          <h1 className="text-3xl p-2">
            {movie.title}{" "}
            <span>
              {movie.original_title}({movie.original_language})
            </span>
          </h1>
          <p className="genreAndRating  p-2">
            장르 : {movie.genres.map((genre) => genre.name).join(", ")}
            <small>{movie.rating}</small>
          </p>
          <p className=" p-2">{movie.overview}</p>
          <div className="btnsWrap p-2">
            <button
              className="ytBtn p-1 m-1"
              onClick={() =>
                window.open(`https://www.youtube.com/watch?v=${movie.yt_trailer_code}`, "_blank")
              }
            >
              Youtube Trailer
            </button>
            <button className="ytBtn p-1 m-1" onClick={() => navigate("/")}>
              Back to List Page
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Detail;
