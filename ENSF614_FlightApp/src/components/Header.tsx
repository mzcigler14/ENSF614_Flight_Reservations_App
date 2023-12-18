/*
 *  File Name: Header.tsx
 *  Assignment: ENSF 614 Project
 *  Completed by: Matjaz Cigler
 * Description: This is a component displays the webapp name
 * and a dropdown to toggle which page the user is on.
 *
 */

import "../styles.css";
import LinkDropdown from "./LinkDropdown.tsx";

import { Link } from "../types.ts";

interface Props {
  pageName: string;
}
const Header = ({ pageName }: Props) => {
  return (
    <div className="header">
      <h1>Flight 614</h1>
      <div className="header-buttons">
        <LinkDropdown
          className="input-item"
          items={[
            { path: "/Home", label: "Home" } as Link,
            {
              path: "/BrowseFlights",
              label: "Browse Flights",
            } as Link,
            {
              path: "/AccountInfo",
              label: "Account Info",
            } as Link,
          ]}
          buttonName={pageName}
        ></LinkDropdown>
      </div>
    </div>
  );
};

export default Header;
