/*
 *  File Name: App.tsx
 *  Assignment: ENSF 614 Project
 *  Completed by: Matjaz Cigler
 * Description: This is a page has all the routing information as well
 * as being wrapped by the UserContext Provider so each page may use the user
 * context.
 */
import Login from "./pages/Login.tsx";
import { Route, Routes } from "react-router-dom";
import { UserContextProvider } from "./contexts/UserContext.tsx";
// import { useState, createContext } from "react";
// import { User } from "./types.ts";
import Home from "./pages/Home.tsx";
import AccountInfo from "./pages/AccountInfo.tsx";
import BrowseFlights from "./pages/BrowseFlights.tsx";
import BookFlight from "./pages/BookFlight.tsx";

function App() {
  return (
    <>
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/AccountInfo" element={<AccountInfo />} />
          <Route path="/BrowseFlights" element={<BrowseFlights />} />
          <Route path="/BrowseFlights/BookFlight" element={<BookFlight />} />
        </Routes>
      </UserContextProvider>
    </>
  );
}

export default App;
