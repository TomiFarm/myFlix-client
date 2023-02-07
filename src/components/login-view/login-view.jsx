import { useState } from 'react';

export const LoginView = ({ onLoggedIn }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            Username: username,
            Password: password
        };

        fetch('http://127.0.0.1:8080/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then((response) => response.json())
        .then((data) => {
            console.log('Login response: ', data);
            if(data.user) {
                localStorage.setItem('user', JSON.stringify(data.user));
                localStorage.setItem('token', data.token);
                onLoggedIn(data.user, data.token);
            }else{
                alert('No such user');
            }
        })
        .catch((e) => {
            alert('Something went wrong');
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    minLength="5"
                    required
                />
            </label>
            <label>
                Password:
                <input
                    type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </label>
            <button type="submit">LOGIN</button>
        </form>
    );
};