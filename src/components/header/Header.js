import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { logout } from "../../redux/actions/auth";


export default function Header(props) {

  const dispatch = useDispatch();

  const authState = useSelector((state) => state.auth);
  const [user, setUser] = useState(null);

  // const [searchTerm, setSearchTerm] = React.useState("");
  // const [searchResults, setSearchResults] = React.useState([]);
  // const handleChange = event => {
  //   setSearchTerm(event.target.value);
  // };
  // React.useEffect(() => {
  //   const results = people.filter(person =>
  //     person.toLowerCase().includes(searchTerm)
  //   );
  //   setSearchResults(results);
  // }, [searchTerm]);

  const { products, onAdd, onRemove, cart } = props;
  const [searchTerm, setSearchTerm] = useState("");
  //const [searchResults, setSearchResults] = useState(products);

  const logoutHandler = () => {
    dispatch(logout());
    user = null;

  }

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };


  useEffect(() => {
    setUser(authState.user);
  }, [authState.user]);

  return (
    <div className="topnav">
      <div className="brand">Online Market</div>

      <div className="menu-items">
        {(user && user.authorities[0].authority == "BUYER") &&
          <div className="menuItem search">
            <input
              className="inpSearch"
              value={searchTerm}
              onChange={handleChange}
              placeholder="Search..."
            />
          </div>
        }

        {(user && user.authorities[0].authority == "BUYER") &&
          <div className="menuItem">
            <a>
              <i className="fa fa-shopping-cart">
                {" "}
                <button id="btnNumItems">
                  {cart.length == 0 ? "" : cart.length}
                </button>
              </i>
            </a>
          </div>
        }
        
        <div className="menuItem">
          {!user && <Link to="/login" id="login-bttun">Login</Link>}

          {user && <Link to="/" id="logout-bttun" onClick={logoutHandler}>Logout</Link>}
        </div>
      </div>
    </div >
  );
}