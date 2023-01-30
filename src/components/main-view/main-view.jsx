import {useState} from 'react';
import {MovieCard} from '../movie-card/movie-card';
import {MovieView} from '../movie-view/movie-view';

export const MainView = () => {
    const [movies, setMovies] = useState([
        {
            id: 1,
            title: "Jurassic Park",
            genre: "Adventure",
            director: "Steven Spielberg",
            image: "https://m.media-amazon.com/images/I/7146s0GzEUL._AC_UY218_.jpg"
        },
        {
            id: 2,
            title: "Indiana Jones",
            genre: "Adventure",
            director: "Steven Spielberg",
            image: "https://m.media-amazon.com/images/I/81rzIG1yfaS._AC_UY218_.jpg"
        },
        {
            id: 3,
            title: "Lion King",
            genre: "Animated",
            director: "Jon Favreau",
            image: "https://m.media-amazon.com/images/I/81aLWmKrNVL._AC_UY218_.jpg"
        }
    ]);

    const [selectedMovie, setSelectedMovie] = useState(null);

    if (selectedMovie){
        return(
            <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
        );
    }
    if (movies.length === 0){
        return <div>The list is empty!</div>;
    }

    return(
        <div>
            {movies.map((movie) => {
                return <MovieCard
                    key={movie.id}
                    movie={movie}
                    onMovieClick={(newSelectedMovie) => {
                        setSelectedMovie(newSelectedMovie);
                    }}
                />;
            })}
        </div>
    );
};