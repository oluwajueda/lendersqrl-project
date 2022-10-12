import React, { useState, useEffect, useRef } from "react";
import userimage from "../photos/userimage.png";
import User from "./User";
// import axios from "axios";
import { useFetch } from "./useFetch";

import userdropdown from "../photos/userdropdown.png";

import forward from "../photos/forward.png";
import backward from "../photos/backward.png";
import activeuser from "../photos/activeuser.png";
import userwithloan from "../photos/userwithloan.png";
import { useGlobalContext } from "../context";
import OrganizationDropdown from "./OrganizationDropdown";

const DashboardArea = () => {
  const { loading, data } = useFetch();
  const [page, setPage] = useState(0);
  const [users, setUsers] = useState([]);
  const [organization, setOrganization] = useState(false);

  const [isModalOpenController, setIsModalOpenController] = useState(false);

  useEffect(() => {
    if (loading) return;
    setUsers(data[page]);
    console.log(users);
  }, [loading, data]);

  const handlePage = (index) => {
    setPage(index);
  };

  const nextPage = () => {
    setPage((oldPage) => {
      let nextPage = oldPage + 1;
      if (nextPage > data.length - 1) {
        nextPage = 0;
      }
      return nextPage;
    });
  };
  const prevPage = () => {
    console.log("hello");
    setPage((oldPage) => {
      let prevPage = oldPage - 1;
      if (prevPage > data.length - 1) {
        prevPage = data.length - 1;
      }
      return prevPage;
    });
  };

  useEffect(() => {
    const modalHandler = (e) => {
      const modalOpener = e.target.classList.contains("userdropdown");
      const modalContainer = e.target.classList.contains("show-modal");
      if (organization) {
        if (!modalOpener && !modalContainer) {
          setOrganization(false);
        }
      }
    };
    document.addEventListener("click", modalHandler);
    return () => document.removeEventListener("click", modalHandler);
  });

  return (
    <div className="dashboard_area">
      <div className="dashboard_child">
        <h2 className="dashboard_h2">Users</h2>
        <div className="box">
          <div className="box_child">
            <img src={userimage} alt="" className="box_child_image image-1  " />

            <p className="box_p">USERS</p>
            <h4>2,453</h4>
          </div>
          <div className="box_child">
            <img src={activeuser} alt="" className="box_child_image image-2" />
            <p className="box_p">ACTIVE USERS</p>
            <h4>2,453</h4>
          </div>
          <div className="box_child">
            <img
              src={userwithloan}
              alt=""
              className="box_child_image image-3"
            />
            <p className="box_p">USERS WITH LOANS</p>
            <h4>2,453</h4>
          </div>
          <div className="box_child">
            <img
              src={userwithloan}
              alt=""
              className="box_child_image image-4"
            />
            <p className="box_p">USERS WITH SAVINGS</p>
            <h4>2,453</h4>{" "}
          </div>
        </div>
        <div className="user_whole">
          <div className="user_children">
            <div className="user_details">
              <div className="grid_table">
                <div className="user_single organization">
                  <h5>ORGANIZATION</h5>
                  <img
                    src={userdropdown}
                    alt=""
                    className="userdropdown"
                    onClick={() => {
                      setOrganization(true);
                    }}
                  />
                  <div
                    className={`${
                      organization
                        ? "modal-overlay show-modal form-modal"
                        : "modal-overlay"
                    }`}
                  >
                    <form>
                      <div className="form_row">
                        <label className="form_label">organization</label>
                        <select className="form_input">
                          <option>Select</option>
                        </select>
                      </div>
                      <div className="form_row">
                        <label className="form_label">Username</label>
                        <input placeholder="User" className="form_input" />
                      </div>

                      <div className="form_row">
                        <label className="form_label">Email</label>
                        <input placeholder="Email" className="form_input" />
                      </div>
                      <div className="form_row">
                        <label className="form_label">Date</label>
                        <input placeholder="Date" className="form_input" />
                      </div>
                      <div className="form_row">
                        <label className="form_label">Phone Number</label>
                        <input
                          placeholder="Phone Number"
                          className="form_input"
                        />
                      </div>
                      <div className="form_row">
                        <label className="form_label">Status</label>
                        <select className="form_input">
                          <option>Select</option>
                        </select>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="user_single">
                  <h5>USERNAME</h5>
                  <img src={userdropdown} alt="" className="userdropdown" />
                </div>
                <div className="user_single">
                  <h5>EMAIL</h5>
                  <img src={userdropdown} alt="" className="userdropdown" />
                </div>
                <div className="user_single">
                  <h5 className="phone">PHONE NUMBER</h5>
                  <img src={userdropdown} alt="" className="userdropdown" />
                </div>
                <div className="user_single">
                  <h5>DATE JOINED</h5>
                  <img src={userdropdown} alt="" className="userdropdown" />
                </div>
                <div className="user_single">
                  <h5>STATUS</h5>
                  <img src={userdropdown} alt="" className="userdropdown" />
                </div>
              </div>
            </div>
            <div>
              {users.map((user) => {
                return (
                  <User
                    key={user.id}
                    {...user}
                    isModalOpenController={isModalOpenController}
                  />
                );
              })}
            </div>
          </div>
        </div>
        <div className="last_part">
          <div className="showing">
            <p>Showing</p>
            <select className="select">
              <option>100</option>
            </select>
            <p>out of 100</p>
          </div>

          {!loading && (
            <div className="page_btn_div">
              <button onClick={prevPage} className="arrow-btn">
                <img src={backward} alt="" />
              </button>
              {data.map((item, index) => {
                return (
                  <button
                    key={index}
                    onClick={() => handlePage(index)}
                    className={`page-btn ${
                      index === page ? "active-btn" : null
                    }`}
                  >
                    {index + 1}
                  </button>
                );
              })}
              <button onClick={nextPage} className="arrow-btn">
                <img src={forward} alt="" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardArea;
