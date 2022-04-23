import react from "react";
import { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import "./CartPage.css";

const CartPage = (props) => {
  const { cartItems, onAdd, onRemove } = props;

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(
    () =>
      setTotalPrice(
        cartItems.reduce((tot, item) => tot + item.price * item.qty, 0)
      ),
    [cartItems]
  );

  return (
    <div className="cart">
      {cartItems.map((item) => (
        <div className="itemCard">
          <div>
            {item.name}{" "}
            <h4>
              {item.qty}x ${item.price}
            </h4>
          </div>

          <div className="col-2">
            <button onClick={() => onAdd(item)} className="btn">
              +
            </button>
            <button onClick={() => onRemove(item)} className="btn">
              -
            </button>
          </div>

          <div>
            <img id="prodIcon" src={item.images.length > 0 ? item.images[0].imageUri : ""} />
          </div>
        </div>
      ))}

      <h3>{totalPrice > 0 ? "Total price: $" + totalPrice : ""}</h3>
      {cartItems.length > 0 ? (
        <Link to="/checkout" state= {{cartItems:cartItems}}>
          {" "}
          <button className="btn btnCheckout">Proceed to checkout</button>
        </Link>
      ) : (
        ""
      )}
    </div>
  );
};

export default CartPage;
