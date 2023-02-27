import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

export const MovieCard = ({movie, user, token, activeUser}) => {

    const addFavorite = () => {
        fetch(`https://myflix-12345.herokuapp.com/users/${user.Username}/movies/${movie.id}`, {
            method: 'POST',
            headers: { Authorization: `Bearer ${token}` }
        });
    };

    const removeFavorite = () => {
        fetch(`https://myflix-12345.herokuapp.com/users/${user.Username}/movies/${movie.id}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` }
        });
    }

    return(
        <Card className="h-100">
            <Card.Img variant="top" src={movie.image} />
            <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>
                    Director: {movie.director}
                    <br></br>
                    Genre: {movie.genre}
                </Card.Text>
                <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
                    <Button variant="link">OPEN</Button>
                </Link>
                {!activeUser.favorites.includes(movie.id) ? (
                    <Button onClick={addFavorite}>Add favorite</Button>
                ) : (
                    <Button onClick={removeFavorite}>Remove favorite</Button>
                )}
            </Card.Body>
        </Card>
    );
};

MovieCard.propTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        genre: PropTypes.string.isRequired,
        director: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        featured: PropTypes.bool
    }).isRequired
};