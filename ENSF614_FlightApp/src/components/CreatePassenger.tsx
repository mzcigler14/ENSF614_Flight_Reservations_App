/*
 *  File Name: CreatePassenger.tsx
 *  Assignment: ENSF 614 Project
 *  Completed by: Matjaz Cigler
 * Description: this is a component used by the BookFlight
 * page which has the functionality to create a passenger when
 * booking a flight
 * If you are a registered user the information is
 * auto-filled but can be changed
 * API call to create the passenger occurs on this page
 */

import React, { useState, useEffect, useContext } from "react";
import api from "../api/axiosConfig.ts";
import { UserContext } from "../contexts/UserContext.tsx";
import { newPassenger } from "../types.ts";
import DynamicDropdown from "./DynamicDropdown.tsx";
interface Props {
  setInsurancePrice: React.Dispatch<React.SetStateAction<number>>;
  setDiscount: React.Dispatch<React.SetStateAction<number>>;
  setPassengerid: React.Dispatch<React.SetStateAction<number>>;
  setPage: React.Dispatch<React.SetStateAction<string>>;
}
function CreateUser({
  setPassengerid,
  setPage,
  setInsurancePrice,
  setDiscount,
}: Props) {
  const [empty, setEmpty] = useState<Boolean>(false);
  const [insuranceName, setInsuranceName] = useState("None");

  const userContext = useContext(UserContext);
  // State to manage form inputs
  const [formData, setFormData] = useState<newPassenger>({
    legalname: "",
    DOB: "",
    email: "",
    insurancepolicynumber: 0,
    phonenumber: "",
    isregistered: false,
    userid: "",
  });
  useEffect(() => {
    populateData();
  }, []);
  const populateData = () => {
    if (userContext.userrole === 1) {
      return;
    } else {
      setFormData({
        legalname: userContext.legalname,
        DOB: userContext.DOB,
        phonenumber: userContext.phonenumber,
        insurancepolicynumber: 0,
        email: userContext.email,
        isregistered: true,
        userid: userContext.userid,
      });
    }
  };

  const createPassenger = async () => {
    console.log(formData);
    try {
      const response = await api.post(`/api/v1/flights/addpassenger`, {
        legalname: formData.legalname,
        DOB: formData.DOB,
        phonenumber: formData.phonenumber,
        insurancepolicynumber: findInsuranceNumber(),
        email: formData.email,
        isregistered: formData.isregistered,
        userid: formData.userid,
      });
      const passengeData = response.data;
      console.log(passengeData);
      setPassengerid(passengeData.passengerID);
      setPage("Enter Payment Information");
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  const checkEmpty = () => {
    if (
      formData.legalname === "" ||
      formData.DOB === "" ||
      formData.phonenumber === "" ||
      formData.email === ""
    ) {
      return false;
    }
    return true;
  };
  const findInsuranceNumber = () => {
    let insuranceValue = 0;
    if (insuranceName == "Low ($25)") {
      insuranceValue = 1;
      setInsurancePrice(25);
    } else if (insuranceName == "Medium($50)") {
      insuranceValue = 2;
      setInsurancePrice(50);
    } else if (insuranceName === "High($75)") {
      insuranceValue = 3;
      setInsurancePrice(75);
    }
    return insuranceValue;
  };

  const handleDiscount10 = () => {
    setDiscount(10);
  };
  const handleDiscount15 = () => {};
  // Function to handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Your logic to handle form submission goes here
    console.log("Form submitted!", formData);

    // Navigate to the Flight Booking Page after form submission
  };

  // Function to handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleCreatePassenger = async () => {
    findInsuranceNumber();
    const notEmpty = checkEmpty();
    if (notEmpty) {
      createPassenger();
    } else {
      setEmpty(true);
    }
  };

  return (
    <div className="passenger-payment">
      {empty && (
        <div className="alert alert-danger" role="alert">
          Please fill in all feilds.
        </div>
      )}
      <form className="create-user" onSubmit={handleSubmit}>
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
        <DynamicDropdown
          className={""}
          buttonName={insuranceName}
          setButtonName={setInsuranceName}
          items={["None", "Low ($25)", "Medium($50)", "High($75)"]}
        ></DynamicDropdown>
        <br />
        {userContext.userrole === 2 && (
          <div>
            <button
              className="btn btn-secondary"
              onClick={() => handleDiscount10()}
            >
              Use $10 memebership discount
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => handleDiscount15()}
            >
              Get $15 in points
            </button>
          </div>
        )}
        <br />
        <button type="button" onClick={handleCreatePassenger}>
          Submit Info
        </button>
      </form>
    </div>
  );
}

export default CreateUser;
