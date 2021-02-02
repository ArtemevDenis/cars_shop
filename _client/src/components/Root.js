import React, {useContext} from "react";
import {useRoutes} from "../hooks/routes";
import {UserContext} from "../context/AuthContext";
import AdminHeader from "./admin/header";
import Header from "./header";
import Footer from "./footer";
import {useRouteMatch} from "react-router-dom";
import Sidebar from "./profile/Sidebar";


function Root() {
    const routes = useRoutes();
    const matchLogin = useRouteMatch('/login');
    const matchRegistration = useRouteMatch('/registration');
    const matchProfile = useRouteMatch('/profile');
    const {isAdmin} = useContext(UserContext)
    if (matchLogin || matchRegistration) {
        console.log('redirect')
        return (
            <div className='inner'>
                {routes}
            </div>
        )
    } else if (matchProfile) {
        return (
            <main className='main-container'>
                {isAdmin === 'admin' ? <AdminHeader/> : <Header/>}
                <main className='content profile'>
                    <div className='profile__sidebar'><Sidebar/></div>
                    <div className='profile__content'>{routes}</div>
                </main>
                <Footer/>

            </main>
        )
    } else
        return (
            <main className='main-container'>
                {isAdmin === 'admin' ? <AdminHeader/> : <Header/>}
                {routes}
                <Footer/>

            </main>
        );
}

export default Root;
