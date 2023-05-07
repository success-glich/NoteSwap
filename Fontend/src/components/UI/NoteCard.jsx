import React from "react";
import { motion } from "framer-motion";
import "../../styles/note-card.css";

import { Col } from "reactstrap";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";

import { addItem } from "../../redux/slices/cartSlice";
const NoteCard = ({ item }) => {
  // console.log(...item);
  console.log(item);
  const { _id, title, description, category, imgUrl } = item;
  console.log(imgUrl);
  const addToCart = () => {
    // alert('product added to the cart');
    toast.success("Product added successfully");
  };
  return (
    <Col lg="3" md="4" className="mb-2">
      <div className="note__item">
        <div className="note__img">
          <Link to={`/note/${_id}`}>
            <motion.img
              whileHover={{ scale: 0.9 }}
              src={`http://localhost:5005/${imgUrl}`}
              alt=""
            />{" "}
          </Link>
        </div>
        <div className="p-2 note__info">
          <h3 className="product__name">
            <Link to={`/note/${_id}`}> {title}</Link>{" "}
          </h3>
          <span> {"BIT"}</span>
        </div>
        <div className="note_card-button d-flex align-items-center justify-content-between p-2">
          <span className="price">{"Free download"}</span>
          <motion.span whileTap={{ scale: 1.2 }} onClick={addToCart}>
            <i className="ri-heart-line " style={{ fontSize: "1.3rem" }}></i>
          </motion.span>
        </div>
      </div>
    </Col>
  );
};

export default NoteCard;
