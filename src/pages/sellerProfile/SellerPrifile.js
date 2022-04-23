import { useEffect, useRef, useState } from "react";
import "./SellerProfile.css";
import { axiosIntercepter } from "../../helper/axiosApiInstance";
import { Link } from "react-router-dom";

function SellerProfile() {
  const [seller, setSeller] = useState({});
  const [sellerRole, setSellerRole] = useState("");
  const [products, setProducts] = useState([]);
  const [oreders, setOrders] = useState([]);

  const status = useRef();

  const fetchSeller = () => {
    axiosIntercepter
      .get("http://localhost:8080/users/profile/")
      .then((response) => {
        console.log("userId", localStorage.getItem("userId"));
        setSeller(response.data);
        setSellerRole(response.data.authorities[0].authority);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axiosIntercepter
      .get("http://localhost:8080/products/my-products")
      .then((response) => {
        console.log(response.data);
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axiosIntercepter
      .get("http://localhost:8080/orders/seller-orders")
      .then((response) => {
        console.log(response.data);
        setOrders(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchSeller();
  }, []);

  const deleteHandler = (id) => {
    axiosIntercepter
      .delete("http://localhost:8080/products/" + id)
      .then((response) => {
        console.log(response);
        fetchSeller();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateHandler = (id, status) => {
    axiosIntercepter
      .put(
        "http://localhost:8080/orders/change-order-status/" + id + "/" + status
      )
      .then((response) => {
        console.log(response);
        fetchSeller();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="sellerProfile">
      {/* <div className="sellerProfile-container-left-name">
                <h1>{seller.fname} {seller.lname}</h1>
            </div>
            <div className="sellerProfile-container-left-name">
                <div className="seller-info">
                    <p>Username: {seller.username}</p>
                    <p>Email: {seller.email}</p>
                    <p>Role: {sellerRole}</p>
                    <p>Member since: {seller.createdAt}</p>
                    <p>Address: {seller.addresses && seller.addresses.length > 0 && seller.addresses[0].street}<br />
                        <span>{seller.addresses && seller.addresses.length > 0 && seller.addresses[0].city}, {seller.addresses && seller.addresses.length > 0 && seller.addresses[0].state}. {seller.addresses && seller.addresses.length > 0 && seller.addresses[0].zipCode}</span><br /></p>
                    <p>Payment Type: {seller.paymentMethods && seller.paymentMethods.length > 0 && seller.paymentMethods[0].type}</p>
                    <p>Payment Card#: {seller.paymentMethods && seller.paymentMethods.length > 0 && seller.paymentMethods[0].number}</p>
                </div>
            </div> */}
      {/* <Link to="/seller/products" className='button'>Show Products</Link> */}
      <div>
        <h2>My Products</h2>
        <div className="seller-content">
          {products.map((product) => (
            <div className="productCard" key={product.id}>
              <Link to="/productPage" state={{ product: product }}>
                {" "}
                <img
                  className="small"
                  src={
                    product.images.length > 0 ? product.images[0].imageUri : ""
                  }
                  alt={product.name}
                />
              </Link>

              <h4>{product.name}</h4>
              <div>
                <link
                  rel="stylesheet"
                  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
                />
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star"></span>
                <span className="fa fa-star"></span>
              </div>

              <p>${product.price}</p>
              <div>
                <button
                  className="btn"
                  onClick={() => deleteHandler(product.id)}
                >
                  Delete{" "}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <hr />
        <Link to="/add-product"> Add Product </Link>
      </div>

      <div>
        <hr />
        <h2>My Orders</h2>
        <div className="seller-content">
          {oreders.map((order) => (
            <div className="productCard" key={order.id}>
              <div>
                <p>Order Id: {order.id}</p>
                <p>Order Date: {order.createdAt}</p>
                <p>Order Status: {order.status}</p>
                <p>Order Price: {order.price}</p>
              </div>

              <div className="images">
                <div className="arrow">
                  <button className="btnArrow">
                    {"< "}
                  </button>
                </div>
                <div>
                  <img
                    src={order.orderItems[0].product.images[0].imageUri}
                    alt={order.name}
                  />
                </div>
                <div className="arrow">
                  <button className="btnArrow">
                    {" >"}
                  </button>
                </div>
              </div>

              <div>
                <select ref={status}>
                  <option value="PENDING">Pending</option>
                  <option value="SHIPPED">Shipped</option>
                  <option value="ON_THE_WAY">On the way</option>
                  <option value="DELIVERED">Delivered</option>
                  <option value="CANCELLED">Cancelled</option>
                </select>
                <button
                  className="btn"
                  onClick={() => updateHandler(order.id, status.current.value)}
                >
                  Change Status{" "}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SellerProfile;
