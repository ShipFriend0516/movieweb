import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Detail = () => {
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState(null);
  const [movieVideo, setMovieVideo] = useState(null);
  const navigate = useNavigate();

  const fetch = require("node-fetch");
  const { id } = useParams();

  const url = `https://api.themoviedb.org/3/movie/${id}?language=ko-KR`;
  const urlForVideo = `https://api.themoviedb.org/3/movie/${id}/videos?language=ko-KR`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
    },
  };

  const getMovie = async () => {
    const json = await (await fetch(url, options)).json();
    console.log(json);
    setMovie(json);
    // setLoading(false);
  };

  const getMovieVideo = async () => {
    const json = await (await fetch(urlForVideo, options)).json();
    console.log("json2", json);
    setMovieVideo(json);
    setLoading(false);
  };

  useEffect(() => {
    getMovie();
    getMovieVideo();
  }, []);

  return (
    <div className="movieDetailWrap p-3 backgroundGradient">
      {loading ? (
        <div className="blurWrap movieDetail">Movie is loading...</div>
      ) : (
        <>
          <div className="movieDetail">
            <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt="poster" />
            <h1 className="text-3xl p-2 mt-3">
              {movie.title}{" "}
              <span>
                {movie.original_title}({movie.original_language})
              </span>
            </h1>
            <h2 className="text-gray-700 px-2">{movie.tagline}</h2>
            <p className="genreAndRating items-center p-2">
              <span className="">
                <span className="bg-gray-500 text-white rounded-md px-2 py-1">장르</span> :{" "}
                {movie.genres.map((genre, index) => {
                  const colors = [
                    "bg-red-200",
                    "bg-orange-200",
                    "bg-yellow-200",
                    "bg-green-200",
                    "bg-blue-200",
                    "bg-indigo-300",
                    "bg-purple-200",
                  ];
                  const colorIndex = index % colors.length;
                  const selectedColor = colors[colorIndex];

                  return (
                    <span
                      className={`${selectedColor} text-black rounded-md px-2 py-1 me-2`}
                      key={genre.id}
                    >
                      {genre.name}
                    </span>
                  );
                })}
              </span>
              <small
                className={`rating w-10 h-10 flex justify-center items-center rounded-full font-light ${
                  movie.vote_average < 7 ? "bg-red-300" : "bg-green-300"
                }`}
              >
                {movie.vote_average.toFixed(1)}
              </small>
            </p>
            <p className="p-2">{movie.overview}</p>
            <div className="btnsWrap p-2">
              <button
                className="ytBtn p-1 m-1"
                onClick={() => {
                  console.log(movieVideo);
                  window.open(
                    `https://www.youtube.com/watch?v=${movieVideo.results[0].key}`,
                    "_blank"
                  );
                }}
                disabled={movieVideo.results.length !== 0 ? 0 : 1}
              >
                Youtube Trailer
              </button>
              <button className="ytBtn p-1 m-1" onClick={() => navigate("/")}>
                Back to List Page
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Detail;
