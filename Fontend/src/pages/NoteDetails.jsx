import React, { useState, useRef } from "react";
import { Container, Row, Col, Button } from "reactstrap";

import { useParams } from "react-router-dom";
// import products from "../assets/data/products";
import notes from "../assets/data/notes";

import Helmet from "../components/Helmet/Helmet";
import CommentSection from "../components/UI/CommonSection";
import "../styles/note-details.css";
import { motion } from "framer-motion";
import ProductList from "../components/UI/NoteList";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../redux/slices/cartSlice";
import axios from "../config/axios";
import { fetchNote } from "../redux/slices/noteSlice";
import { toast } from "react-toastify";
import NoteList from "../components/UI/NoteList";
import { useEffect } from "react";
function isEmptyOrSpaces(str) {
  return str === null || str.match(/^ *$/) !== null;
}

const NoteDetails = () => {
  const [tab, setTap] = useState("desc");
  const [rating, setRating] = useState(null);
  const [avgRating, setAvgRating] = useState(null);
  const dispatch = useDispatch();
  const reviewUser = useRef("");
  const reviewMsg = useRef("");
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);
  const { isUserLoggedIn } = useSelector((state) => state.user);
  const { note } = useSelector((state) => state.note);

  const addToCart = () => {
    toast.success("Note added to favorite");
  };
  //   const product = products.find((item) => item.id === id);
  // const note = notes.find((item) => item.id === "01");
  // /

  //relates notes
  // const relatedNotes = notes.filter((item) => item.category === category);
  const submitHandler = async (e) => {
    e.preventDefault();
    const reviewUserName = reviewUser.current.value;
    const reviewUsersMsg = reviewMsg.current.value;
    console.log(reviewUserName, reviewUsersMsg, rating);
    if (isEmptyOrSpaces(reviewUserName) || isEmptyOrSpaces(reviewUsersMsg)) {
      toast.warning("title and Message need to be fulfill");
    } else {
      const reviewObj = {
        name: reviewUserName,
        text: reviewUsersMsg,
        rating,
        note: id,
      };
      // console.log(reviewObj);
      try {
        const response = await axios.post("review", reviewObj);
        // console.log(response);
        if (response.status === 200) {
          toast.success(response.data.message);
        } else {
          toast.error("Error to post data");
        }
      } catch (err) {}
    }
  };
  const handleDownloadClick = (e) => {
    if (!false) {
      toast.warn("Please logged in to download");
    }
  };
  useEffect(() => {
    dispatch(fetchNote(id));
    fetchReviews();
  }, []);
  const fetchReviews = async () => {
    const response = await axios.get("review");
    const reviews = await response.data.review;
    console.log(reviews);
    const filterReviews = reviews.filter((review) => review.note._id === id);
    const totalRating = reviews.reduce((sum, review) => {
      if (review.note._id == id) {
        return sum + review.rating;
      }
      return sum;
    }, 0);
    // const avgRating = totalRating / reviews.length;
    setAvgRating((totalRating / reviews.length).toFixed(2));
    setReviews(filterReviews);
  };

  useEffect(() => {}, [note]);
  const {
    title = "Notes",
    imgUrl,
    fileUrl,
    category: { title: categoryTitle },
    description: shortDesc,
  } = note;

  return (
    <Helmet title={title && "notes"}>
      <CommentSection title={title && "notes"} />
      <section className="pt-0">
        <Container>
          <Row>
            <Col lg="6" className="mt-2">
              <img
                src={`http://localhost:5005/${imgUrl}`}
                alt=""
                height={300}
                width={300}
              />
            </Col>
            <Col lg="6">
              <div className="product__details">
                <h2>{title && title}</h2>
                <div className="product__rating d-flex align-items-center gap-5 mb-3">
                  <div>
                    <span>
                      <i className="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i className="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i className="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i className="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i className="ri-star-half-s-line"></i>
                    </span>
                  </div>
                  <p>
                    ( <span>{avgRating} </span> ratings)
                  </p>
                </div>
                <div className="d-flex align-items-center gap-5">
                  <span className="product__price">${"FREE"}</span>
                  <span>Category: {categoryTitle}</span>
                </div>
                <p className="my-3">{shortDesc}</p>
                <motion.button
                  whileTap={{ scale: 1.2 }}
                  className="shop__btn"
                  onClick={addToCart}
                >
                  Add to Favorite
                </motion.button>
                <motion.button
                  whileTap={{ scale: 1.2 }}
                  className="shop__btn mx-4"
                  onClick={handleDownloadClick}
                >
                  {isUserLoggedIn ? (
                    <a href={`http://localhost:5005/${fileUrl}`} download>
                      Download
                    </a>
                  ) : (
                    "Download"
                  )}
                </motion.button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <Container>
        <Row>
          <Col lg="12">
            <div className="tab__wrapper d-flex align-items-center gap-5">
              <h6
                className={`${tab === "desc" ? "active__tab" : ""}`}
                onClick={() => setTap("desc")}
              >
                Description
              </h6>
              <h6
                className={`${tab === "desc" ? "active__tab" : ""}`}
                onClick={() => setTap("rev")}
              >
                Reviews ({reviews?.length})
              </h6>
            </div>
            {tab === "desc" ? (
              <div className="tab__content mt-4">
                <p>{shortDesc}</p>
              </div>
            ) : (
              <div className="product__review mt-5">
                <div className="review__wrapper">
                  <ul>
                    {/* {reviews?.map((item, index) => ( */}
                    {reviews?.map((item, index) => (
                      <li key={index} className="mb-4">
                        <span>
                          <h6>{item?.user.email}</h6>
                          {item.rating} (rating)
                        </span>
                        <p>{item.text}</p>
                      </li>
                    ))}
                  </ul>
                  {isUserLoggedIn ? (
                    <div className="review__form">
                      <form onSubmit={submitHandler}>
                        <h4>Leave your experience</h4>

                        <div className="form__group">
                          <input
                            type="text"
                            placeholder="Enter name"
                            ref={reviewUser}
                          />
                        </div>
                        <div className="form__group d-flex align-items-center gap-5">
                          <motion.span
                            whileTap={{ scale: 1.2 }}
                            onClick={() => setRating(1)}
                          >
                            1 <i className="ri-star-s-fill"></i>
                          </motion.span>
                          <motion.span
                            whileTap={{ scale: 1.2 }}
                            onClick={() => setRating(2)}
                          >
                            2 <i className="ri-star-s-fill"></i>
                          </motion.span>
                          <motion.span
                            whileTap={{ scale: 1.2 }}
                            onClick={() => setRating(3)}
                          >
                            3 <i className="ri-star-s-fill"></i>
                          </motion.span>
                          <motion.span
                            whileTap={{ scale: 1.2 }}
                            onClick={() => setRating(4)}
                          >
                            4 <i className="ri-star-s-fill"></i>
                          </motion.span>
                          <motion.span
                            whileTap={{ scale: 1.2 }}
                            onClick={() => setRating(5)}
                          >
                            5 <i className="ri-star-s-fill"></i>
                          </motion.span>
                        </div>
                        <div className="form__group">
                          <textarea
                            ref={reviewMsg}
                            rows={4}
                            type="text"
                            placeholder="Review Message...."
                          />
                        </div>
                        <button className="shop__btn mb-5">Submit</button>
                      </form>
                    </div>
                  ) : (
                    <div className="review__form">
                      <h4>Leave your experience</h4>
                      <div className="form__group">
                        <label htmlFor="" className="mx-2 text-warning">
                          Please Login first to review{" "}
                          <motion.button
                            whileTap={{ scale: 1.2 }}
                            className="shop__btn mx-4"
                          >
                            Login
                          </motion.button>
                        </label>
                      </div>
                    </div>
                  )}
                  {/* <div className="review__form" onSubmit={submitHandler}>
                    <form action="">
                      <h4>Leave your experience</h4>

                      <div className="form__group">
                        <input
                          type="text"
                          placeholder="Enter name"
                          ref={reviewUser}
                        />
                      </div>
                      <div className="form__group d-flex align-items-center gap-5">
                        <motion.span
                          whileTap={{ scale: 1.2 }}
                          onClick={() => setRating(1)}
                        >
                          1 <i className="ri-star-s-fill"></i>
                        </motion.span>
                        <motion.span
                          whileTap={{ scale: 1.2 }}
                          onClick={() => setRating(2)}
                        >
                          2 <i className="ri-star-s-fill"></i>
                        </motion.span>
                        <motion.span
                          whileTap={{ scale: 1.2 }}
                          onClick={() => setRating(3)}
                        >
                          3 <i className="ri-star-s-fill"></i>
                        </motion.span>
                        <motion.span
                          whileTap={{ scale: 1.2 }}
                          onClick={() => setRating(4)}
                        >
                          4 <i className="ri-star-s-fill"></i>
                        </motion.span>
                        <motion.span
                          whileTap={{ scale: 1.2 }}
                          onClick={() => setRating(5)}
                        >
                          5 <i className="ri-star-s-fill"></i>
                        </motion.span>
                      </div>
                      <div className="form__group">
                        <textarea
                          ref={reviewMsg}
                          rows={4}
                          type="text"
                          placeholder="Review Message...."
                        />
                      </div>
                      <button className="shop__btn mb-5">Submit</button>
                    </form>
                  </div> */}
                </div>
              </div>
            )}
          </Col>
          {/* <Col lg="12" className="mt-5">
            <h2 className="related__title mb-2">You might also like</h2>
          </Col>
          <NoteList data={relatedNotes} /> */}
        </Row>
      </Container>
    </Helmet>
    // <h1>hello</h1>
  );
};

export default NoteDetails;
