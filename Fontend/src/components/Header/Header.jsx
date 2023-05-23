import React, { useRef, useEffect } from "react";
import "./header.css";
import { motion } from "framer-motion";
import logo from "../../assets/image/logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import { Container, Row, Button, Nav } from "reactstrap";

import { userLogout } from "../../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const nav__links = [
  {
    path: "home",
    display: "Home",
  },
  {
    path: "note",
    display: "Notes",
  },
  {
    path: "shop",
    display: "Blog",
  },
];
const Header = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const { totalQuantity } = useSelector((state) => state.cart);
  const { isUserLoggedIn } = useSelector((state) => state.user);

  const totalQuantity = 10;
  const stickyHeaderFunc = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current?.classList.add("sticky__header");
      } else {
        headerRef.current?.classList.remove("sticky__header");
      }
    });
  };
  const handleLogout = () => {
    dispatch(userLogout());
    toast.success("Logout successfully");
    navigate("/");
  };
  useEffect(() => {
    stickyHeaderFunc();
    return () => window.removeEventListener("scroll", stickyHeaderFunc);
  });
  const menuToggle = () => menuRef.current?.classList.toggle("active__menu");
  const navigateToCart = () => {
    navigate("/cart");
  };
  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div className="nav__wrapper">
            <div className="logo" onClick={() => navigate("/")}>
              <img src={logo} alt="logo" />
              <div>
                <h1>NoteSwap </h1>
                {/* <p>Since 1995</p> */}
              </div>
            </div>
            <div className="navigation" ref={menuRef} onClick={menuToggle}>
              <ul className="menu">
                {nav__links.map((item, index) => (
                  <li className="nav__item" key={index}>
                    <NavLink
                      to={item.path}
                      className={(navClass) =>
                        navClass.isActive ? "nav__active" : ""
                      }
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
            <div className="nav__icons">
              {/* <span className="cart__icon" onClick={navigateToCart}>
                <i className="ri-heart-line"></i>

                <span className="badge">{totalQuantity}</span>
              </span> */}
              {isUserLoggedIn ? (
                <span>
                  <Button
                    onClick={handleLogout}
                    className="shop__btn btn logoutBtn"
                  >
                    <NavLink to="/"> Logout</NavLink>
                  </Button>
                </span>
              ) : (
                <span>
                  <Button className="shop__btn btn loginBtn">
                    <NavLink to="/login"> login</NavLink>
                  </Button>
                  <Button className="shop__btn signupBtn">
                    <NavLink to="signup">Signup</NavLink>
                  </Button>
                </span>
              )}

              <div className="mobile__menu">
                <span onClick={menuToggle}>
                  <i className="ri-menu-line"></i>
                </span>
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
