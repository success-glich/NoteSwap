import React, { useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Button,
} from "reactstrap";
import "../styles/login.css";
// import axios from "../config/axios";
import axios from "../config/axios";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import { useEffect } from "react";

const AddNote = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    title: "",
    category: "",

    description: "",
    imgUrl: "",
    fileUrl: "",
  });
  const [uploadStatus, setUploadStatus] = useState({
    coverImg: "",
    document: "",
  });
  // const [selectedImage, setSelectedImage] = useState(null);
  // const [selectedDocument, setSelectedDocument] = useState(null);
  const [categories, setCategories] = useState([]);
  //   const [loading, setLoading] = useState(true);
  const handleImageChange = async (event) => {
    // setSelectedImage(event.target.files[0]);
    alert("Do you want to upload the cover images");

    // const formData = new FormData();
    let formData = new FormData();

    formData.append("file", event.target.files[0]);
    console.log(event.target.files[0]);
    try {
      const response = await axios.post("upload", formData);
      if (response.status === 200 && response.statusText === "OK") {
        setUploadStatus((prev) => {
          return {
            ...prev,
            coverImg: " cover image Uploaded ",
          };
        });
        setInput((prev) => ({
          ...prev,
          imgUrl: response.data.path,
        }));
      } else {
        setUploadStatus((prev) => {
          return {
            ...prev,
            coverImg: "Failed to upload images ",
          };
        });
      }
    } catch (err) {
      setUploadStatus((prev) => {
        return {
          ...prev,
          coverImg: "Failed to upload images ",
        };
      });
      console.log(err);
    }
  };
  const handleDocumentChange = async (event) => {
    // setSelectedDocument(event.target.files[0]);
    alert("Do you want to upload the notes");
    const formData = new FormData();

    //
    formData.append("file", event.target.files[0]);
    // console.log(event.target.files[0]);
    try {
      const response = await axios.post("upload", formData);
      if (response.status === 200 && response.statusText === "OK") {
        setUploadStatus((prev) => {
          return {
            ...prev,
            document: " document Uploaded ",
          };
        });
        setInput((prev) => ({
          ...prev,
          fileUrl: response.data.path,
        }));
      } else {
        setUploadStatus((prev) => {
          return {
            ...prev,
            document: "Failed to upload cover document ",
          };
        });
      }
    } catch (err) {
      setUploadStatus((prev) => {
        return {
          ...prev,
          document: "Failed to upload cover document ",
        };
      });
      console.log(err);
    }
  };

  //for both images should upload at one time
  // const handleUpload = async (event) => {
  //   if (!selectedImage || !selectedDocument) {
  //     setUploadStatus("Please select both and image file and a document");
  //     return true;
  //   }
  //   const formData = new FormData();
  //   formData.append("file", selectedImage);
  //   formData.append("document", selectedImage);
  //   try {
  //     const response = await axios.post("upload", {
  //       formData,
  //     });
  //     if (response.ok) {
  //       setUploadStatus("Files uploaded successfully");
  //     } else {
  //       setUploadStatus("Failed to upload files");
  //     }
  //   } catch (err) {
  //     setUploadStatus("Failed to upload files");
  //     console.log(err);
  //   }
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("notes", {
        ...input,
      });
      console.log(res);
      if (res?.status === 201) {
        toast.success(res?.data.message + " wait for review");
        navigate("/");
        return true;
      } else {
        alert("error");
      }
    } catch (err) {
      toast.error("Failed to upload data");
      console.log(err);
    }
  };
  useEffect(() => {
    fetchCategory();
  }, []);
  const fetchCategory = async () => {
    try {
      const response = await axios.get("category");
      setCategories(response.data?.categories || []);
    } catch (err) {
      console.log(err?.message);
    }
  };
  console.log(input);

  return (
    <Helmet title="add-note">
      <section>
        <Container>
          <Row>
            <Col lg="6" className="m-auto text-center">
              <h3 className="fw-bold mb-4">Add New Note</h3>

              <Form className="auth__form" onSubmit={handleSubmit}>
                <FormGroup className="form__group">
                  <input
                    type="text"
                    name="title"
                    placeholder="title"
                    value={input.title}
                    onChange={handleChange}
                  />
                </FormGroup>
                <FormGroup className="form__group">
                  <Input
                    type="textarea"
                    name="description"
                    placeholder="Enter  Description"
                    value={input.description}
                    onChange={handleChange}
                  />
                </FormGroup>

                <FormGroup className="form__group px-0 text-white">
                  <span className="px-4 text-secondary">Cover Image </span>

                  <input
                    type="file"
                    accept=".png,.jpg,.jpeg"
                    name="file"
                    onChange={handleImageChange}
                  />
                </FormGroup>
                {uploadStatus.coverImg && <p>{uploadStatus.coverImg}</p>}

                <FormGroup className=" p-0 form__group text-white">
                  <span className="px-4 text-secondary">
                    Upload Notes (PDF/Word/PPT){" "}
                  </span>
                  <input
                    accept=".pdf,.doc,.docx,.ppt,.pptx"
                    type="file"
                    name="document"
                    onChange={handleDocumentChange}
                  />
                  {uploadStatus.document && <p>{uploadStatus.document}</p>}
                </FormGroup>
                {/* {selectedImage && selectedDocument && (
                  <Button color="primary" onClick={handleUpload}>
                    Upload Image
                  </Button>
                )} */}
                <FormGroup>
                  <Label for="exampleSelect">Select</Label>
                  <Input
                    type="select"
                    value={input?.category}
                    name="category"
                    id="exampleSelect"
                    onChange={handleChange}
                  >
                    {categories?.map((category, index) => (
                      <option key={index} value={category._id}>
                        {category?.title}
                      </option>
                    ))}
                  </Input>
                </FormGroup>

                <button type="submit" className="shop__btn login__btn">
                  Upload Notes
                </button>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default AddNote;
