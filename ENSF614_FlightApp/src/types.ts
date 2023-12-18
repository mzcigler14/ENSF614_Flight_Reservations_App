/*
 *  File Name: types.ts
 *  Assignment: ENSF 614 Project
 *  Completed by: Matjaz Cigler
 * Description: Defines all the type used in the App
 */

export interface Flight {
    airlineid: String;
    origin: string;
    destination: String;
    depdate: string;
    deptime: String;
    flightid: number;
  }

  export interface User {
    userid : string;
    userpassword : string;
    userrole : number;
    legalname : string;
    DOB : string;
    email : string;
    phonenumber : string;
    }

export interface Link{
  path: string;
  label: string;
}

export interface Passenger{
  passengerID: number;
  legalname: string;
  DOB: Date;
  email: string;
  insurancepolicynumber: number;
  phonenumber: string;
  isregistered: boolean;
  userID: string | null;
}
export interface newPassenger{
  legalname: string;
  DOB: string;
  email: string;
  insurancepolicynumber: number;
  phonenumber: string;
  isregistered: boolean;
  userid: string | null;
}

export interface Seat{
  seatN: string;
  rowN: number;
  colN: number;
  price: number;
  typedescription: string; //includes business, first etc
  available: boolean;
  
}


export interface SeatLayoutType{
  [key: string]: number | undefined;
}

export interface Payment{
  cardtype: string;
  cardnumber: string;
  paymentdate: string;
  pin: string;
  expiry: string;
  postalcode: string;
}