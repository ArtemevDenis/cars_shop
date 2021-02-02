import React, {useContext} from "react";
import {useRoutes} from "../hooks/routes";
import {UserContext} from "../context/AuthContext";
import AdminHeader from "./admin/header";
import Header from "./header";
import Footer from "./footer";


function Root() {
    const routes = useRoutes();
    const {isAdmin} = useContext(UserContext)
    return (
        <main className='main-container'>
            {isAdmin === 'admin' ? <AdminHeader/> : <Header/>}
            {routes}
            <Footer/>

        </main>
    );
}

export default Root;
