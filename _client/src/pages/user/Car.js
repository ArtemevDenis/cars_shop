import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from "react-router-dom";
import {useHttp} from "../../hooks/http.hook";
import Slider from "../../components/Slider";
import Reviews from "../../components/reviews";
import ProductAside from "../../components/cars/ProductAside";
import dompurify from "dompurify";


const Car = () => {
    const carID = useParams().id
    const history = useHistory()

    const sanitizer = dompurify.sanitize;
    const [showAll, setShowAll] = useState(false)

    const [car, setCar] = useState(null)
    const [images, setImages] = useState(null)
    const [reviews, setReviews] = useState(null)

    const [height, setHeight] = useState(0)

    const {request} = useHttp()
    const loadCar = () => {
        request(`/api/v1/cars/full?id=${carID}`)
            .then(data => {
                    setCar(data.car);
                    setImages(data.imgs);
                    setReviews(data.reviews);

                }
            )
    }

    const textStyle = showAll ? {maxHeight: height + 'px'} : {};

    const setHeightLoad = () => {
        car &&
        setTimeout(() => {
            const height = document.getElementById('description').offsetHeight
            setHeight(height)
        }, 500)
    }

    useEffect(() => {
        loadCar()
    }, [])

    useEffect(() => {
        setHeightLoad()
    }, [car])
    return (
        <div className='content product-view'>
            <aside className='product-view__aside'>{car && <ProductAside car={car}/>}</aside>
            <div className='product-view__slider'>
                <div
                    className='link-back'
                    onClick={() => {
                        history.goBack()
                    }}>Назад
                </div>
                {images && <Slider sliderData={images} showMini={true}/>}
            </div>
            <div className='product-view__description'>
                {car && <>
                    <h2>Описание владельца</h2>
                    <div
                        style={textStyle}
                        className={'product-view__description-text'}
                        dangerouslySetInnerHTML={{__html: sanitizer(car.description)}}/>
                    <p className='product-view__description-show'
                       onClick={() => {
                           setShowAll(!showAll)
                       }}>{showAll ? 'Скрыть' : 'Показать полностью...'}</p>
                </>}

            </div>
            <div className='product-view__reviews'>
                {reviews && <Reviews reviews={reviews}/>}
            </div>
        </div>
    )
}


export default Car