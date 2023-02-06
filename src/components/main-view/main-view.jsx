import {useEffect, useState} from 'react';
import {MovieCard} from '../movie-card/movie-card';
import {MovieView} from '../movie-view/movie-view';

export const MainView = () => {
    const [movies, setMovies] = useState([]);

    const [selectedMovie, setSelectedMovie] = useState(null);
    useEffect(() => {
// fetch from Heroku
//        fetch('https://myflix-12345.herokuapp.com/movies')

// fetch from Local
        fetch('http://127.0.0.1:8080/movies')

            .then((response) => response.json())
            .then((data) => {
                const moviesFromApi = data.map((movie) => { 
                    return {
                        id: movie._id,
                        title: movie.Title,
                        description: movie.Description,
                        genre: movie.Genre.Name,
                        director: movie.Director.Name,
                        image: movie.ImagePath,
                        featured: movie.Featured
                    };
                });
                setMovies(moviesFromApi);
            });
    }, []);


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