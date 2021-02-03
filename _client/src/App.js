import React, {useEffect} from 'react'
import {BrowserRouter as Router} from "react-router-dom";
import {useAuth} from "./hooks/auth.hook";

import {UserContext} from "./context/AuthContext";
import Root from "./components/Root";

function App() {
    const {token, login, logout, userID, role, email, loadData, load} = useAuth()
    const isAdmin = !!(role && role.indexOf('admin') === 0);
    const isAuth = !!token;


    useEffect(() => {
    }, [token])

    useEffect(() => {
        loadData()
    }, [])

    return (

        <UserContext.Provider value={{token, login, logout, userID, isAuth, isAdmin, email}}>
            {load && <Router>
                <Root/>
            </Router>}
        </UserContext.Provider>
    );
}

export default App;
