import React, {useContext, useEffect, useRef, useState} from 'react';
import {NavLink, useHistory, useParams} from "react-router-dom";
import {useHttp} from "../../hooks/http.hook";
import Slider from "../../components/Slider";
import Reviews from "../../components/reviews";
import ProductAside from "../../components/cars/ProductAside";
import dompurify from "dompurify";
import Modal from "../../components/Modal";
import {UserContext} from "../../context/AuthContext";


const Car = () => {
    const carID = useParams().id
    const history = useHistory()

    const sanitizer = dompurify.sanitize;
    const [showAll, setShowAll] = useState(false)

    const [car, setCar] = useState(null)
    const [images, setImages] = useState(null)
    const [reviews, setReviews] = useState(null)

    const [height, setHeight] = useState(0)

    const [showModal, setShowModal] = useState(false)
    const [isTestDrive, setIsTestDrive] = useState(false)

    const [form, setForm] = useState({
        address: '', date: ''
    })

    const reviewRef = useRef();

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }


    const {token, isAuth} = useContext(UserContext)

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

    const signUpTestDrive = () => {
        const newDate = new Date(form.date).toISOString().slice(0, 19).replace('T', ' ');
        request(`/api/v1/test-drives?carID=${carID}&date=${newDate}&address=${form.address}`, 'POST', null, {Authorization: `Bearer ${token}`})
            .then(
                r => {
                    if (r.message === 'ok') {
                        setShowModal(false)
                        setIsTestDrive(true)
                    }
                }
            )
    }

    const sendReview = () => {
        request(`/api/v1/reviews?carID=${carID}&review=${reviewRef.current.value}`, 'POST', null, {Authorization: `Bearer ${token}`})
            .then(getReviews)
    }

    const getReviews = () => {
        request(`/api/v1/reviews?carID=${carID}`, 'GET', null)
            .then(setReviews).then(reviewRef.current.value = '')
    }

    useEffect(() => {
        loadCar()
    }, [])

    useEffect(() => {
        setHeightLoad()
    }, [car])
    return (
        <div className='content product-view'>
            <aside className='product-view__aside'>{car && <ProductAside car={car} setActive={setShowModal}/>}</aside>
            <div className='product-view__slider'>
                <div
                    className='link-back'
                    onClick={() => {
                        history.goBack()
                    }}>Назад
                </div>
               <Slider sliderData={images} showMini={true}/>
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


            <div className='product-view__add-reviews add-reviews'>
                {isAuth && <> <h2 className='add-reviews__title'>Написать отзыв</h2>
                    <textarea className='add-reviews__textarea' ref={reviewRef} rows={4}/>
                    <button className='add-reviews__button button--primary' onClick={sendReview}>Отправить</button>
                </>}
            </div>
            <div className='product-view__reviews'>
                {reviews && <Reviews reviews={reviews}/>}
            </div>


            {isAuth
                ? <Modal active={showModal} setActive={setShowModal}>
                    <h2>Запись на тестдрайв</h2>
                    <div className='sign-up-test-drive'>
                        <div className='sign-up-test-drive__input_block'>
                            <label className='widget--title'>Адрес:</label>
                            <input
                                className='widget--input widget--input--dark'
                                id='address'
                                name='address'
                                type='text'
                                value={form.address}
                                onChange={changeHandler}
                            />
                        </div>
                        <div className='sign-up-test-drive__input_block'>
                            <label className='widget--title'>Дата:</label>
                            <input
                                className='widget--input widget--input--dark'
                                id='date'
                                name='date'
                                type='date'
                                value={form.date}
                                onChange={changeHandler}
                            />
                        </div>
                        <div className='sign-up-test-drive__input_block'>
                            <button className='button--primary' onClick={() => {
                                signUpTestDrive()
                            }}>Записаться
                            </button>
                        </div>
                    </div>
                </Modal>
                : <Modal active={showModal} setActive={setShowModal}>
                    <p>Для записи на тестдрайв необходимо авторизоваться в системе</p>
                    <NavLink to='/login'>Войти</NavLink>
                </Modal>
            }
            <Modal active={isTestDrive} setActive={setIsTestDrive}>
                <p>Спасибо за запись на тест драйв!</p>
            </Modal>
        </div>
    )
}


export default Car