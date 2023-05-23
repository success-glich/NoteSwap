import React, { useEffect, useState } from "react";
import CommentSection from "../components/UI/CommonSection";
import Helmet from "../components/Helmet/Helmet";
import { Container, Row, Col } from "reactstrap";
import "../styles/note.css";
import products from "../assets/data/products";
import notes from "../assets/data/notes";
import NoteLists from "../components/UI/NoteList";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
const Shop = () => {
  const { notes, isLoading } = useSelector((state) => state.note);

  const [productsData, setProductsData] = useState(products);
  const [notesData, setNotesData] = useState(notes);
  const handleFilter = (e) => {
    const filterValue = e.target.value;
    if (filterValue === "bca") {
      const filteredNotes = notes.filter(
        (item) => item.category.title === "BCA" && item.noteStatus === "accept"
      );

      setNotesData(filteredNotes);
    }
    if (filterValue === "bit") {
      // alert("invoke");
      const filteredNotes = notes.filter(
        (item) => item.category.title === "BIT" && item.noteStatus === "accept"
      );
      console.log(filteredNotes);
      setNotesData(filteredNotes);
    }
    if (filterValue === "bbm") {
      const filteredNotes = notes.filter(
        (item) => item.category.title === "BBM" && item.noteStatus === "accept"
      );
      setNotesData(filteredNotes);
    }
    if (filterValue === "bim") {
      const filteredNotes = notes.filter(
        (item) => item.category.title === "BBM" && item.noteStatus === "accept"
      );
      setNotesData(filteredNotes);
    }
  };
  const handleSorting = (e) => {
    const filterValue = e.target.value;
    if (filterValue === "ascending") {
      alert("ascending boy");
      // notesData.sort((a, b) => a.title - b.title);
    }
    if (filterValue === "descending") {
      alert("descending");
    }
  };
  const handleSearch = (e) => {
    const searchItem = e.target.value;

    const searchedProducts = notes.filter((note) =>
      note.title.toLowerCase().includes(searchItem.toLowerCase())
    );
    setNotesData(searchedProducts);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [notes]);
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
                  <option value="bca">BCA</option>
                  <option value="bbm">BBM</option>
                  <option value="bit">BIT</option>
                  <option value="bim">BIM</option>
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
                <select name="" id="" onChange={handleSorting}>
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
              <h1 className="text-center">Notes are not found !</h1>
            ) : (
              <NoteLists data={notesData} />
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Shop;
