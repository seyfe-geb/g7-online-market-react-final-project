import React, { useState } from "react";
import "./Admin.css";

export default function Admin(){

  const [products, setProducts] = useState([
    {sellername: "Musie", id:1 , product: "Nissan"},
    {sellername: "Lidya", id:2 , product: "Phone"},
    {sellername: "Haile", id:3 , product: "Shoe"},
    
  ]) 


  const displaySellers= products.map(p=>
    <div className="prodCard">
      <p>Product: {p.product}</p>
      <p>Product id: {p.id}</p>
      <p>Seller name: {p.name}</p>
      <button>Approve</button>
      <button>Reject</button>
    </div>
  )
  return (
    <div>
      <h1>Products to be approved </h1>

      <div className="prodCards">
        {displaySellers}
      </div>
      <hr/>
      <h1>Reviews to be approved </h1>

      <div>

      </div>

    </div>
    
  )
}