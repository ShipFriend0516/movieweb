import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

const Movie = ({id, coverImg, title, summary, genres}) => {
  return (
    <div className='movie'>
      <img src={coverImg} alt={title} />
      <div>
        <h2>
          <Link to={`/movie/${id}`}>{title}</Link>
        </h2>
        <p>{summary.length > 200 ? summary.split(' ').slice(0, 30).join(' ') : summary}</p>
        <p>Genres:</p>
        <ul>
          {genres.map((genre) =>
            <li key={genre}>{genre}</li>
          )}
        </ul>
      </div>
    </div>

  )
}

Movie.propTypes = {
  coverImg: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default Movie