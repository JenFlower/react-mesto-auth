import React from "react";
import { Link } from "react-router-dom";

export default function Register() {
    return (
        <div className="auth">
            <h2 className="auth__title">Регистрация</h2>
            {/* onSubmit={handleSubmit} */}
            <form className="auth__form" >
                <input type="email"
                    name="email"
                    className="auth__input auth__input_email"
                    placeholder="Email" 
                    // onChange={handleChange}
                    // value={userRegistration.email}
                    required></input>
                <input type="password"
                    name="password"
                    className="auth__input auth__input_password"
                    placeholder="Пароль" 
                    // onChange={handleChange}
                    // value={userRegistration.password}
                    required></input>
                <button className="auth__button">Зарегистрироваться</button>
            </form>
            <div className="auth__sign-in">
                <p>Уже зарегистрированы? 
                <Link className="auth__link" to="/sign-in"> Войти</Link>
                </p>
                
            </div>
        </div>
    )
}