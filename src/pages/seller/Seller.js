import './Seller.css';


const Seller = (props) => {
  //assuming we get products that are from this seller
  const {products}= props;

  return (

    <div>

    <div class= "body">
      <p>Welcome to Seller Page</p>

    </div>
{/* 
    <div className="col1">
        {products.map((product) => (
          <div className="cardContainer"> 
            <div className="card">
              <img src={product.image} alt={product.name} id="prodImg"/>
              <h1>{product.name}</h1>
              <p className="price">${product.price}</p>
              <p>Some descriptions about the products..</p>
              <p><button className="btn">Edit product</button> </p>

            </div>
          </div>
        ))}

    </div> */}

    <div >
      <h1>add product page</h1>
    </div>
  </div>
      
  )
}

export default Seller;  