/*
 *  File Name: PassengerPanel.tsx
 *  Assignment: ENSF 614 Project
 *  Completed by: Matjaz Cigler
 * Description: This is a component that takes a passenger and displayed relative information
 * for Admin, Crew, and Agent use when looking at all the passengers on a Plane
 */

import "../styles.css";
import { Passenger } from "../types.ts";

interface Props {
  passenger: Passenger;
  index: number;
}
const PassengerPanel = ({ passenger }: Props) => {
  return (
    <div className="show-passengers">
      <div className="passenger-panel">
        PassengerID : {passenger.passengerID}
      </div>
      <div className="passenger-panel">Name: {passenger.legalname}</div>
      <div className="passenger-panel">Email: {passenger.email}</div>
      <div className="passenger-panel">
        Phone Number: {passenger.phonenumber}
      </div>
    </div>
  );
};

export default PassengerPanel;
