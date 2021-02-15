import React from "react";
import ReviewCard from "./ReviewCard";
import {NavLink} from "react-router-dom";

const Reviews = ({reviews, isLink = false}) => {


    return (
        <section className="content">
            <div className="comments-blog">
                <h2 className="comments-blog__title">Отзывы клиентов</h2>
                <div className="comments-blog__item">
                    {reviews && reviews.length !== 0
                        ? reviews.map(review => {
                            return <>{
                                isLink
                                    ?
                                    <NavLink to={`catalog/${review.carID}`} className="invisibleLink">
                                        <ReviewCard key={review.ID} review={review}/>
                                    </NavLink>
                                    :
                                    <ReviewCard key={review.ID} review={review}/>
                            }</>
                        })
                        : 'К сожалению пока нет отзывов'
                    }
                </div>
            </div>
        </section>
    )
}

export default Reviews