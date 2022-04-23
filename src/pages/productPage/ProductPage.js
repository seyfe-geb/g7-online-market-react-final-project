import { useLocation } from "react-router-dom";
import "./ProductPage.css";
import { useState } from "react";
import axios from "axios";

const ProductPage = () => {

  //get the state obj passed via link, it contains the product
  const location = useLocation();
  const { product } = location.state;

  //reviw state
  const [textReview, setTextReview ] = useState("");

  // lets stor the image links in a list;
  var listImages = [];
  for (var i = 0; i < product.images.length; i++) {
    listImages.push(product.images[i].imageUri);
  }

  const [imgIndex, setImgIndex] = useState(0);

  const decrementInd = () => {
    return imgIndex > 0 ? setImgIndex(imgIndex - 1) : setImgIndex(0);
  };

  const incrementInd = () => {
    return imgIndex < listImages.length - 1
      ? setImgIndex(imgIndex + 1)
      : setImgIndex(listImages.length - 1);
  };
  const postReview = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user.token)
    let config = {
      headers: {
        'Authorization': 'Bearer ' + user.token
      }
    }
    let url= "http://localhost:8080/reviews"
    let data = {
      id: 1,
      rating: 'NONE',
      comment: textReview,
      productId: product.id,
    };
    axios
      .post(url, data, config)
      .then(function (response) {
        alert("Review Succefully Posted!");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const followHandler=()=>{
    let url= "http://localhost:8080/user-follows"
    let data= {followeeId: product.user.id}
    axios.post( url, data).then(alert("Successfully followed seller!")).catch(err=>console.log(err))
  }

  return (
    <div id="container">
    <div className="productDetailCard">
      <div className="r1">
        <div className="images">
          <div className="arrow">
            <button onClick={decrementInd} className="btnArrow">
              {"< "}
            </button>
          </div>
          <div>
            <img src={listImages[imgIndex]} alt={product.name} id="prodImg" />
          </div>
          <div className="arrow">
            <button onClick={incrementInd} className="btnArrow">
              {" >"}
            </button>
          </div>
        </div>
        <div>
          <h1>{product.name}</h1>
          <p className="ItemPrice">${product.price}</p>

          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
          />
          <span className="fa fa-star checked"></span>
          <span className="fa fa-star checked"></span>
          <span className="fa fa-star checked"></span>
          <span className="fa fa-star"></span>
          <span className="fa fa-star"></span>
          {/* <br/>
        <button className="btn">Add to Cart</button> */}
        </div>
      </div>

      <div className="r2">
        <h2>About this item</h2>
        <p>{product.description}</p>

      </div >
      <div className="r2">
      <h2>Seller information</h2>
        <p>{product.user.fname +" "+ product.user.lname}</p>
        <button className="btn" onClick={followHandler}>Follow Seller</button>
      </div>

      <div className="r3">
        <h2>Add Reviews</h2>
        <textarea
          value={textReview}
          onChange={(event) => setTextReview(event.target.value)}
          placeholder="Enter your review here ..."
        ></textarea>{" "}
        <br />
        <button className="btn" onClick={postReview}>
          Add Review
        </button>
      </div>

      <div className="r4">
        <h2> Reviews</h2>
        {product.reviews.map((rev) =>
          rev.approved ? (
            <div className="reviewCard">
              <h4>
                {rev.user.fname + " " + rev.user.lname + ": " + rev.user.email}
              </h4>
              <p>{rev.comment}</p>
            </div>
          ) : (
            ""
          )
        )}
      </div>
    </div>
    </div>
  );
};

export default ProductPage;
