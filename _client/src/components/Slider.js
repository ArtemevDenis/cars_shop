import React, {useState} from 'react'


const Slider = ({sliderData}) => {
    const [currentPosition, setCurrentPosition] = useState(0)
    const prevSlide = () => {
        if (currentPosition >= 1) {
            const newCurrentPosition = currentPosition - 1
            setCurrentPosition(newCurrentPosition)
        } else
            setCurrentPosition(sliderData.length - 1);
    }

    const nextSlide = () => {
        if (currentPosition - 1 < sliderData.length - 2) {
            const newCurrentPosition = currentPosition + 1
            setCurrentPosition(newCurrentPosition)
        } else {
            setCurrentPosition(0);
        }
    }

    return (
        <div className="slider">
            <div className="slider__wrapper" style={{transform: 'translateX(-' + currentPosition * 100 + '%)'}}>
                {sliderData.map((slide, index) =>
                    <div className="slider__item" key={index}>
                        <img className="slider__img" src={'/images/' + slide.img}/>
                    </div>
                )}
            </div>
            <div
                className="slider__control slider__control_left"
                onClick={prevSlide}/>
            <div
                className="slider__control slider__control_right slider__control_show"
                onClick={nextSlide}/>
        </div>
    )
}

export default Slider