import { useEffect, useState } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import { ProfileView } from '../profile-view/profile-view';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { NavigationBar } from '../navigation-bar/navigation-bar';

import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Button from 'react-bootstrap/Button';
import { ToggleButtonGroup } from 'react-bootstrap';

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const storedToken = localStorage.getItem('token');
    const [movies, setMovies] = useState([]);
    const [user, setUser] = useState(storedUser? storedUser : null);
    const [token, setToken] = useState(storedToken? storedToken : null);
    const [activeUser, setActiveUser] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [checked, setChecked] = useState(false);
    const [genreList, setGenreList] = useState([]);
    const [directorList, setDirectorList] = useState([]);
    const [moviesToRender, setMoviesToRender] = useState([]);

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
                setMoviesToRender(moviesFromApi);

                
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

    useEffect(() => {
        if(!token) {
            return;
        }
        fetch('https://myflix-12345.herokuapp.com/users', {
            method: 'GET',
            headers: { Authorization: `Bearer ${token}` }
        }).then((response) => response.json())
        .then((data) => {
            const usersFromApi = data.map((user) => {
                return {
                    id: user._id,
                    username: user.Username,
                    password: user.Password,
                    email: user.Email,
                    birthday: user.Birthday,
                    favorites: user.Favorites
                };
            });
            let activeUserArray = usersFromApi.filter(u => user.Username.includes(u.username));
            setActiveUser(activeUserArray[0]);

            let favoritesMovies = movies.filter(m => activeUser.favorites.includes(m.id));
            setFavorites(favoritesMovies);
        });
        
    });

    // const handleFilter = (e) => {
    //     setChecked(e.currentTarget.checked);
        

    //     // console.log(moviesToRender);
    //     // let genres = movies.map(movie => movie.genre);
    //     // console.log(genres);

    //     let uniqueGenres = [...new Set(movies.map(movie => movie.genre))];
    //     console.log(uniqueGenres);
    //     // movies.map((movie) => {
    //     //     return console.log(movie.genre);
    //     // });

        
    // };

    useEffect(() => {
        if(!movies){
            return;
        }
            let genres = movies.map(movie => movie.genre);
            let uniqueGenres = [...new Set(genres)];
            setGenreList(uniqueGenres);
            console.log(genreList);

            let directors = movies.map(movie => movie.director);
            let uniqueDirectors = [...new Set(directors)];
            setDirectorList(uniqueDirectors);
            console.log(directorList);

    }, [movies]);

    const handleFilter = (chosenFilters) => {
        if (chosenFilters.length === 0){
            setMoviesToRender(movies);
        } else {
            let filteredMoviesArray = movies.map(m => {
                if (chosenFilters.includes(m.genre)){
                    return m;
                } else if (chosenFilters.includes(m.director)){
                    return m;
                }
            });
            // remove undefined from filteredMoviesArray
            let filteredMovies = filteredMoviesArray.filter(e => e !== undefined);
            setMoviesToRender(filteredMovies);
        }    
    };

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
            <Row>
                
                <DropdownButton id="dropdown-item-button" drop="end" title="Filter by">
                    <DropdownButton id="dropdownindropdown" title="Genre">
                        <>
                            <ToggleButtonGroup type="checkbox" className="mb-2" onChange={handleFilter}>
                                {genreList.map((genre) => {
                                    return <ToggleButton id={'tbg-check-1' + genreList.indexOf(genre)} value={genre}>{genre}</ToggleButton>
                                })}
                            </ToggleButtonGroup>
                        </>

                    </DropdownButton>
                    <DropdownButton id="dorp" title="Director">
                        <>
                            <ToggleButtonGroup type="checkbox" className="mb-2" onChange={handleFilter}>
                                {directorList.map((director) => {
                                    return <ToggleButton id={'tbg-check-2' + directorList.indexOf(director)} value={director}>{director}</ToggleButton>
                                })}
                            </ToggleButtonGroup>

                        </>
                    </DropdownButton>
                </DropdownButton>


            </Row>
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
                                        {moviesToRender.map((movie) => {
                                            return (
                                                <Col className="mb-3" key={movie.id} md={3} >
                                                    <MovieCard movie={movie} user={user} token={token} activeUser={activeUser}/>
                                                </Col>
                                            )
                                        })}
                                    </>
                                )}
                            </>
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : (
                                    <Col>
                                        <ProfileView user={user} token={token} favorites={favorites} activeUser={activeUser}/>
                                    </Col>
                                )}
                            </>
                        }
                    />

                </Routes>
            </Row>
        </BrowserRouter>
    );
};