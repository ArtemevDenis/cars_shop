import React, {useContext} from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import {UserContext} from "../context/AuthContext";
import NotFound from "../pages/404";
import Main from "../pages/user/Main";
import Car from "../pages/user/Car";
import Catalog from "../pages/user/Catalog";

const AdminRoute = ({children, ...rest}) => {
    const {isAdmin} = useContext(UserContext)
    return <Route {...rest}
                  render={
                      () => {
                          return isAdmin
                              ? children
                              : <Redirect to='/login'/>
                      }
                  }
    />
}

const ProtectRoute = ({children, ...rest}) => {
    const {isAuth} = useContext(UserContext)
    return <Route {...rest}
                  render={
                      () => {
                          return isAuth
                              ? children
                              : <Redirect to='/login'/>
                      }
                  }
    />
}

export const useRoutes = () => {

    const {isAdmin} = useContext(UserContext)

    const adminRouters = <>
        <AdminRoute path={"/admin/slider"} exact>
            {/*<SliderEdit/>*/}
        </AdminRoute>
        <AdminRoute path={"/admin/slider"} exact>
            {/*<SliderEdit/>*/}
        </AdminRoute>
        <AdminRoute path={"/admin/slider"} exact>
            {/*<SliderEdit/>*/}
        </AdminRoute>

        <Redirect to={"/404"}/>
    </>

    let defaultRouters = <>
        <Route path={"/404"}>
            <NotFound/>
        </Route>
        <Route path={"/cars/:id"}>
            <Car/>
        </Route>
        <Route path={"/home"} exact>
            <Main/>
        </Route>
        <Route path={"/catalog"} exact>
            <Catalog/>
        </Route>
        <AdminRoute path={"/admin/slider"}>
            {/*<SliderEdit/>*/}
        </AdminRoute>
        <ProtectRoute path={"/profile"}>
            {/*<Profile/>*/}
        </ProtectRoute>

        <Redirect to={"/404"}/>
    </>

    return (
        <Switch>
            {defaultRouters}
            <Redirect to={"/404"}/>
        </Switch>

    )
}