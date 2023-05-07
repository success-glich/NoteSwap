import React from "react";
import "../styles/cart.css";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import { Container, Row, Col } from "reactstrap";

import tdImg from "../assets/images/arm-chair-01.jpg";
import { addItem } from "../redux/slices/cartSlice";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MotionConfig } from "framer-motion";
const Favorite = () => {
  const totalAmount = useSelector((state) => state.cart.totalAmount);

  const { cartItem } = useSelector((state) => state.cart);
  console.log(cartItem);
  return (
    <Helmet title="Favorite Note">
      <CommonSection title={"Favorite Notes"} />
      <section>
        <Container>
          <Row>
            <Col lg="9">
              {cartItem.length === 0 ? (
                <h2>No Notes added to the Favorite</h2>
              ) : (
                <table className="table bordered">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Title</th>

                      <th>Desc</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItem.map((item, index) => (
                      <tr key={index}>
                        <td>
                          <img src={item.imgUrl} alt="" />
                        </td>
                        <td>{item.productName}</td>
                        <td>{item.price}</td>
                        <td>{item.quantity}pc</td>
                        <td>
                          <i
                            whileTap={{ scale: 1.2 }}
                            className="ri-delete-bin-line"
                          ></i>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </Col>
            <Col lg="3">
              <div>
                <h6 className="d-flex align-items-center justify-content-between">
                  PostedBy:
                  <span className={"fs-4 fw-bold"}>{"Saphal"}</span>
                </h6>
              </div>

              <div>
                <button className="shop__btn w-100">
                  <Link to="#">Download</Link>
                </button>
                <button className="shop__btn w-100">
                  <Link to="/note">Continue to Download/Share</Link>
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Favorite;
