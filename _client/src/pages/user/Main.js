import React, {useEffect, useState} from 'react'
import Slider from "../../components/Slider";
import {useHttp} from "../../hooks/http.hook";
import CarCard from "../../components/cars/CarCard";
import Reviews from "../../components/reviews";

const Main = () => {

    const {request} = useHttp()
    const [slider, setSlider] = useState(null)
    const [newCars, setNewCars] = useState(null)

    const [reviews, setReviews] = useState(null)

    const loadReviews = () => {
        request(`/api/v1/reviews?limit=8`).then(setReviews)
    }


    const loadSlider = () => {
        request('/api/v1/slider').then(setSlider)

    }

    const loadNewCars = () => {
        request('/api/v1/cars?limit=8').then(setNewCars)
    }

    useEffect(() => {
        loadReviews()
        loadSlider()
        loadNewCars()
    }, [])

    return (
        <>
            <section className="content">
                {slider && <Slider sliderData={slider}/>}
            </section>
            <section className="content">
                <h2>Новые автомобили в нашем салоне</h2>
                <div className="cars-list">
                    {newCars && newCars.map((car, index) =>
                        <CarCard key={index} car={car}/>
                    )}
                </div>
            </section>
            <section className="content">
                <div className="advantage advantage--back">
                    <div className="advantage__img-wrap">
                        <img src="/images/industry-4-2741774_960_720.webp" alt="" className="advantage__img"/>
                    </div>
                    <div className="advantage__text">
                        <h2 className="advantage__title">Lorem</h2>
                        <p className="advantage__description">Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                            Aut, consequuntur
                            distinctio et exercitationem fuga illum, inventore iusto maiores, necessitatibus nemo quae
                            quaerat quo
                            reprehenderit sequi tempora? Delectus itaque quisquam saepe.</p>
                    </div>
                </div>
                <div className="advantage advantage--front">
                    <div className="advantage__img-wrap">
                        <img src="/images/cog-wheels-2125178_960_720.webp" alt="" className="advantage__img"/>
                    </div>
                    <div className="advantage__text">
                        <h2 className="advantage__title">Lorem</h2>
                        <p className="advantage__description">Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                            Aut, consequuntur
                            distinctio et exercitationem fuga illum, inventore iusto maiores, necessitatibus nemo quae
                            quaerat quo
                            reprehenderit sequi tempora? Delectus itaque quisquam saepe.</p>
                    </div>
                </div>
            </section>
            <Reviews reviews={reviews}/>
        </>
    )
}
export default Main;