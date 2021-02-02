import React from "react";
import ReviewCard from "./ReviewCard";

const Reviews = ({reviews}) => {


    return (
        <section className="content">
            <div className="comments-blog">
                <h2 className="comments-blog__title">Отзовы клиентов</h2>
                <div className="comments-blog__item">
                    {reviews && reviews.length !== 0
                        ? reviews.map(review => <ReviewCard key={review.ID} review={review}/>)
                        : 'К сожалению пока нет отзывов'
                    }
                </div>
            </div>
        </section>
    )
}

export default Reviews