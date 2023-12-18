/*
 *  File Name: Home.tsx
 *  Assignment: ENSF 614 Project
 *  Completed by: Matjaz Cigler
 * Description: This is a page is the home page which welcomes the user to the page
 * using their name
 * If the user is a registered customer or a crew member their respective flights are shown with the option to
 * cancel(for customer) and view passengers(for crew)
 */

import { useContext, useState, useEffect } from "react";
import Header from "../components/Header.tsx";
import "../styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { UserContext } from "../contexts/UserContext.tsx";
import FlightPanel from "../components/FlightPanel.tsx";
import { Flight } from "../types.ts";
import api from "../api/axiosConfig.ts";

function Home() {
  const pageName = "Home";
  const userContext = useContext(UserContext);
  const [myFlights, setMyFlights] = useState<Flight[]>();
  const [showFlights, setShowFlights] = useState<boolean>(false);

  const getUserFlights = async () => {
    try {
      const response = await api.get(
        `/api/v1/flights/byuser/${userContext.userid}/${userContext.userrole}`
      );
      const flightData = response.data as Flight[];
      setMyFlights(flightData);
      setShowFlights(true);
    } catch (err) {
      console.log(err);
    }
    return null;
  };
  useEffect(() => {
    if (userContext.userrole === 2 || userContext.userrole === 4) {
      getUserFlights();
    }
    console.log(userContext.DOB, userContext.userid);
  }, [userContext.userrole, userContext.userid]);

  return (
    <>
      <div className="header">
        <Header pageName={pageName}></Header>
      </div>

      <div className="user-input-bar">
        <h2>Welcome {userContext.legalname}, to Flight 614</h2>
      </div>
      <div className="show-fights">
        {(userContext.userrole == 4 || userContext.userrole == 2) &&
          showFlights &&
          myFlights != undefined && (
            <div>
              {myFlights.map((flight, index) => (
                <FlightPanel
                  key={index}
                  flight={flight}
                  index={index}
                  page="Home"
                ></FlightPanel>
              ))}
            </div>
          )}
      </div>
    </>
  );
}

export default Home;
