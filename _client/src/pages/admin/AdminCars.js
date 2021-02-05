import React, {useContext, useEffect, useState} from 'react'
import {UserContext} from "../../context/AuthContext";
import {useHttp} from "../../hooks/http.hook";
import CarItem from "../../components/admin/CarItem";
import {NavLink} from "react-router-dom";

const AdminCars = () => {
    const [cars, setCars] = useState(null)

    const {token} = useContext(UserContext)
    const {request} = useHttp()

    const loadCars = () => {
        request(`/api/v1/cars`, 'GET', null)
            .then(setCars)
    }
    const deleteCar = (id) => {
        request(`/api/v1/admin/cars?carID=${id}`, 'DELETE', null, {Authorization: `Bearer ${token}`})
            .then(setCars)
    }
    useEffect(() => {
        loadCars()
    }, [])
    return (
        <div className='content'>
            <h2>Список машин</h2>
            <NavLink
                className='button--primary link--clear link-back'
                style={{    width: 100+'%',
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: 10+'px'}}
                to={'/admin/cars/create'}>Создать новую</NavLink>
            {cars && cars.map((car) =>
                <CarItem key={car.ID} car={car} deleteHandler={deleteCar}/>
            )}
        </div>
    )
}

export default AdminCars