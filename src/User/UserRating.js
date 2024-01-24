import React, { useState } from 'react';
import axios from 'axios';
import './UserRating.css';

const apiurl = process.env.REACT_APP_API_URL;

function StarRating({ rating, setRating }) {
    return (
        <div>
            {[...Array(5)].map((_, index) => {
                const ratingValue = index + 1;
                return (
                    <button
                        type="button"
                        key={ratingValue}
                        className={ratingValue <= rating ? "on" : "off"}
                        onClick={() => setRating(ratingValue)}
                    >
                        <span className="star">&#9733;</span>
                    </button>
                );
            })}
        </div>
    );
}

function Review() {
    const djangoToken = localStorage.getItem("djangoToken");
    const tToken = localStorage.getItem("ttoken");

    const [usertoken, setUserToken] = useState(djangoToken || '');
    const [testtoken, setTestToken] = useState(tToken || '');
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(0);
    const [submitted, setSubmitted] = useState(false);
    const [ratingError, setRatingError] = useState(false); // State to track rating error

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (rating === 0) {
            setRatingError(true);
            return;
        }

        setRatingError(false);
        const reviewData = {
            usertoken,
            testtoken,
            comment,
            rating,
        };

        try {
            const response = await axios.post(apiurl + '/api/reviews/', reviewData);
            console.log(response.data);
            setSubmitted(true);  // Set submitted to true on successful submission
            
        } catch (error) {
            console.error(error);
        }
    };

    if (submitted) {
        return <div className="thank-you-message" style={{color: '#39424e'}}>Thank you for submitting your review!</div>;
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="card" style={{  marginLeft: 'auto', marginRight: 'auto', marginTop: '50px' }}>
                <div className="card-body">
                    
                    <div className="mb-3">
                       <div className='col' style={{textAlign:'left'}}><label htmlFor="rating" className="form-label" style={{textAlign:'left'}}>Rating</label></div> 
                       <div className='col' style={{textAlign:'left'}}> <StarRating rating={rating} setRating={setRating} /></div>
                       
                        {ratingError && <div className="error-message" style={{fontSize:'13px',color:'red'}}>Please select a star rating.</div>}
                    </div>
                    <div className="mb-3">
                    <div className='col' style={{textAlign:'left'}}><label htmlFor="comment" className="form-label">Feedback</label></div>
                    <div className='col' style={{textAlign:'left'}}> <textarea style={{border:'1px solid #9c9898'}} rows="4" required className="form-control" value={comment} onChange={(e) => setComment(e.target.value)} /></div>
                    </div>
                    <div className="mb-3">
                        <button className='btn btn-primary' type="submit">Submit Review</button>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default Review;
