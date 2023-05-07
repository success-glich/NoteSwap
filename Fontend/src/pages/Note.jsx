import React, { useEffect, useState } from "react";
import CommentSection from "../components/UI/CommonSection";
import Helmet from "../components/Helmet/Helmet";
import { Container, Row, Col } from "reactstrap";
import "../styles/note.css";
import products from "../assets/data/products";
import notes from "../assets/data/notes";
import ProductLists from "../components/UI/NoteList";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
const Shop = () => {
  const [productsData, setProductsData] = useState(products);
  const [notesData, setNotesData] = useState(notes);
  const handleFilter = (e) => {
    const filterValue = e.target.value;
    if (filterValue === "sofa") {
      const filteredProduct = products.filter(
        (item) => item.category === "sofa"
      );
      setProductsData(filteredProduct);
    }
    if (filterValue === "mobile") {
      const filteredProduct = products.filter(
        (item) => item.category === "mobile"
      );
      setProductsData(filteredProduct);
    }
    if (filterValue === "chair") {
      const filteredProduct = products.filter(
        (item) => item.category === "chair"
      );
      setProductsData(filteredProduct);
    }
    if (filterValue === "wireless") {
      const filteredProduct = products.filter(
        (item) => item.category === "wireless"
      );
      setProductsData(filteredProduct);
    }
    if (filterValue === "watch") {
      const filteredProduct = products.filter(
        (item) => item.category === "watch"
      );
      setProductsData(filteredProduct);
    }
  };
  const handleSearch = (e) => {
    const searchItem = e.target.value;

    const searchedProducts = products.filter((item) =>
      item.productName.toLowerCase().includes(searchItem.toLowerCase())
    );
    setProductsData(searchedProducts);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [products]);
  return (
    <Helmet title="shop">
      <CommentSection title="Notes" />
      <section>
        <Container>
          <Row>
            <Col lg={4} md="3" className="text-start m-0">
              <div className="filter__widget">
                <select name="" id="" onChange={handleFilter}>
                  <option>Filter By Category</option>
                  <option value="sofa">BCA</option>
                  <option value="mobile">BIT</option>
                  <option value="chair">BIM</option>
                  <option value="watch">Class 10</option>
                </select>
              </div>
            </Col>
            <Col lg={4} md="3" className="text-center">
              <motion.button
                whileHover={{ scale: 1.2 }}
                className="  shop__btn my-2"
              >
                <Link to="/add-note"> Add Notes</Link>
              </motion.button>
            </Col>

            <Col md="3" lg={4} className="text-end">
              <div className="filter__widget">
                <select name="" id="">
                  <option>Sort By Category</option>
                  <option value="ascending">Ascending</option>
                  <option value="descending">Descending</option>
                </select>
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg="12" md="6">
              <div className="search__box">
                <input
                  type="text"
                  placeholder="Search....."
                  onChange={handleSearch}
                />
                <span>
                  <i className="ri-search-line"></i>
                </span>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="pt-0">
        <Container>
          <Row>
            {notesData.length === 0 ? (
              <h1 className="text-center">No Products are found !</h1>
            ) : (
              <ProductLists data={notes} />
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Shop;
