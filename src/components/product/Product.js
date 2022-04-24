
import "./Product.css";
import {Outlet, Link} from "react-router-dom"

export default function Product(props) {
  const { product, onAdd, onRemove } = props;

  return (
    <div className="productCard">
      <div id="imgContainer">
      <Link to="/productPage" state= {{product:product}}> 
      <img className="small" src={product.images.length > 0 ? product.images[0].imageUri : ""} alt={product.name} /></Link>
      </div>
      
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
        <button className="btn" onClick={() => onAdd(product)}>
          Add to Cart{" "}
        </button>
      </div>
    </div>
  );
}
