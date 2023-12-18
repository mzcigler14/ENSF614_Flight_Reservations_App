/*
 *  File Name: BookFlight.tsx
 *  Assignment: ENSF 614 Project
 *  Completed by: Matjaz Cigler
 * Description: This is a page is used to book a ticket on a flight.
 * The fligth is read in from local storage (written in the browse page)
 * This page first gives the SeatMap and asks the user to pick a seat
 * if not seat is picked the user may not continue
 * Then the customer is asked to enter passenger information
 * All info must be added before continuing (on the passenger info page
 * insurance can be chosen and for registered users they may choose promotions)
 * Next payment information is taken, all fields must by inputed
 * Once payment is taken the ticket (API call) and receipt (API call) are created and a confirmation notification
 * page is displayed
 */

import Header from "../components/Header.tsx";
import { useEffect, useState } from "react";
import CreatePassenger from "../components/CreatePassenger.tsx";
import CreatePayment from "../components/CreatePayment.tsx";
import SeatMap from "../components/SeatMap.tsx";
import { Seat, Flight, Payment } from "../types.ts";
import FlightPanel from "../components/FlightPanel.tsx";
import api from "../api/axiosConfig.ts";

function BookFlight() {
  const [ticketid, setTicketid] = useState("");
  const [receipt, setReceipt] = useState("");
  const [page, setPage] = useState("Pick Your Seat");
  const [noSeat, setNoSeat] = useState(false);
  const pageName = "Book Flight";
  const [passengerid, setPassengerid] = useState<number>(0);
  const [insurancePrice, setInsurancePrice] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);

  const [payment, setPayment] = useState<Payment>({
    cardtype: "",
    cardnumber: "",
    paymentdate: "",
    pin: "",
    expiry: "",
    postalcode: "",
  });
  const [seat, setSeat] = useState<Seat>({
    seatN: "",
    rowN: 0,
    colN: 0,
    price: 0,
    typedescription: "", //includes business, first etc
    available: false,
  });

  const [flight, setFlight] = useState<Flight>({
    airlineid: "",
    origin: "",
    destination: "",
    depdate: "",
    deptime: "",
    flightid: 0,
  });
  const initFlight = {
    airlineid: "",
    origin: "",
    destination: "",
    depdate: "",
    deptime: "",
    flightid: 0,
  };

  const createTicket = async () => {
    console.log(passengerid);
    try {
      const response = await api.post(`/api/v1/flights/addticket`, {
        passengerid: passengerid,
        flightid: flight.flightid,
        seatN: seat.seatN,
      });
      const ticketData = response.data;
      setTicketid(ticketData.ticketid);
      setPage("Enter Payment Information");
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  const createPayment = async () => {
    try {
      const response = await api.post(`/api/v1/flights/addreceipt`, {
        cardtype: payment.cardtype,
        cardnumber: payment.cardnumber,
        paymentdate: payment.paymentdate,
        pin: payment.pin,
        expiry: payment.expiry,
        postalcode: payment.postalcode,
        ticketid: ticketid,
        amount: seat.price + insurancePrice - discount,
      });
      const receiptData = response.data;
      setReceipt(receiptData);
      setPage("Notified Confirmation");
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  useEffect(() => {
    const flightRaw = localStorage.getItem("flight");
    const flightSet = flightRaw
      ? (JSON.parse(flightRaw) as Flight)
      : initFlight;
    setFlight(flightSet);
  }, []);

  useEffect(() => {
    console.log(seat);
    if (passengerid > 0) {
      createTicket();
    }
    console.log(passengerid);
  }, [payment]);

  useEffect(() => {
    if (payment.cardnumber != "") {
      createPayment();
    }
  }, [ticketid]);
  const continueCheckout = () => {
    if (seat.seatN != "") {
      setNoSeat(false);
      setPage("Enter Passenger Information");
    } else {
      setNoSeat(true);
    }
  };

  return (
    <div>
      <div className="header">
        <Header pageName={pageName}></Header>
      </div>

      <div className="show-flight">
        <FlightPanel
          key={1}
          flight={flight}
          index={1}
          page="Book"
        ></FlightPanel>
      </div>
      <h2 className="book-title">{page}</h2>
      {noSeat && (
        <div className="show-flight alert alert-danger" role="alert">
          Please choose a seat
        </div>
      )}

      {page == "Pick Your Seat" && (
        <>
          <div className="seat">
            Seat Number : {seat.seatN} Refresh page if seats are not shown
            <br />
            Seat Type : {seat.typedescription}
            <br />
            Seat Price : ${seat.price}
            <button onClick={() => continueCheckout()}>
              Continue to Checkout
            </button>
          </div>
          <SeatMap
            flight={flight}
            setPage={setPage}
            setSeat={setSeat}
          ></SeatMap>
        </>
      )}
      {page == "Enter Passenger Information" && (
        <CreatePassenger
          setDiscount={setDiscount}
          setInsurancePrice={setInsurancePrice}
          setPage={setPage}
          setPassengerid={setPassengerid}
        ></CreatePassenger>
      )}
      {page == "Enter Payment Information" && (
        <div>
          <div className="seat">
            Total Price : ${seat.price + insurancePrice - discount}
          </div>
          <CreatePayment
            setPage={setPage}
            payment={payment}
            setPayment={setPayment}
          ></CreatePayment>
        </div>
      )}
      {page == "Notified Confirmation" && (
        <div className="seat">
          Ticketid: {ticketid}
          <br />
          Seat Number : {seat.seatN}
          <br />
          Seat Type : {seat.typedescription}
          <br />
          Total Price Paid : ${seat.price + insurancePrice - discount}
        </div>
      )}
    </div>
  );
}
export default BookFlight;
