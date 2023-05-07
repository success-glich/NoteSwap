import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import { fetchNotes } from "../redux/slices/noteSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "../config/axios";
import { toast } from "react-toastify";
const NoteApprove = () => {
  const dispatch = useDispatch();
  const [filteredNotes, setFilteredNotes] = useState([]);

  const { notes } = useSelector((state) => state.note);
  const handleStatusChange = async (id, status) => {
    // console.log(id, status);
    const res = await axios.patch(`/notes/${id}`, {
      status,
    });
    if (res.status === 200 && res.statusText === "OK") {
      toast.success("Successfully Reviewed");
    }
  };
  useEffect(() => {
    dispatch(fetchNotes());
    const noteData = notes.filter((note) => note.noteStatus === "reviewing");
    setFilteredNotes(noteData);
  }, []);
  console.log(filteredNotes);
  return (
    <>
      <Container>
        <Col lg="12">
          <Row>
            <Col lg="12">
              {filteredNotes.length <= 0 ? (
                <h2>No notes left for review</h2>
              ) : (
                <table className="table bordered">
                  <thead>
                    <tr>
                      <th>SN</th>
                      <th>Title</th>
                      <th>Desc</th>

                      <th>coverImg</th>
                      <th>Pdf File</th>
                      <th>Approve</th>
                      <th>Reject</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredNotes?.map((note, index) => (
                      <tr key={note._id}>
                        <td>{index + 1}</td>

                        <td>{note.title}</td>
                        <td>{note.description.trim().slice(0, 20)}..</td>
                        <td>
                          <img
                            src={`http://localhost:5005/${note?.imgUrl}`}
                            alt=""
                          />
                        </td>
                        <td>
                          <a
                            href={`http://localhost:5005/${note?.fileUrl}`}
                            target="_blank"
                          >
                            <button className="btn btn-primary">
                              View pdf
                            </button>
                          </a>
                        </td>
                        <td>
                          <button
                            className="btn btn-success"
                            onClick={() =>
                              handleStatusChange(note._id, "accept")
                            }
                          >
                            Accept
                          </button>
                        </td>
                        <td>
                          <button
                            className="btn btn-danger"
                            onClick={() => {
                              if (confirm("Do you want to reject")) {
                                handleStatusChange(note._id, "rejected");
                              }
                            }}
                          >
                            Reject
                          </button>
                        </td>
                      </tr>
                    ))}
                    {/* {categories?.map((category, index) => (
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
                    ))} */}
                  </tbody>
                </table>
              )}
            </Col>
          </Row>
        </Col>
      </Container>
    </>
  );
};

export default NoteApprove;
