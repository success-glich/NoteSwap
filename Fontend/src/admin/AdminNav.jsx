import React from "react";
import { Container, Row, Col } from "reactstrap";
import "../styles/admin-nav.css";
import { NavLink } from "react-router-dom";
const adminUser =
  "data:image/png;base64,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";

const admin__nav = [
  {
    display: "Dashboard",
    path: "/dashboard",
  },
  {
    display: "Catgeory",
    path: "/dashboard/category",
  },
  // {
  //   display: "AllNotes",
  //   path: "/dashboard/all-notes",
  // },
  {
    display: "Approve",
    path: "/dashboard/approve",
  },
  {
    display: "User",
    path: "/dashboard/users",
  },
];
const AdminNav = () => {
  return (
    <>
      <header className="admin__header">
        <div className="admin__nav-top">
          <Container>
            <div className="admin__nav-wrapper-top">
              <div className="logo">
                <h2>NoteSwap</h2>
              </div>
              <div className="search__box">
                <input type="text" placeholder="Search...." />
                <span>
                  <i className="ri-search-line"></i>
                </span>
              </div>
              <div className="admin__nav-top-right">
                <span>
                  <i className="ri-notification-3-line"></i>
                </span>
                <span>
                  <i className="ri-settings-2-line"></i>
                </span>
                <img src={adminUser} alt="" />
              </div>
            </div>
          </Container>
        </div>
      </header>
      <section className="admin__menu p-0 ">
        <Container>
          <Row>
            <div className="admin__navigation">
              <ul className="admin__menu-list">
                {admin__nav.map((item, index) => (
                  <li className="admin__menu-item" key={index}>
                    <NavLink
                      to={item.path}
                      className={(navClass) =>
                        navClass.isActive ? "active__admin-menu" : ""
                      }
                    >
                      {item.display}{" "}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default AdminNav;
