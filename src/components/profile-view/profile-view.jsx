import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import { MovieCard } from '../movie-card/movie-card';

export const ProfileView = ({user, token, favorites, activeUser}) => {
    const [users, setUsers] = useState([]);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');
    const [movies, setMovies] = useState([]);
    const [favoriteMovie, setFavoriteMovie] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        };

        fetch(`https://myflix-12345.herokuapp.com/users/${user.Username}`, {
            method: 'PUT',
            headers: { Authorization: `Bearer ${token}`,
                "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
    };

    // fetch('https://myflix-12345.herokuapp.com/users', {
    //     method: 'GET',
    //     headers: { Authorization: `Bearer ${token}` }
    // }).then((response) => response.json())
    // .then((data) => {
    //     const usersFromApi = data.map((user) => {
    //         return {
    //             id: user._id,
    //             username: user.Username,
    //             password: user.Password,
    //             email: user.Email,
    //             birthday: user.Birthday,
    //             favorites: user.Favorites
    //         };
    //     });
    //     setUsers(usersFromApi);
    // });

    

    return (
        
        
        // display user information
        <>
            <div>
                <span>Username: </span>
                <span>{activeUser.username}</span>
            </div>
            <div>
                <span>Email: </span>
                <span>{activeUser.email}</span>
            </div>
            <div>
                <span>Birthday: </span>
                <span>{activeUser.birthday}</span>
            </div>
            <div>
                <span>Favorites: </span>
                <span>{activeUser.favorites}</span>
            </div>


            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formUsername">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        minLength="3" 
                    />
                </Form.Group>

                <Form.Group controlId="formPassword">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formEmail">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        minLength="3" 
                    />
                </Form.Group>
                
                <Form.Group controlId="formBirthday">
                    <Form.Label>Birthday:</Form.Label>
                    <Form.Control
                        type="date"
                        value={birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                        required
                        minLength="3" 
                    />
                </Form.Group>

                <Button variant="primary" type="submit">SUBMIT</Button>
            </Form>

            <div>FAVORITES:</div>
           
            <>
                {favorites.map((movie) => {
                    return (
                            <Col className="mb-3" key={movie.id} md={3} >
                                <MovieCard movie={movie} user={user} token={token} activeUser={activeUser}/>
                            </Col>
                        )
                    })}
            </>
        </>
        
// update user information (username, password, email, date of birth)


        // display favorite movies
    );

};