import React, { useState } from "react";
import { Link, withRouter } from 'react-router-dom';

function Login(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function handleSubmit(evt) {
        evt.preventDefault();
        if (!email || !password){
            return;
        }
        props.onLogin(email, password)
    }

    function handleChangeEmail(evt) {
        setEmail(evt.target.value)
    }

    function handleChangePassword(evt) {
        setPassword(evt.target.value)
    }
    return (
        <div className="auth">
            <h2 className="auth__title">Вход</h2>
            <form className="auth__form" onSubmit={handleSubmit}>
                <input type="email" className="auth__input auth__input_email" value={email} onChange={handleChangeEmail} placeholder="Email" name="email" required></input> 
                <input type="password" className="auth__input auth__input_password" value={password} onChange={handleChangePassword} name="password" placeholder="Пароль"required></input>
                <button type="submit" className="auth__button">Войти</button>
            </form>
        </div>
    )
}

export default withRouter(Login)