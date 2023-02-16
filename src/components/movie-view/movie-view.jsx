import PropTypes from 'prop-types';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

export const MovieView = ({movies}) => {
    const {movieId} = useParams();
    const movie = movies.find((m) => m.id === movieId);

    return (
        <div>
            <div>
                <img src={movie.image} />
            </div>
            <div>
                <span>Title: </span>
                <span>{movie.title}</span>
            </div>
            <div>
                <span>Description: </span>
                <span>{movie.description}</span>
            </div>
            <div>
                <span>Genre: </span>
                <span>{movie.genre}</span>
            </div>
            <div>
                <span>Director: </span>
                <span>{movie.director}</span>
            </div>
            <Link to={`/`}>
                <button>BACK</button>
            </Link>
        </div>
    );
};

MovieView.propTypes = {
    movies: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        genre: PropTypes.string.isRequired,
        director: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        featured: PropTypes.bool
    }).isRequired,
    onBackClick: PropTypes.func.isRequired
};