/*
 *  File Name: SeatMap.tsx
 *  Assignment: ENSF 614 Project
 *  Completed by: Matjaz Cigler
 * Description: This is a component takes in a the flight and setSeat (just to relay
 * to the seat button for changeing).
 * This component uses the flight to make an API call to get the plane shape (to map a grid for
 * the seat buttons) and a call to get all the seat states to map to the seat buttons.
 */
import React, { useEffect, useState } from "react";
import { Seat, Flight } from "../types.ts";
import api from "../api/axiosConfig.ts";
import SeatButton from "../components/SeatButton.tsx";

interface Props {
  flight: Flight;
  setSeat: React.Dispatch<React.SetStateAction<Seat>>;
  setPage: React.Dispatch<React.SetStateAction<string>>;
}

const SeatMap = ({ flight, setSeat }: Props) => {
  const [ncols, setNcols] = useState(0);
  const [seats, setSeats] = useState<Seat[]>([]);
  const [loading, setLoading] = useState(true);
  const flightid = flight.flightid;

  const getSeatData = async () => {
    try {
      const shapeResponse = await api.get(
        `/api/v1/flights/seatshapebyflight/${flight.flightid}`
      );
      const shapeData = shapeResponse.data;
      setNcols(shapeData.ncols);

      const seatsResponse = await api.get(
        `/api/v1/flights/seatstatesbyflight/${flight.flightid}`
      );
      const seatData = seatsResponse.data;
      setSeats(seatData);
      console.log(seatsResponse.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSeatData();
  }, [flightid]);

  return (
    <div className="seat-map">
      {!loading && seats.length > 0 && ncols !== 0 && (
        <div className="container text-center">
          <div className={`row row-cols-${ncols}`}>
            {seats.map((seat, index) => (
              <SeatButton
                key={index}
                index={index}
                seat={seat}
                setSeat={setSeat}
              ></SeatButton>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SeatMap;
