import React, {useContext} from 'react'
import {NavLink, useHistory} from "react-router-dom";
import {UserContext} from "../../../context/AuthContext";

const AdminHeader = () => {
    const {logout} = useContext(UserContext);
    const history = useHistory()

    const logoutHandler = event => {
        event.preventDefault()
        logout()
        history.push('/home')
    }

    return (
        <header className="header">
            <div className="wrapper">
                <div>
                    <div className="logo">
                        <NavLink className="logo__link" to="/admin/test-drives">
                            <img className="logo__img" alt=""/>
                            <h1 className="logo__title">Названике компании</h1>
                        </NavLink>
                    </div>
                </div>
                <nav className="header__navigation">
                    <ul className="navigation navigation--inline navigation--lage">
                        <li className="navigation__item navigation__item--active"><NavLink
                            exact
                            className="navigation__link navigation__link--hover navigation__link--p20"
                            activeClassName="navigation__link--active"
                            to="/admin/users">Пользователи</NavLink>
                        </li>
                        <li className="navigation__item">
                            <NavLink
                                className="navigation__link navigation__link--hover navigation__link--p20"
                                activeClassName="navigation__link--active"

                                to="/admin/test-drives">Тест драйвы</NavLink>
                        </li>
                        <li className="navigation__item">
                            <NavLink className="navigation__link navigation__link--hover navigation__link--p20"
                                     activeClassName="navigation__link--active"
                                     to="/admin/cars">Машины</NavLink></li>
                        <li className="navigation__item">
                            <div
                                onClick={logoutHandler}
                                className="navigation__link navigation__link--hover navigation__link--p20">Выход
                            </div>
                        </li>

                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default AdminHeader