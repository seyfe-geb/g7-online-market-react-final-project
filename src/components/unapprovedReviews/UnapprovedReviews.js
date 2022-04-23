import react, { useEffect, useState } from 'react';
import { axiosIntercepter } from '../../helper/axiosApiInstance';
import './UnapprovedReviews.css';
import axios from "axios";

function UnapprovedReviews() {
    
        const [reviews, setReviews] = useState([]);
    
        function fetchUnapprovedReviews() {
            axiosIntercepter.get('http://localhost:8080/reviews/get-unapproved-reviews')
                .then(res => {
                    setReviews(res.data);
                })
                .catch(err => {
                    console.log(err);
                });

        }
    
        useEffect(() => fetchUnapprovedReviews(), []);
    
        function approveReview(id) {
            axiosIntercepter.put(`http://localhost:8080/reviews/approve-review/${id}`)
                .then(res => {
                    fetchUnapprovedReviews();
                })
                .catch(err => {
                    console.log(err);
                });
        }

        if(!reviews || reviews.length === 0){
            return (
                <div>
                    <p>No unapproved reviews</p>
                </div>
            )
        }
        
    
        return (
            <div>
                <div>
                    <h2>Unapproved Reviews</h2>
                </div>
                <div>
                    <table className='review-table'>
                        <thead>
                            <tr>
                                <th>Product Id</th>
                                <th>Customer Name</th>
                                <th>Review</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reviews.map(review => {
                                return (
                                    <tr key={review.id}>
                                        <td>{review.productId}</td>
                                        <td>{review.user.fname + ' ' + review.user.lname}</td>
                                        <td>{review.comment}</td>
                                        <td><button onClick={()=>approveReview(review.id)}>Approve</button></td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    export default UnapprovedReviews;