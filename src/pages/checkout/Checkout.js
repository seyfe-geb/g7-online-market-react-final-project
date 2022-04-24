import "./Checkout.css";
import {Profiler, useState, useEffect, useRef, useContext} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { axiosIntercepter } from "../../helper/axiosApiInstance";
import {GetUserId} from "../../store/contexts/GetUserId";

export default function Checkout(props) {

  const userId = useContext(GetUserId);

  const paymentFormData = useRef();

  const [userInfo, setUserInfo] = useState({});

  const location = useLocation();

  const [user, setUser] = useState({});

  const [addresses, setAddresses] = useState([]);

  const [billing, setBilling] = useState({});

  const [shipping, setShipping] = useState({});

  const { cartItems } = location.state;

  const [sameAddress, setAddress] = useState(false);

  const [isApprovedBuyer, setIsApprovedBuyer] = useState(true); //update it from the user profile in redux

  const [inputData, setInputData] = useState({});

  let navigate = useNavigate();

  const [profile, setProfile] = useState({});

  const getUserProfile = () => {
    axiosIntercepter
      .get("http://localhost:8080/users/profile")
      .then((res) => {
        setAddresses(res.data.addresses);
        setProfile(res.data);
        // console.log(res.data);
      });
    addressMapper();
  };

  const postShippingAddress=()=>{
    let data= {
      street: "400 N st",
      city: "Fairfield",
      state: "IA",
      zipCode: "52557",
      type: "NONE",
      // "userId": 4
    }
    axiosIntercepter
    .post("http://localhost:8080/user-addresses/", data )
    .then(console.log("address added successfully!"))
  }

  const getUserInfo = (i)=>{
    axiosIntercepter
        .get("http://localhost:8080/users/" + userId)
        .then((res) => {
          setUserInfo(res.data);
        })
        .catch(err => console.log(err.message));
    console.log(userId);
  }
  

  const addressMapper = () => {
    for (let i=0; i < addresses.length; i++) {
      if(addresses[i].type == 'BILLING'){
        setBilling(addresses[i]);
        console.log(addresses[i].street);
      }else{
        setShipping(addresses[i]);
      }
    }
  }



  const addressHandler = () => {
    sameAddress ? setAddress(false) : setAddress(true);
    if (!sameAddress) {
      setInputData({
        name: "Seyfe Gebriel",
        emial: "smamo@miu.edu",
        address: "1104 Meadwallow bld 144",
        city: "Fairfield",
        state: "IA",
        zip: 52557,
      });
    } else {
      setInputData({
        name: "",
        email: "",
        address: "",
        city: "",
        state: "",
        zip: 0,
      });
    }
  };
  const validPayment = () => {
    // authenticate payment here, not done in this project
    return true;
  };

  const checkoutCart = () => {
    postShippingAddress()

    //place an order
    const url = "http://localhost:8080/orders";

    
    const items=cartItems.map(prod=>{
      let i={}
      // item.id=prod.id;
      i.quantity= prod.qty;
      i.productId= prod.id;
      return i;
    })
    const data = {
      orderItems: items,
      shippingAddressId: 1,
      paymentMethodId: 1,
    };

    axios
      .post(url, data)
      .then((res) => {
        alert("Order placed!");
        navigate("/buyer-profile", { replace: true });
      })
      .catch((err) => {
        alert("Order Failed");
        console.log(err);
      });

    //add the transaction to buyer history
  };
  const checkoutHandler = () => {
    if (isApprovedBuyer && validPayment) {
      checkoutCart();
    } else {
      navigate("/login", { replace: true });
      // return <Navigate to='/login' />
    }
  };

  useEffect(() => {
    console.log(userId + "Seyfe");
    setUser(JSON.parse(localStorage.getItem("user")));
    getUserProfile();
    getUserInfo();
  }, []);

  // profile.authorities[0].authority=='BUYER'? "setIsApprovedBuyer(true)": "setIsApprovedBuyer(false)"

  const makePayment = (e)=>{
    e.preventDefault();

  }

  return (
    <div>
      <div className="rw1">
        <h2>List of Items</h2>
        {profile.fname}
        <div className="items">
          {cartItems.map((item) => (
            <div className="itemCard">
              <div>
                {item.name}{" "}
                <strong>
                  {item.qty}x ${item.price}
                </strong>
              </div>

          <div>
            <img id="prodIcon" src={item.images.length > 0 ? item.images[0].imageUri : ""} />
          </div>
        </div>
      ))}
        </div>
      </div>
      <div className="rw2">
        <div className="row">
          <div className="col-50">
            <h2>Billing Address</h2>

            <label for="fname">
              <i className="fa fa-user"></i> Full Name
            </label>
            <input
              type="text"
              id="fname"
              name="firstname"
              value={inputData.name}
              placeholder="John M. Doe"
            />
            <label for="email">
              <i className="fa fa-envelope"></i> Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={inputData.email}
              placeholder="john@example.com"
            />
            <label for="adr">
              <i className="fa fa-address-card-o"></i> Address
            </label>
            <input
              type="text"
              id="adr"
              name="address"
              value={inputData.address}
              placeholder="542 W. 15th Street"
            />
            <label for="city">
              <i className="fa fa-institution"></i> City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={inputData.city}
              placeholder="New York"
            />

            <div className="row">
              <div className="col-50">
                <label for="state">State</label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={inputData.state}
                  placeholder="NY"
                />
              </div>
              <div className="col-50">
                <label for="zip">Zip</label>
                <input
                  type="text"
                  id="zip"
                  name="zip"
                  value={inputData.zip}
                  placeholder="10001"
                />
              </div>
            </div>
          </div>

          <div className="col-50">
            <h2>Payment</h2>
            <label for="fname">Accepted Cards</label>
            <div className="icon-container">
              <i className="fa fa-cc-visa"></i>
              <i className="fa fa-cc-amex"></i>
              <i className="fa fa-cc-mastercard"></i>
              <i className="fa fa-cc-discover"></i>
            </div>
            <label for="cname">Name on Card</label>
            <input
              type="text"
              id="cname"
              name="cardname"
              placeholder="John More Doe"
            />
            <label for="ccnum">Credit card number</label>
            <input
              type="text"
              id="ccnum"
              name="cardnumber"
              placeholder="1111-2222-3333-4444"
            />
            <label for="expmonth">Exp Month</label>
            <input
              type="text"
              id="expmonth"
              name="expmonth"
              placeholder="September"
            />
            <div className="row">
              <div className="col-50">
                <label for="expyear">Exp Year</label>
                <input
                  type="text"
                  id="expyear"
                  name="expyear"
                  placeholder="2018"
                />
              </div>
              <div className="col-50">
                <label for="cvv">CVV</label>
                <input type="text" id="cvv" name="cvv" placeholder="352" />
              </div>
            </div>
          </div>
        </div>
        <label>
          <input type="checkbox" onChange={addressHandler} name="sameadr" />{" "}
          Shipping address same as billing
        </label>
        {/* <input type="submit" value="Continue to checkout" className="btn"/> */}

        <button className="btn" onClick={checkoutHandler}> Checkout</button>

        <button className="btn" onClick={() => navigate("/buyer-profile")}>Cancel</button>
      </div>
    </div>
  );
}
