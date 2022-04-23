import Product from "../../components/product/Product";
import "./Buyer.css";
import { useState, useEffect } from "react";
import CartPage from "../cart/CartPage";
import { useSelector } from "react-redux";


const Buyer = (props) => {
  const { products, onAdd, onRemove, cart } = props;
  const [searchTerm, setSearchTerm] = useState("");
  //const [searchResults, setSearchResults] = useState(products);

  const profileState = useSelector((state) => state.profile);
  const [profile, setProfile] = useState(profileState.profile);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // useEffect(() => {
  //   const results = products.filter(
  //     (product) => product.name.toLowerCase().includes(searchTerm)
  //     // || product.seller.toLowerCase().includes(searchTerm)
  //   );
  //   setSearchResults(results);
  // }, [searchTerm]);

  useEffect(() => {
    setProfile(profileState.profile);
  }, [profileState.profile]);

  return (
    <main>
      {/* {<h1>{profile.fname}</h1>} */}
      <div className="buyer-content">
        <div className="row1" id="cart">
          {/* {searchResults
              ? searchResults.map((product) => (
                  <div>
                    <Product
                      key={product.id}
                      product={product}
                      onAdd={onAdd}
                      onRemove={onRemove}
                    ></Product>
                  </div>
                ))
              : products.map((product) => (
                  <div>
                    <Product
                      key={product.id}
                      product={product}
                      onAdd={onAdd}
                      onRemove={onRemove}
                    ></Product>
                  </div>
                ))} */}


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
