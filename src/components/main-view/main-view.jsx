import { useEffect, useState } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { NavigationBar } from '../navigation-bar/navigation-bar';

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const storedToken = localStorage.getItem('token');
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [user, setUser] = useState(storedUser? storedUser : null);
    const [token, setToken] = useState(storedToken? storedToken : null);

    useEffect(() => {
        if(!token) {
            return;
        }

// fetch from Heroku
       fetch('https://myflix-12345.herokuapp.com/movies', {
        headers: { Authorization: `Bearer ${token}` }
        })

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
// end fetch from Heroku

// fetch from Local
        // fetch('http://127.0.0.1:8080/movies', {
        //     headers: { Authorization: `Bearer ${token}` }
        // })

        //     .then((response) => response.json())
        //     .then((data) => {
        //         const moviesFromApi = data.map((movie) => { 
        //             return {
        //                 id: movie._id,
        //                 title: movie.Title,
        //                 description: movie.Description,
        //                 genre: movie.Genre.Name,
        //                 director: movie.Director.Name,
        //                 image: movie.ImagePath,
        //                 featured: movie.Featured
        //             };
        //         });
        //         setMovies(moviesFromApi);
        //     });
// end fetch from Local

    }, [token]);

    return(
        <BrowserRouter>
            <NavigationBar
                user={user}
                onLoggedOut={() => {
                    setUser(null);
                    setToken(null);
                    localStorage.clear();
                }}
            />
            <Row className="justify-content-center text-white">
                <Routes>
                    <Route
                        path="/signup"
                        element={
                            <>
                                {user ? (
                                    <Navigate to="/" />
                                ) : (
                                    <Col md={5}>
                                        <SignupView />
                                    </Col>
                                )}
                            </>
                        }
                    />
                    <Route 
                        path="/login"
                        element={
                            <>
                                {user ? (
                                    <Navigate to="/" />
                                ) : (
                                    <Col md={5}>
                                        <LoginView onLoggedIn={(user, token) => {
                                            setUser(user);
                                            setToken(token);
                                            }}
                                        />
                                    </Col>
                                )}
                            </>
                        }
                    />
                    <Route
                        path="/movies/:movieId"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : movies.length === 0 ? (
                                    <Col>The list is empty!</Col>
                                ) : (
                                    <Col md={8}>
                                        <MovieView movies={movies} />
                                    </Col>
                                )}
                            </>
                        }
                    />
                    <Route
                        path="/"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : movies.length === 0 ? (
                                    <Col>The list is empty!</Col>
                                ) : (
                                    <>
                                        {movies.map((movie) => {
                                            return (
                                                <Col className="mb-3" key={movie.id} md={3} >
                                                    <MovieCard movie={movie} />
                                                </Col>
                                            )
                                        })}
                                    </>
                                )}
                            </>
                        }
                    />


                    {/* {!user ? (
                        <Col md={5}>
                            <LoginView
                                onLoggedIn={(user, token) => {
                                    setUser(user);
                                    setToken(token);
                                }}
                            />
                            or
                            <SignupView />
                        </Col>
                    ) : selectedMovie ? (
                        <Col md={8}>
                            <MovieView
                                movie={selectedMovie}
                                onBackClick={() => setSelectedMovie(null)}
                            />
                        </Col>
                    ) : movies.length === 0 ? (
                        <div>The list is empty!</div>
                    ) : (
                        <>
                            <Col md="12" className="mb-5">
                                <Button
                                    variant="primary"
                                    onClick={() => {
                                        setUser(null);
                                        setToken(null);
                                        localStorage.clear();
                                    }}
                                >
                                    LOGOUT
                                </Button>
                            </Col>

                            {movies.map((movie) => {
                                return(
                                    <Col key={movie.id} className="mb-3" md={3}>
                                        <MovieCard
                                            movie={movie}
                                            onMovieClick={(newSelectedMovie) => {
                                                setSelectedMovie(newSelectedMovie);
                                            }}
                                        />
                                    </Col>
                                );
                            })}

                            
                        </>
                    )} */}
                </Routes>
            </Row>
        </BrowserRouter>
    );
};