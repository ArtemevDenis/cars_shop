import React, {useContext, useEffect, useRef, useState} from 'react'
import {useHttp} from "../../hooks/http.hook";
import {UserContext} from "../../context/AuthContext";
import {useHistory, useParams} from "react-router-dom";

const AdminCreateCar = () => {
    const carID = useParams().id
    const {request} = useHttp()
    const {token} = useContext(UserContext)


    const [car, setCar] = useState(null)
    const [images, setImages] = useState(null)
    const [reviews, setReviews] = useState(null)
    const [brandsList, setBrandsList] = useState(null)

    let history = useHistory();

    const imagesList = useRef()

    const loadCar = () => {
        let url = '/api/v1/cars/full'
        if (carID !== 'create') {
            url += `?id=${carID}`


            request(url)
                .then(data => {
                        const carData = data.car
                        const correctCar = {
                            ...carData, description:
                                carData.description.substr(22, carData.description.length - 28)
                        }
                        setCar(correctCar);
                        setImages(data.imgs);
                        setReviews(data.reviews);

                    }
                )
        } else
            setCar({price: 0, year: 0, brandID: 0, mileage: 0, title: "", date: "", description: "", brand: 0})
    }


    const loadBrands = () => {
        request(`/api/v1/brands`)
            .then(setBrandsList)
    }

    const changeHandler = event => {
        setCar({...car, [event.target.name]: event.target.value})
    }

    useEffect(() => {
        loadCar()
        loadBrands()
    }, [])

    const deleteImage = (imageID) => {
        request(`/api/v1/admin/car-images?carID=${carID}&imgID=${imageID}`, 'DELETE', null, {Authorization: `Bearer ${token}`})
            .then(setImages)
    }
    const deleteReview = (reviewID) => {
        request(`/api/v1/admin/reviews?carID=${carID}&reviewID=${reviewID}`, 'DELETE', null, {Authorization: `Bearer ${token}`})
            .then(setReviews)
    }


    const editCar = () => {
        const headers = {}
        headers['Authorization'] = `Bearer ${token}`
        const formData = new FormData()
        formData.append('data', JSON.stringify(car));
        formData.append('description', JSON.stringify('<div id="description">' + car.description + '</div>'))


        if (imagesList.current.files.length) {
            new Promise(async resolve => {
                Array.from(imagesList.current.files).forEach((f) => {
                    formData.append('images', f, f.filename)
                })
                const req = await fetch(`/api/v1/admin/cars/edit?carID=${carID}`, {
                    method: 'POST',
                    body: formData,
                    headers
                })
                const res = await req.json()
                if (!res.error)
                    resolve(res)
            }).then(data => {
                    if (data.message === 'ok') {
                        history.goBack()
                    }
                }
            )
        } else {
            new Promise(async resolve => {
                const req = await fetch(`/api/v1/admin/cars/edit?carID=${carID}`, {
                    method: 'POST',
                    body: formData,
                    headers
                })
                const res = await req.json()
                if (!res.error)
                    resolve(res)
            }).then(data => {
                    if (data.message === 'ok') {
                        history.goBack()
                    }
                }
            )
        }
    }
    return (
        <div className='content car-edit'>
            {car && <>
                <div className='car-edit__short-block'>
                    <label
                        className='widget--title car-edit__input-block'
                    >Название: <input
                        className='widget--input widget--input--dark'
                        type='text'
                        name='title'
                        onChange={changeHandler}
                        value={car.title}/></label>
                    <label
                        className='widget--title car-edit__input-block'
                    >Цена: <input
                        className='widget--input widget--input--dark'
                        type='number'
                        name='price'
                        onChange={changeHandler}
                        value={car.price}/></label>
                    <label
                        className='widget--title car-edit__input-block'
                    >Пробег: <input
                        className='widget--input widget--input--dark'
                        type='number'
                        name='mileage'
                        onChange={changeHandler}
                        value={car.mileage}/></label>
                    <label
                        className='widget--title car-edit__input-block'
                    >Год выпуска: <input
                        className='widget--input widget--input--dark'
                        type='number'
                        name='year'
                        onChange={changeHandler}
                        value={car.year}/></label>
                    <label
                        className='widget--title car-edit__input-block'
                    >Марка: <select
                        className='widget--input widget--input--dark'
                        name='brand' value={car ? car.brand : 0} onChange={changeHandler}>
                        <option disabled='true' value={0}>Выберете марку</option>
                        {brandsList && brandsList.map((brand, index) =>
                            <option key={index} value={brand.name}>{brand.name}</option>
                        )}
                    </select></label>
                </div>
                <textarea
                    rows={10}
                    className='add-reviews__textarea'
                    name='description'
                    onChange={changeHandler}
                    value={car.description}
                />

                <input
                    multiple='true'
                    className='widget--upload'
                    ref={imagesList}
                    type='file'
                />

                {/*{JSON.stringify(car)}*/}
                <button
                    className='button--primary'
                    onClick={editCar}>Обновить
                </button>
                <div className='car-edit__short-block'>
                    {(images && images.length !== 0) ? <><h2>Изображения</h2>{images.map((image) =>
                        <div className='delete-item' key={image.ID} onClick={() => {
                            deleteImage(image.ID)
                        }}>{image.img}</div>
                    )}</> : <h2>Изображений нет</h2>}
                </div>
                {(reviews && reviews.length !== 0) ? <><h2>Отзывы</h2>{reviews.map((review) =>
                    <div className='delete-item' key={review.ID} onClick={() => {
                        deleteReview(review.ID)
                    }}>s
                        <div>Автор: {review.name}</div>
                        <div>Текст: {review.text}</div>
                    </div>
                )}</> : <h2>Отзовов нет</h2>}

            </>
            }
        </div>
    )
}

export default AdminCreateCar