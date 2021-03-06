import React from 'react';
import {useHistory} from "react-router-dom";
import Favorite from "./Favorite";

const CarCard = ({car}) => {
    let history = useHistory();

    const routeTo = () => {
        history.push(`/catalog/${car.ID}`);
    }

    return (
        <div className="cars-list__item car" onClick={routeTo}>
            <div className="car__img-wrapper">
                <img className="car__img" src={'/images/' + car.img} alt=""/>
            </div>
            <div className="car__info">
                <div className="car__description">
                    <p className="car__brand">{car.brand}</p>
                    <p className="car__title">{car.title}</p>
                    <p className="car__price">{car.price}₽</p>

                    <div className='car__favorite-icon'>
                        <Favorite id={car.ID}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CarCard