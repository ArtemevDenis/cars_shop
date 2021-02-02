import React, {useContext} from "react";
import {NavLink, useHistory} from "react-router-dom";
import {UserContext} from "../../context/AuthContext";

const Sidebar = () => {
    const {logout} = useContext(UserContext);
    const history = useHistory()

    const logoutHandler = event => {
        event.preventDefault()
        logout()
        history.push('/home')
    }

    return (
        <sidebar className='sidebar'>
            <div className='sidebar__main-block'>
                <NavLink
                    exact
                    className='button--primary navigation__link sidebar__link'
                    to='/profile'
                    activeClassName="navigation__link--active">
                    Личные данные
                </NavLink>
                <NavLink
                    className='button--primary navigation__link sidebar__link'
                    to='/profile/test-drives'
                    activeClassName="navigation__link--active">
                    Предстоящие тест драйвы
                </NavLink>
                <NavLink
                    className='button--primary navigation__link sidebar__link'
                    to='/profile/favorite'
                    activeClassName="navigation__link--active">
                    Избранное
                </NavLink>
            </div>
            <button className='button--primary' onClick={logoutHandler}>Выйти</button>
        </sidebar>
    )
}

export default Sidebar;