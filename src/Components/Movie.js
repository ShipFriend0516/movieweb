import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const genresList = [
  {
    id: 28,
    name: "액션",
  },
  {
    id: 12,
    name: "모험",
  },
  {
    id: 16,
    name: "애니메이션",
  },
  {
    id: 35,
    name: "코미디",
  },
  {
    id: 80,
    name: "범죄",
  },
  {
    id: 99,
    name: "다큐멘터리",
  },
  {
    id: 18,
    name: "드라마",
  },
  {
    id: 10751,
    name: "가족",
  },
  {
    id: 14,
    name: "판타지",
  },
  {
    id: 36,
    name: "역사",
  },
  {
    id: 27,
    name: "공포",
  },
  {
    id: 10402,
    name: "음악",
  },
  {
    id: 9648,
    name: "미스터리",
  },
  {
    id: 10749,
    name: "로맨스",
  },
  {
    id: 878,
    name: "SF",
  },
  {
    id: 10770,
    name: "TV 영화",
  },
  {
    id: 53,
    name: "스릴러",
  },
  {
    id: 10752,
    name: "전쟁",
  },
  {
    id: 37,
    name: "서부",
  },
];

// 장르 아이디로 장르 이름을 찾는 함수
function findGenreNameById(id) {
  // genresList 배열에서 주어진 id와 일치하는 장르를 찾습니다.
  const genre = genresList.find((genre) => genre.id === id);

  if (genre) {
    return genre.name; // 장르를 찾았으면 장르 이름을 반환합니다.
  } else {
    return "장르를 찾을 수 없음"; // 장르를 찾지 못했을 경우 메시지 반환
  }
}

const Movie = ({ id, coverImg, title, overview, genres }) => {
  return (
    <Link to={`/movie/${id}`} className="movie">
      <img src={`https://image.tmdb.org/t/p/w200${coverImg}`} alt={title} />
      <div className="flex flex-col justify-evenly">
        <h2 className="text-3xl">{title}</h2>
        <p className="flex-grow-1">
          {overview.length > 200 ? overview.split(" ").slice(0, 30).join(" ") + "..." : overview}
          {!overview && <div>No Overview...</div>}
        </p>
        <div>
          {genres.map((genre, index) => (
            <span
              className={`px-5 py-2 mx-2 rounded-lg ${
                index % 2 === 0 ? "bg-red-200" : "bg-blue-200"
              }`}
              key={genre}
            >
              {findGenreNameById(genre)}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
};

Movie.propTypes = {
  coverImg: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default Movie;
