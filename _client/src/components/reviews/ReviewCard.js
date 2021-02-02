import React from 'react'


const ReviewCard = ({review}) => {
    return (
        <div className="comment">
            <img className="comment__img" src={`/images/${review.img}`} alt=""/>
            <div className="comment__text">
                <h3 className="comment__author">{review.name}</h3>
                <p className="comment__description">
                    {review.text}
                </p>
            </div>
        </div>
    )
}

export default ReviewCard
