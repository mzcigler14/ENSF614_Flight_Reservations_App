/*
 *  File Name: FlightPanel.tsx
 *  Assignment: ENSF 614 Project
 *  Completed by: Matjaz Cigler
 * Description: This is a component takes a 'Flight'
 * and pagename and displays relative information based on the page,
 * user and FLight
 * For a regestered user (customer) on the homepage the option to cancel flight
 * is available
 * For crew on the home page or when browsing flights view passengers is
 * available
 * For Agent when browsing flight they can view passengers
 * For non-registered/registered  customer they can book flights on the
 * Browse page
 */

import "../styles.css";
import { useContext, useEffect, useState } from "react";
import { Flight } from "../types.ts";
import { UserContext } from "../contexts/UserContext.tsx";
import { Passenger } from "../types.ts";
import api from "../api/axiosConfig.ts";
import PassengerPanel from "./PassengerPanel.tsx";
import { useNavigate } from "react-router-dom";

interface Props {
  flight: Flight;
  index: number;
  page: "Home" | "Browse Flights" | "Book";
}
const FlightPanel = ({ flight, page }: Props) => {
  const navigate = useNavigate();
  const [passengers, setPassengers] = useState<Passenger[]>();
  const [showPassengers, setShowPassengers] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const userContext = useContext(UserContext);
  userContext.userrole = userContext.userrole;
  const [alreadyBooked, setAlreadyBooked] = useState<boolean>(false);

  const getAllPassengers = async () => {
    try {
      const response = await api.get(
        `/api/v1/flights/passengerbyflight/${flight.flightid}`
      );
      const passengerData = response.data;
      setPassengers(passengerData);
      setShowPassengers(true);
    } catch (err) {
      console.log(err);
      setShowPassengers(false);
    }
  };
  const cancelFlight = async () => {
    try {
      await api.get(
        `/api/v1/flights/deleteticket/${userContext.userid}/${flight.flightid}`
      );
    } catch (err) {
      console.log(err);
      setShowPassengers(false);
    }
    location.reload();
  };
  const handleBook = async () => {
    if (userContext.userrole == 2) {
      try {
        const response = await api.get(
          `/api/v1/flights/isbooked/${userContext.userid}/${flight.flightid}`
        );
        setAlreadyBooked(response.data);
        setIsLoaded(true);
      } catch (err) {
        console.log(err);
        setShowPassengers(false);
      }
    } else {
      localStorage.setItem("flight", JSON.stringify(flight));
      navigate("/BrowseFlights/BookFlight");
    }
  };

  useEffect(() => {
    if (!alreadyBooked && isLoaded) {
      localStorage.setItem("flight", JSON.stringify(flight));
      navigate("/BrowseFlights/BookFlight");
    }
  }, [isLoaded]);
  return (
    <div className="show-flights">
      <div className="flight-panel">Flight ID : {flight.flightid}</div>
      <div className="flight-panel">Airline: {flight.airlineid}</div>
      <div className="flight-panel">Origin: {flight.origin}</div>
      <div className="flight-panel">Destination: {flight.destination}</div>
      <div className="flight-panel">Departure Date: {flight.depdate}</div>
      <div className="flight-panel">Departure Time: {flight.deptime}</div>
      {alreadyBooked && (
        <div className="alert alert-danger" role="alert">
          You have already booked this flight, please choose a different one or
          login as a guest
        </div>
      )}
      {(userContext.userrole == 2 || userContext.userrole == 1) &&
        page === "Browse Flights" && (
          <button className="btn btn-secondary" onClick={() => handleBook()}>
            Book Flight
          </button>
        )}
      {userContext.userrole == 2 && page === "Home" && (
        <button className="btn btn-secondary" onClick={() => cancelFlight()}>
          Cancel Flight
        </button>
      )}
      {(userContext.userrole == 3 || userContext.userrole == 4) && (
        <button
          className="btn btn-secondary"
          onClick={() => getAllPassengers()}
        >
          View Passengers
        </button>
      )}

      {showPassengers && passengers != undefined && (
        <>
          <p>Passengers:</p>
          <div>
            {passengers.map((passenger, index) => (
              <PassengerPanel
                key={index}
                passenger={passenger}
                index={index}
              ></PassengerPanel>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default FlightPanel;
