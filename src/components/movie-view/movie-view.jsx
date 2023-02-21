import PropTypes from 'prop-types';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './movie-view.scss';

export const MovieView = ({movies}) => {
    const {movieId} = useParams();
    const movie = movies.find((m) => m.id === movieId);

    return (
        <Card>
            <Card.Img variant="top" src={movie.image} className="card-image"/>
            <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>
                
            
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
           
                </Card.Text>
                <Link to={`/`}>
                <Button>BACK</Button>
            </Link>
            </Card.Body>


        
        </Card>
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