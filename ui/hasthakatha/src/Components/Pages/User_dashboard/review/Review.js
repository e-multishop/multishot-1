import React from 'react';

const Review = (props) => {

    const setReview = (rating) => {
        if (!props.readonly) {
            if (props.setReviewRating) {
                props.setReviewRating(rating);
            }
        }
    }
    return (
        <div className="hs-product-rating">
            <span className="material-icons hs-action-icon" onClick={() => setReview(1)}>{props.rating > 0 ? 'star' : 'star_outline'}</span>
            <span className="material-icons hs-action-icon" onClick={() => setReview(2)}>{props.rating > 1 ? 'star' : 'star_outline'}</span>
            <span className="material-icons hs-action-icon" onClick={() => setReview(3)}>{props.rating > 2 ? 'star' : 'star_outline'}</span>
            <span className="material-icons hs-action-icon" onClick={() => setReview(4)}>{props.rating > 3 ? 'star' : 'star_outline'}</span>
            <span className="material-icons hs-action-icon" onClick={() => setReview(5)}>{props.rating > 4 ? 'star' : 'star_outline'}</span>
        </div>
    )
}

export default Review;