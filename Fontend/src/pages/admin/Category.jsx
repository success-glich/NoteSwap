import React from "react";
import { useState } from "react";
import { Form, FormGroup, Row, Col, Container } from "reactstrap";
import axios from "../../config/axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";

const Category = () => {
  const [title, setTitle] = useState("");
  const [categories, setCategories] = useState([]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title !== "") {
      try {
        const response = await axios.post("category", { title });
        toast.success(response.data?.message || "Category added successfully");
      } catch (err) {
        toast.error(err?.message || "There is some error to add");
      }
    }
  };
  const handleRemove = async (id) => {
    try {
      const response = await axios.delete(`category/${id}`);
      if (response.status === 200) {
        toast.success(response.data.message);
      }
    } catch (err) {}
  };
  useEffect(() => {
    fetchCategory();
  }, []);
  const fetchCategory = async () => {
    const response = await axios.get("category");
    // console.log(response.sat.categories);

    setCategories(response.data?.categories || []);
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="6">
            <h4 className="mb-5">Add Category</h4>
            <Form onSubmit={handleSubmit}>
              <div className="d-flex align-items-center justify-content-between gap-5">
                <FormGroup className="form__group w-50">
                  <span> Category title</span>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="BCA "
                  />
                </FormGroup>
              </div>
              <button className="shop__btn btn">Add Category</button>
            </Form>
          </Col>
          <Col lg="6">
            <Row>
              <Col lg="9">
                {!true ? (
                  <h2>No items added to the cart</h2>
                ) : (
                  <table className="table bordered">
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Title</th>

                        <th>Delete</th>
                        <th>Edit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categories?.map((category, index) => (
                        <tr key={category?._id}>
                          <td>{index + 1}</td>
                          <td>{category?.title}</td>
                          <td>
                            <motion.span whileTap={{ scale: 1.4 }}>
                              <i
                                onClick={() => {
                                  handleRemove(category._id);
                                }}
                                className="ri-delete-bin-line text-center"
                              ></i>
                            </motion.span>
                          </td>
                          <td>
                            <motion.span whileTap={{ scale: 1.4 }}>
                              <i className="ri-edit-line"></i>
                            </motion.span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Category;
