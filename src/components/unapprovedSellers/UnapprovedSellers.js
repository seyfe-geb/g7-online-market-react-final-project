import react, { useEffect, useState } from 'react';
import { axiosIntercepter } from '../../helper/axiosApiInstance';
import './UnapprovedSellers.css';

function UnapprovedSellers() {

    const [sellers, setSellers] = useState([]);

    function fetchUnapprovedSeller() {
        axiosIntercepter.get('http://localhost:8080/users/get-unapproved-sellers')
            .then(res => {
                setSellers(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }

    useEffect(fetchUnapprovedSeller, []);

    function approveSeller(id) {
        axiosIntercepter.put(`http://localhost:8080/users/approve-seller/${id}`)
            .then(res => {
                fetchUnapprovedSeller();
            })
            .catch(err => {
                console.log(err);
            });
    }

    if(!sellers || sellers.length === 0){
        return (
            <div>
                <p>No unapproved sellers</p>
            </div>
        )
    }

    return (
        <div>
            <div>
                <h2>Unapproved Sellers</h2>
            </div>
            <div>
                <table className='seller-table'>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Created At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sellers.map(seller => {
                            return (
                                <tr key={seller.id}>
                                    <td>{seller.fname}</td>
                                    <td>{seller.lname}</td>
                                    <td>{seller.email}</td>
                                    <td>{seller.createdAt}</td>
                                    <td><button onClick={()=>approveSeller(seller.id)}>Approve</button></td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default UnapprovedSellers;