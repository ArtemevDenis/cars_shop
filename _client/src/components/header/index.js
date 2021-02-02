import React from 'react'
import {NavLink} from "react-router-dom";

const Header = () => {

    return (
        <header className="header">
            <div className="wrapper">
                <div>
                    <div className="logo">
                        <NavLink className="logo__link" to="/home">
                            <img className="logo__img" alt=""/>
                            <h1 className="logo__title">Названике компании</h1>
                        </NavLink>
                    </div>
                </div>
                <nav className="header__navigation">
                    <ul className="navigation navigation--inline navigation--lage">
                        <li className="navigation__item navigation__item--active"><NavLink
                            className="navigation__link navigation__link--hover navigation__link--p20"
                            activeClassName="navigation__link--active"
                            to="/home">Главная</NavLink></li>
                        <li className="navigation__item">
                            <NavLink
                                className="navigation__link navigation__link--hover navigation__link--p20"
                                activeClassName="navigation__link--active"

                                to="/catalog">Каталог</NavLink></li>
                        <li className="navigation__item">
                            <NavLink
                                className="navigation__link navigation__link--hover navigation__link--p20"
                                activeClassName="navigation__link--active"

                                to="/about">О нас</NavLink></li>
                        <li className="navigation__item">
                            <NavLink
                                className="navigation__link navigation__link--hover navigation__link--p20"
                                activeClassName="navigation__link--active"
                                to="/profile">Профиль</NavLink></li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header