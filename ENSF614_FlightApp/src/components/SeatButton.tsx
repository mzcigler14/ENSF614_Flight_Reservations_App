/*
 *  File Name: SeatButton.tsx
 *  Assignment: ENSF 614 Project
 *  Completed by: Matjaz Cigler
 * Description: This is a component takes seat information and creates a button
 * that is red if the seat is taken and blue if it is available
 * On click the setSeat object is used to change the state of the seat selected in the BookFlight
 * page to show the selected seat information
 */

import "../styles.css";
import { Seat } from "../types.ts";

interface Props {
  seat: Seat;
  setSeat: React.Dispatch<React.SetStateAction<Seat>>;
  index: number;
}
const FlightPanel = ({ setSeat, seat }: Props) => {
  const handleClick = async () => {
    setSeat(seat);
  };
  return (
    <>
      {seat.available && (
        <button className="btn btn-info" onClick={() => handleClick()}>
          {seat.seatN}
        </button>
      )}
      {!seat.available && (
        <button className="btn btn-danger">{seat.seatN}</button>
      )}
    </>
  );
};

export default FlightPanel;
