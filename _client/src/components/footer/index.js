import React from 'react'
import {NavLink} from "react-router-dom";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="wrapper">
                <div className="row">
                    <div className="col-20"><p className="font--bold font--08rem">Меню</p>
                        <ul className="navigation navigation--small">
                            <li className="navigation__item"><NavLink className="navigation__link "
                                                                      to="/home">Главная</NavLink></li>
                            <li className="navigation__item"><NavLink className="navigation__link "
                                                                      to="/catalog">Каталог</NavLink></li>
                            <li className="navigation__item"><NavLink className="navigation__link "
                                                                      to="/about">
                                О нас</NavLink></li>
                            <li className="navigation__item"><NavLink className="navigation__link "
                                                                      to="/profile">Профиль</NavLink></li>
                        </ul>
                    </div>
                    <div className="col-20">
                        <p className="font--bold font--08rem">Контакты</p>
                        <div><a className="link--clear font--08rem" href="mailto:main@mail.ru">mail@mail.ru</a></div>
                        <div><a className="link--clear font--08rem" href="tel:+79999999999">+7(999) 999-99-99</a></div>
                    </div>
                    <div className="col-60"></div>
                </div>
            </div>
        </footer>
    )
}

export default Footer