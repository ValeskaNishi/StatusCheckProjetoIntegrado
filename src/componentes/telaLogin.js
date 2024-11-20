import React, { useState } from 'react';
import axios from 'axios';
import './telaLogin.css';
import logo from '../img/logomoderna.png';
import { useNavigate } from 'react-router-dom';


function TelaLogin() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); 


    
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3031/login', {
                register: login,
                password: password
            },
        {
            withCredentials: true
        }
        );
        setMessage(response.data.message);

        if (response.data.message === 'Usuário autenticado.') { 
            navigate('/colaborador'); // 
        }
        
        } catch (error) {
            setMessage(error.response ? error.response.data.message : 'Erro na conexão.');
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <img src={logo} alt="StatusCheck Logo" className="logo" />
                <h2 className="login-title">StatusCheck</h2>
                <h3 className="login-title2">Insira suas credenciais para acessar a plataforma</h3>
                <form onSubmit={handleLogin}>
                    <input
                        type="text"
                        placeholder="Login"
                        className="login-input"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Senha"
                        className="login-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit" className="login-button">Entrar</button>
                </form>
                {message && <p className="message">{message}</p>}
            </div>
        </div>
    );
}

export default TelaLogin;
