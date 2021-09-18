import React from "react";

export default function Login() {
    return (
        <div className="auth">
            <h2 className="auth__title">Вход</h2>
            {/* onSubmit={handleSubmit} */}
            <form className="auth__form">
                {/* value={userAuthorisation.email} onChange={handleChange}  */}
                <input type="email" className="auth__input auth__input_email" placeholder="Email" name="email" type="email" required></input> 
                {/* value={userAuthorisation.password} onChange={handleChange}  */}
                <input type="password" className="auth__input auth__input_password" name="password" type="password" placeholder="Пароль"required></input>
                <button type="submit" className="auth__button">Войти</button>
            </form>
        </div>
    )
}