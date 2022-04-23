import react from 'react';
import UnapprovedReviews from '../../components/unapprovedReviews/UnapprovedReviews';
import UnapprovedSellers from '../../components/unapprovedSellers/UnapprovedSellers';
import './AdminPage.css';

function AdminPage() {





    return (
        <div>
            <h2>Admin Page</h2>
            <UnapprovedSellers />
            <br />
            <hr />
            <br />
            <UnapprovedReviews />
        </div>
    )
}

export default AdminPage;