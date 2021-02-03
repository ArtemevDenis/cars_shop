import React, {useContext} from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import {UserContext} from "../context/AuthContext";
import NotFound from "../pages/404";
import Main from "../pages/user/Main";
import Car from "../pages/user/Car";
import Catalog from "../pages/user/Catalog";
import Profile from "../pages/user/Profile";
import Login from "../pages/Login";
import Registration from "../pages/Registaration";
import TestDrives from "../pages/user/TestDrives";
import Favorite from "../pages/user/Favorite";
import AdminTestDrive from "../pages/admin/AdminTestDrive";
import AdminUser from "../pages/admin/AdminUsers";
import AdminCars from "../pages/admin/AdminCars";
import AdminCreateCar from "../pages/admin/AdminCreateCar";

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
    return (
        <Switch>
            <Route path={"/404"}>
                <NotFound/>
            </Route>
            <Route path={"/catalog/:id"}>
                <Car/>
            </Route>
            <Route path={"/home"}>
                <Main/>
            </Route>
            <Route path={"/"} exact>
                <Main/>
            </Route>
            <Route path={"/catalog"}>
                <Catalog/>
            </Route>
            <Route path={"/login"}>
                <Login/>
            </Route>
            <Route path={"/registration"}>
                <Registration/>
            </Route>
            <AdminRoute path={"/admin/test-drives"}>
                <AdminTestDrive/>
            </AdminRoute>
            <AdminRoute path={"/admin/users"}>
                <AdminUser/>
            </AdminRoute>
            <AdminRoute path={"/admin/cars"} exact>
                <AdminCars/>
            </AdminRoute>
            <AdminRoute path={"/admin/cars/:id"}>
                <AdminCreateCar/>
            </AdminRoute>


            <ProtectRoute path={"/profile"} exact>
                <Profile/>
            </ProtectRoute>
            <ProtectRoute path={"/profile/test-drives"}>
                <TestDrives/>
            </ProtectRoute>
            <ProtectRoute path={"/profile/favorite"}>
                <Favorite/>
            </ProtectRoute>
            <Redirect to={"/404"}/>
        </Switch>

    )
}