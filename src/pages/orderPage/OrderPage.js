import react, { useEffect, useState } from 'react';
import './OrderPage.css';
import {axiosIntercepter}  from "../../helper/axiosApiInstance"

const OrderPage = (props) => {

    const [order, setOrder] = useState({});

    const fetchOrder = async (id) => {
        axiosIntercepter.get(`http://localhost:8080/orders/` + "5")
            .then(res => {
                setOrder(res.data);
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }

    // useEffect(fetchOrder(props.match.params.id), []);
    useEffect(() => {
        fetchOrder();
    }, []);

    return (
        <div className="orderPage">
            <h2>Order Page</h2>
            <div className="order">
                <span>Order ID: {order.id}</span>
                <span>Order Date: {order.createdAt}</span>
                <span>Order Status: {order.status}</span>
                <span>Order Total: ${order.price}</span>
            </div>

            <div className="order-content">
                <div className="order-content-items">
                    <h4>Order Items:</h4>
                    <div className="order-content-item">
                        {order.orderItems && order.orderItems.map((item) => (
                            <div className="productCard" key={item.id}>
                                <img className="small" src={item.product.images[0].imageUri} alt={item.product.name} />
                                <h4>{item.product.name}</h4>
                                <p>Quantity: {item.quantity}</p>
                                <p>Price: {item.product.price}</p>
                            </div>
                        )
                        )}
                    </div>
                </div>

                <div className="order-content-details">
                    <h4>Order Details:</h4>
                    <div className="order-content-details-inner">
                        <p>Name: {order.user && order.user.fname} {order.user && order.user.lname}</p>
                        <p>Email: {order.user && order.user.email}</p>
                        <p>Shipping Address: <span>
                            {order.shippingAddress && order.shippingAddress.street}<br />
                            {order.shippingAddress && order.shippingAddress.city} {order.shippingAddress && order.shippingAddress.state} {order.shippingAddress && order.shippingAddress.zipCode}
                        </span></p>
                        <p>Payment Info:<br />
                            <span>
                                Type: {order.paymentMethod && order.paymentMethod.type}<br />
                                Card Number: {order.paymentMethod && order.paymentMethod.number}<br />
                            </span></p>
                    </div>
                    <div className="price">
                        <p>Order Total: ${order.price}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderPage;