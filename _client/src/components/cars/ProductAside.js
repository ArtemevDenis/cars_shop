import React from 'react'

const ProductAside = ({car}) => {
    return (
        <>
            <h2 className='aside__important aside__important--center'>{car.title}  </h2>
            <span className="car__favorite"/>
            <h2 className='aside__important aside__important--center'>{car.price}₽</h2>

            <button className='button--primary aside__important--center'>заказать тестдрайв</button>
            <p className='aside__text'>Пробег: {car.mileage}км</p>
            <p className='aside__text'>Год выпуска: {car.year}</p>
            <p className='aside__text'>Марка: {car.brand}</p>
        </>
    )
}

export default ProductAside