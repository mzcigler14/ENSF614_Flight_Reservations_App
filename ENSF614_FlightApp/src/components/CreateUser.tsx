/*
 *  File Name: CreatePassenger.tsx
 *  Assignment: ENSF 614 Project
 *  Completed by: Matjaz Cigler
 * Description: This is a component used by the AccountInfo
 * page which has the functionality to create or update a user
 * If you are a registered user the information is
 * auto-filled but can be changed (except userid for a registered
 * user)
 * API call to check for available userid, update info
 * or create account all occur in this file.
 * CAN NOT UPDATE USERID (primary key in DB)
 */

import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosConfig.ts";
import { User } from "../types.ts";
import { UserContext } from "../contexts/UserContext.tsx";

function CreateUser() {
  const navigate = useNavigate();
  const [useridEr, setUseridEr] = useState<Boolean>(false);
  const [empty, setEmpty] = useState<Boolean>(false);

  const userContext = useContext(UserContext);
  const oldUserid = userContext.userid;
  // State to manage form inputs
  const [formData, setFormData] = useState<User>({
    userid: "",
    userpassword: "",
    userrole: 2,
    legalname: "",
    DOB: "",
    phonenumber: "",
    email: "",
  });
  useEffect(() => {
    populateData();
    console.log(formData);
  }, []);
  const populateData = () => {
    if (userContext.userrole === 1) {
      return;
    } else {
      setFormData({
        userid: userContext.userid,
        userpassword: userContext.userpassword,
        userrole: userContext.userrole,
        legalname: userContext.legalname,
        DOB: userContext.DOB,
        phonenumber: userContext.phonenumber,
        email: userContext.email,
      });
    }
  };
  const checkAvail = async () => {
    try {
      const response = await api.get(
        `/api/v1/user/checkavail/${formData.userid}`
      );
      const userAvail = response.data;
      return userAvail;
    } catch (err) {
      console.log(err);
      return false;
    }
  };
  const createAccount = async () => {
    try {
      const response = await api.post(`/api/v1/user/add`, formData);
      return response;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  const updateAccount = async () => {
    try {
      const response = await api.put(
        `/api/v1/user/update/${oldUserid}`,
        formData
      );
      console.log(response.data.json);
      return response;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  const checkEmpty = () => {
    if (
      formData.userid === "" ||
      formData.userpassword === "" ||
      formData.legalname === "" ||
      formData.DOB === "" ||
      formData.phonenumber === "" ||
      formData.email === ""
    ) {
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Form submitted!", formData);

    navigate("/");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleCreate = async () => {
    console.log();
    const avail = await checkAvail();
    const notEmpty = checkEmpty();
    if (avail && notEmpty) {
      const created = createAccount();
      if (created != null) {
        navigate("/");
      }
    } else {
      if (!avail) {
        setUseridEr(true);
      } else {
        setEmpty(true);
        setUseridEr(false);
      }
    }
  };
  const handleUpdate = async () => {
    console.log(formData);
    const avail = await checkAvail();
    const notEmpty = checkEmpty();
    if ((avail || oldUserid === formData.userid) && notEmpty) {
      const created = updateAccount();
      if (created != null) {
        navigate("/");
      }
    } else {
      if (!avail) {
        setUseridEr(true);
      } else {
        setEmpty(true);
        setUseridEr(false);
      }
    }
  };

  return (
    <div>
      <h2>Create Account</h2>
      {useridEr && (
        <div className="alert alert-danger" role="alert">
          This UserID is not available, please choose a new one.
        </div>
      )}
      {empty && (
        <div className="alert alert-danger" role="alert">
          Please fill in all feilds.
        </div>
      )}
      <form className="create-user" onSubmit={handleSubmit}>
        <label className="input-item">
          UserID:
          <input
            type="text"
            name="userid"
            value={formData.userid}
            onChange={handleChange}
          />
        </label>
        <label className="input-item">
          Password:
          <input
            type="text"
            name="userpassword"
            value={formData.userpassword}
            onChange={handleChange}
          />
        </label>
        <label className="input-item">
          Legal Name:
          <input
            type="text"
            name="legalname"
            value={formData.legalname}
            onChange={handleChange}
          />
        </label>
        <label className="input-item">
          Date of Birth:
          <input
            type="date"
            name="DOB"
            value={formData.DOB}
            onChange={handleChange}
          />
        </label>
        <br />
        <label className="input-item">
          Phone:
          <input
            type="tel"
            name="phonenumber"
            value={formData.phonenumber}
            onChange={handleChange}
          />
        </label>
        <br />
        <label className="input-item">
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <br />
        {userContext.userrole === 1 && (
          <button type="button" onClick={handleCreate}>
            Create Account
          </button>
        )}
        {(userContext.userrole === 2 ||
          userContext.userrole === 3 ||
          userContext.userrole === 4 ||
          userContext.userrole === 5) && (
          <button type="button" onClick={handleUpdate}>
            Update Account
          </button>
        )}
        <button type="button" onClick={() => navigate("/Home")}>
          Back to Home
        </button>
      </form>
    </div>
  );
}

export default CreateUser;
