import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";

function Register(props) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function handleSubmit(evt) {
        evt.preventDefault();
        props.register(email, password);
    }

    function handleChangeEmail(evt) {
        setEmail(evt.target.value)
    }

    function handleChangePassword(evt) {
        setPassword(evt.target.value)
    }

    return (
        <div className="auth">
            <h2 className="auth__title">Регистрация</h2>
            <form className="auth__form" onSubmit={handleSubmit}>
                <input type="email"
                    name="email"
                    className="auth__input auth__input_email"
                    placeholder="Email" 
                    onChange={handleChangeEmail}
                    value={email}
                    required />
                <input type="password"
                    name="password"
                    className="auth__input auth__input_password"
                    placeholder="Пароль" 
                    onChange={handleChangePassword}
                    value={password}
                    required />
                <button className="auth__button" onSubmit={handleSubmit}>Зарегистрироваться</button>
            </form>
            <div className="auth__sign-in">
                <p>Уже зарегистрированы? 
                    <Link className="auth__link" to="/sign-in"> Войти</Link>
                </p>
                
            </div>
        </div>
    )
}

export default withRouter(Register)