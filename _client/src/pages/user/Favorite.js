import React, {useContext, useEffect, useState} from 'react'
import CarCard from "../../components/cars/CarCard";
import {useHttp} from "../../hooks/http.hook";
import {UserContext} from "../../context/AuthContext";

const Favorite = () => {
    const [cars, setCars] = useState(null)
    const {request} = useHttp()

    const {token} = useContext(UserContext)
    const loadCars = () => {
        request(`/api/v1/favorite/cars`, 'GET', null, {Authorization: `Bearer ${token}`})
            .then(setCars)
    }

    useEffect(() => {
        loadCars()
    }, [])
    return (
        <div>
            <h2>Избранные модели</h2>
            <div className='catalog__list'>
                {(cars && cars.length !== 0)
                    ? cars.map(car =>
                        <CarCard key={car.ID} car={car}/>
                    )
                    : <p>У вас нет машин в избранном</p>}
            </div>
        </div>
    )
}

export default Favorite