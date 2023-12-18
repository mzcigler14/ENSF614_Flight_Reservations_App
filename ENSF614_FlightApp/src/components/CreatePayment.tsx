/*
 *  File Name: CreatePayment.tsx
 *  Assignment: ENSF 614 Project
 *  Completed by: Matjaz Cigler
 * Description: This page is used by BookFlight
 * page when booking a flight and payment is required
 * this page collects the necesary payment information
 * to pay for the flight (price includes insurance and promotions)
 * No api call on this page, all info is changed on the BookFlight
 * page and that is where the 'addreceipt' api call occurs
 */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Payment } from "../types.ts";
interface Props {
  payment: Payment;
  setPayment: React.Dispatch<React.SetStateAction<Payment>>;
  setPage: React.Dispatch<React.SetStateAction<string>>;
}
function CreatePayment({ setPayment, setPage }: Props) {
  const navigate = useNavigate();
  const [empty, setEmpty] = useState<Boolean>(false);
  const [formData, setFormData] = useState<Payment>({
    cardtype: "",
    cardnumber: "",
    paymentdate: new Date().toISOString().split("T")[0],
    pin: "",
    expiry: "",
    postalcode: "",
  });

  // State to manage form inputs

  const pay = async () => {
    setPayment({
      cardtype: formData.cardtype,
      cardnumber: formData.cardnumber,
      paymentdate: formData.paymentdate,
      pin: formData.pin,
      expiry: formData.expiry,
      postalcode: formData.postalcode,
    });
  };

  const checkEmpty = () => {
    if (
      formData.cardtype === "" ||
      formData.cardnumber === "" ||
      formData.paymentdate === "" ||
      formData.pin === "" ||
      formData.expiry === "" ||
      formData.postalcode === ""
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
  const handlePay = async () => {
    const notEmpty = checkEmpty();
    if (notEmpty) {
      pay();
      setPage("Confirmation");
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
          CardType:
          <input
            type="text"
            name="cardtype"
            value={formData.cardtype}
            onChange={handleChange}
          />
        </label>
        <label className="input-item">
          CardNumber:
          <input
            type="text"
            name="cardnumber"
            maxLength={16}
            value={formData.cardnumber}
            onChange={handleChange}
          />
        </label>
        <label className="input-item">
          Pin:
          <input
            type="text"
            name="pin"
            maxLength={3}
            value={formData.pin}
            onChange={handleChange}
          />
        </label>
        <label className="input-item">
          Expiry:
          <input
            type="month"
            name="expiry"
            value={formData.expiry}
            onChange={handleChange}
          />
        </label>
        <label className="input-item">
          Postal Code:
          <input
            type="text"
            name="postalcode"
            maxLength={6}
            value={formData.postalcode}
            onChange={handleChange}
          />
        </label>
        <button type="button" onClick={handlePay}>
          Submit Info
        </button>
      </form>
    </div>
  );
}

export default CreatePayment;
