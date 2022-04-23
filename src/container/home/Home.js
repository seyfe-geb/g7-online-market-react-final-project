
import React, { useState, useEffect } from 'react';
import "./Home.css"
import Seller from '../../pages/seller/Seller';
import Buyer from '../../pages/buyer/Buyer';
import ProductPage from '../../pages/productPage/ProductPage';

import { Routes, Route } from "react-router-dom";
import axios from 'axios';
import RegisterUser from '../../pages/registerUser/RegisterUser';
import Checkout from '../../pages/checkout/Checkout';
import SellerProfile from '../../pages/sellerProfile/SellerPrifile';
import OrderPage from '../../pages/orderPage/OrderPage';
import AddProduct from '../../pages/addProduct/AddProduct';
import UnapprovedSellers from '../../components/unapprovedSellers/UnapprovedSellers';
import AdminPage from '../../pages/adminPage/AdminPage';
import LoginComponent from '../../pages/login/Login';
import Header from '../../components/header/Header';

const Home = (props) => {

  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    axios.get("http://localhost:8080/products")
      .then((res) => {
        setProducts(res.data);

      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, [])

  const [cartItems, setCartItems] = useState([]);

  const onAdd = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist) {
      if (exist.qty < product.quantity) {
        setCartItems(
          cartItems.map((x) =>
            x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x)
        )
      } else {
        alert("Item out of stock!")
      }
    }
    else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);

    }
  }

  const onRemove = (product) => {

    const exist = cartItems.find((x) => x.id === product.id);
    if (exist) {

      if (exist.qty == 1) {
        setCartItems(cartItems.filter((x) => x.id !== product.id));
      } else {
        setCartItems(
          cartItems.map((x) =>
            x.id === product.id ? { ...exist, qty: exist.qty - 1 } : x
          )
        );
      }

    }

  }

  return (
    <div className='home-container'>
      <Header cart = {cartItems}/>
      <Routes>


        <Route path="checkout" element={<Checkout cart={cartItems}/>} />
        <Route path="login" element={<LoginComponent/>} />
        <Route path="register" element={<RegisterUser />} />

        <Route path="seller-profile" element={<SellerProfile />} />
        <Route path="add-product" element={<AddProduct />} />
        <Route path="productPage" element={<ProductPage />} />
        <Route path="sellerPage" element={<Seller products={products} />} />

        <Route path="admin-profile" element={<AdminPage/>} />

        <Route path="buyer-profile" element={<Buyer products={products} onAdd={onAdd} onRemove={onRemove} cart={cartItems} />}/>
        <Route path="order" element={<OrderPage />} />
        <Route path="checkout" element={<Checkout cart={cartItems}/>} />

        <Route path="/" element={<Buyer products={products} onAdd={onAdd} onRemove={onRemove} cart={cartItems} />}> </Route>
      </Routes>
    </div>


  )
}

export default Home;

