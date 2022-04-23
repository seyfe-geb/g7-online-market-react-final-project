import Product from "../../components/product/Product";
import "./Buyer.css";
import { useState, useEffect } from "react";
import CartPage from "../cart/CartPage";
import { useSelector } from "react-redux";


const Buyer = (props) => {
  const { products, onAdd, onRemove, cart } = props;
  const [searchTerm, setSearchTerm] = useState("");


  const profileState = useSelector((state) => state.profile);
  const [profile, setProfile] = useState(profileState.profile);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };


  useEffect(() => {
    setProfile(profileState.profile);
  }, [profileState.profile]);

  return (
    <main>
      {/* {<h1>{profile.fname}</h1>} */}
      <div className="buyer-content">
        <div className="row1" id="cart">


          {products.map((product) => (
              <Product
                key={product.id}
                product={product}
                onAdd={onAdd}
                onRemove={onRemove}
              ></Product>
          ))}
        </div>

        <div className="row2">
          <CartPage cartItems={cart} onAdd={onAdd} onRemove={onRemove} />
        </div>
      </div>
    </main>
  );
};

export default Buyer;
