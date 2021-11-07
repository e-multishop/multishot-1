import axios from 'axios';
import React, {useState} from 'react';
import { toast } from 'react-toastify';
import Review from './Review';

const ReviewBox = (props) => {
    const [rating, setReviewRating] = useState(props.review ? props.review.rating : 0);
    const [review, setReview] = useState(props.review ? props.review.description : '');

    const updateReview = (e) => {
        setReview(e.target.value);
    };
    const addReview = () => {
        axios.post('/rest/reviews', {
            userid: localStorage.getItem('userId'),
            pid: props.pid,
            rating: rating,
            description: review
        }).then(res => {
            toast.success('Review added successfully');
            props.setShowReview(false);
        }).catch(err => {
            toast.error('Error adding review. Please try again later');
            props.setShowReview(false);
        })
    }
    const cancelReview = () => {
        props.setShowReview(false);
    }
    return (
        <div>
            <Review rating={rating} setReviewRating={setReviewRating}/>
            <textarea className="materialize-textarea" placeholder="Write your review" onChange={updateReview} value={review}></textarea>
            {/* <form action="#">
                <div class="file-field input-field">
                    <div class="btn btn-color">
                        <span>Upload Image</span>
                        <input type="file" multiple />
                    </div>
                    <div class="file-path-wrapper">
                        <input class="file-path validate" type="text" placeholder="Upload one or more files" />
                    </div>
                </div>
            </form> */}
            <div className="hs-action-wrapper">
                <button className="waves-effect waves-light btn btn-default" onClick={cancelReview}>Cancel</button>
                <button className="waves-effect waves-light btn btn-color hs-ml-16" onClick={addReview}>Add</button>
            </div>
        </div>
    )
}

export default ReviewBox;