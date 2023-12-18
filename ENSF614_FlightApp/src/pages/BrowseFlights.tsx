/*
 *  File Name: BrowseFlights.tsx
 *  Assignment: ENSF 614 Project
 *  Completed by: Matjaz Cigler
 * Description: On this page three drop downs (origin, destination, and departure date)
 * contain all the origins, destinations, and departure dates contained in the db are
 * called (API) and displayed in the dropdowns
 * The user must select each of the options than search. On search all flights (if there any)
 * are displayed.
 * Based on the user type the user can view passengers (admin, crew, agent) or book flight
 * (registered/ non-registed users). On book flight the user is take to the BookFlight Page
 * The chosen flight info is written into local storage for reading in the BookFlight page.
 */

import { useState, useEffect, useContext } from "react";
import Header from "../components/Header.tsx";
import "../styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import DynamicDropdown from "../components/DynamicDropdown.tsx";
import api from "../api/axiosConfig.ts";
import { Flight } from "../types.ts";
import FlightPanel from "../components/FlightPanel.tsx";
import { UserContext } from "../contexts/UserContext.tsx";

function BrowseFlights() {
  const [availFlights, setAvailFlights] = useState<Flight[]>();
  const pageName = "Browse Flights";
  const [source, setSource] = useState<string>("Choose an Origin");
  const [destination, setDestination] = useState<string>(
    "Choose a Destination"
  );
  const [date, setDate] = useState<string>("Choose a Date");
  const [srcLocs, setSrcLocs] = useState<string[]>(["No Sources"]);
  const [destLocs, setDestLocs] = useState<String[]>(["No Destinations"]);
  const [dates, setDates] = useState(["0000-00-00"]);
  const [showFlights, setShowFlights] = useState<boolean>(false);
  const [errFlights, setErrFlights] = useState<boolean>(false);
  const userContext = useContext(UserContext);
  userContext.userrole = userContext.userrole;

  const getAllFlights = async () => {
    try {
      const response = await api.get("/api/v1/flights");
      const flightData = response.data as Flight[];
      setAvailFlights(flightData);

      setSrcLocs([...new Set(flightData.map((Flight) => Flight.origin))]);
      setDestLocs([...new Set(flightData.map((Flight) => Flight.destination))]);
      setDates([...new Set(flightData.map((Flight) => Flight.depdate))]);
    } catch (err) {
      console.log(err);
    }
  };
  const findFlights = async () => {
    try {
      const response = await api.get(
        `/api/v1/flights/${source}/${destination}/${date}`
      );
      const flightData = response.data;
      setAvailFlights(flightData);
      setShowFlights(true);
      setErrFlights(false);
    } catch (err) {
      console.log(err);
      setErrFlights(true);
    }
  };
  useEffect(() => {
    getAllFlights();
  }, []);

  return (
    <>
      <div className="header">
        <Header pageName={pageName}></Header>
      </div>

      <div className="user-input-bar">
        <div className="user-input-bar">
          <DynamicDropdown
            className="input-item"
            items={srcLocs}
            buttonName={source}
            setButtonName={setSource}
          ></DynamicDropdown>
          <DynamicDropdown
            className="input-item"
            items={destLocs}
            buttonName={destination}
            setButtonName={setDestination}
          ></DynamicDropdown>
          <DynamicDropdown
            className="input-item"
            items={dates}
            buttonName={date}
            setButtonName={setDate}
          ></DynamicDropdown>
          <button
            className="input-item btn btn-secondary"
            type="button"
            onClick={() => findFlights()}
          >
            Search
          </button>
        </div>
      </div>
      <div className="show-fights">
        {showFlights &&
          availFlights != undefined &&
          availFlights[0] != undefined && (
            <div>
              {availFlights.map((flight, index) => (
                <FlightPanel
                  key={index}
                  flight={flight}
                  index={index}
                  page="Browse Flights"
                ></FlightPanel>
              ))}
            </div>
          )}
        {showFlights && availFlights == undefined && (
          <div className="no-flights">No Availible Flights</div>
        )}
        {showFlights &&
          availFlights != undefined &&
          availFlights[0] == undefined && (
            <div className="no-flights">No Available Flights</div>
          )}
        {errFlights && (
          <div className="no-flights">Please fill in all the feilds</div>
        )}
      </div>
    </>
  );
}

export default BrowseFlights;
