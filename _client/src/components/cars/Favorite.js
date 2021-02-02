import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from "../../hooks/http.hook";
import {UserContext} from "../../context/AuthContext";

const Favorite = ({id}) => {
    const {request} = useHttp()
    const {token} = useContext(UserContext)
    const [isFavorite, setIsFavorite] = useState(false)

    const setFavorite = () => {
        request(`/api/v1/favorite?carID=${id}`, "PATCH", null, {Authorization: `Bearer ${token}`})
            .then(getStatus)
    }

    const getStatus = () => {
        request(`/api/v1/favorite?carID=${id}`, "GET", null, {Authorization: `Bearer ${token}`}).then(r => {
            console.log('_____')
            console.log(r)
            setIsFavorite(r)
        })
    }


    useEffect(() => {
        getStatus()
    }, [])
    return (
        <div className={isFavorite ? 'car__favorite car__favorite--is-favorite' : 'car__favorite'} onClick={event => {
            event.stopPropagation()
            console.log('ID:', id)
            setFavorite()
        }}/>
    )
}

export default Favorite