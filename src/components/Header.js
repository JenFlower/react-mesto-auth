import { Route, Switch } from 'react-router'
import { Link } from 'react-router-dom'
import logo from '../images/header-logo.svg'

export default function Header(props) {
    return (
        <header className="header">
          <img className="header__logo" src={logo} alt="Логотип" />
          <div className="header__menu">
            <Switch>
              <Route path="/sign-up">
                <Link to="/sign-in" className="header__text">Вход</Link>
              </Route>
              <Route path="/sign-in">
                <Link to="/sign-up" className="header__text">Регистрация</Link>
              </Route>
              <Route exact path="/">
                <span className="header__user-name">{props.userName}</span>
                <span className="header__text">Выйти</span>
              </Route>
            </Switch>
          </div>
        </header>
    )
}