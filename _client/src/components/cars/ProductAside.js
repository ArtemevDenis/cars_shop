import React from 'react'
import Favorite from "./Favorite";

const ProductAside = ({car, setActive}) => {
    return (
        <>
            <h2 className='aside__important aside__important--center'>{car.title}  </h2>
            <Favorite id={car.ID}/>
            <h2 className='aside__important aside__important--center'>{car.price}₽</h2>

            <button className='button--primary aside__important--center' onClick={() => {
                setActive(true)
            }}>заказать тестдрайв
            </button>
            <p className='aside__text'>Пробег: {car.mileage}км</p>
            <p className='aside__text'>Год выпуска: {car.year}</p>
            <p className='aside__text'>Марка: {car.brand}</p>
        </>
    )
}

export default ProductAside