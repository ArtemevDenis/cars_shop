import React, {useContext} from 'react'
import {NavLink} from "react-router-dom";
import {UserContext} from "../../context/AuthContext";

const Header = () => {
    const user = useContext(UserContext)

    return (
        <header className="header">
            <div className="wrapper">

                <div className="logo">
                    <NavLink className="logo__link" to="/" exact>
                        <img className="logo__img" alt=""/>
                        <h1 className="logo__title">Названике компании</h1>
                    </NavLink>
                </div>
                <input type='checkbox' id='show-menu' className='header-menu-toggle'/>
                <label htmlFor='show-menu' className='header-menu-toggle__label'/>
                <nav className="header__navigation">
                    <ul className="navigation navigation--inline navigation--lage">
                        <li className="navigation__item navigation__item--active"><NavLink
                            exact
                            className="navigation__link navigation__link--hover navigation__link--p20"
                            activeClassName="navigation__link--active"
                            to="/">Главная</NavLink></li>
                        <li className="navigation__item">
                            <NavLink
                                className="navigation__link navigation__link--hover navigation__link--p20"
                                activeClassName="navigation__link--active"

                                to="/catalog">Каталог</NavLink></li>
                        {user.isAuth
                            ? <li className="navigation__item">
                                <NavLink
                                    className="navigation__link navigation__link--hover navigation__link--p20"
                                    activeClassName="navigation__link--active"
                                    to="/profile">Профиль</NavLink>
                            </li>
                            : <li className="navigation__item">
                                <NavLink
                                    exact
                                    className="navigation__link navigation__link--hover navigation__link--p20"
                                    activeClassName="navigation__link--active"
                                    to="/login">Вход</NavLink>
                            </li>
                        }
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header