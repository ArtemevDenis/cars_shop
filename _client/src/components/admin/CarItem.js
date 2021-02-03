import React from 'react'
import {NavLink} from "react-router-dom";

const CarItem = ({car, deleteHandler}) => {
    return (
        <div className='car-item'>
            <div className='car-item__data'>
                <p className='car-item__label'>Название:</p><p
                className='car-item__value'>{car.brand} {car.title}</p>
                <p className='user-item__label'>Цена:</p><p
                className='car-item__value'>{car.price}₽</p>
            </div>
            <NavLink
                to={`/admin/cars/${car.ID}`}
                className='car-item__edit'
            >Изменить
            </NavLink>
            <div
                className='car-item__delete'
                onClick={() => {
                    deleteHandler(car.ID)
                }}>X
            </div>
        </div>
    )
}

export default CarItem