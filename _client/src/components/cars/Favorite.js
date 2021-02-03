import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from "../../hooks/http.hook";
import {UserContext} from "../../context/AuthContext";
import {NavLink} from "react-router-dom";
import Modal from "../Modal";

const Favorite = ({id}) => {
    const {request} = useHttp()
    const {token, isAuth} = useContext(UserContext)
    const [isFavorite, setIsFavorite] = useState(false)
    const [showModal, setShowModal] = useState(false)

    const setFavorite = () => {
        request(`/api/v1/favorite?carID=${id}`, "PATCH", null, {Authorization: `Bearer ${token}`})
            .then(getStatus)
    }

    const getStatus = () => {
        request(`/api/v1/favorite?carID=${id}`, "GET", null, {Authorization: `Bearer ${token}`})
            .then(setIsFavorite)
    }


    useEffect(() => {
        if (isAuth)
            getStatus()
        else
            setIsFavorite(false)
    }, [])
    return (
        <>
            <div className={isFavorite ? 'car__favorite car__favorite--is-favorite' : 'car__favorite'}
                 onClick={event => {
                     event.stopPropagation()
                     if (!isAuth)
                         setShowModal(true)
                     else
                         setFavorite()
                 }}/>
            {
                !isAuth && <Modal active={showModal} setActive={setShowModal}>
                    <p>Для добавления в избронно необходимо авторизоватсья</p>
                    <NavLink to='/login'>Войти</NavLink>
                </Modal>
            }
        </>
    )
}

export default Favorite