import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import { MovieCard } from '../movie-card/movie-card';

export const ProfileView = ({user, token, favorites, activeUser, onLoggedOut}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');

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
        })
        .then(response => {
            return response.json();
        })
        .then(data => {
            localStorage.setItem('user', JSON.stringify(data));
            window.location.reload();
        })
        .catch(error => {
            console.error('There was a problem with fetch operation: ', error);
        });
    };

    const handleDeregister = (event) => {
        event.preventDefault();

        let deregisterInput = prompt('If you are sure you want to delete your account, please type in your username:');

        if (deregisterInput !== activeUser.username){
            alert('Incorrect username!');
        } else {
            fetch(`https://myflix-12345.herokuapp.com/users/${activeUser.username}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}`}
        })
        onLoggedOut();
        }
    }

    return (
        <>
            <div>
                <h4>Profile:</h4>
            </div>
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
                <h4>Change user information:</h4>
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
            
            <div>
                <p>Delete my account: </p>
                <Button onClick={handleDeregister}>Deregister</Button>

            </div>

            <div>
                <h4>FAVORITES:</h4>
            </div>
            
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
    );
};