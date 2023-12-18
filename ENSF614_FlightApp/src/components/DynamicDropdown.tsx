/*
 *  File Name: DynamicDropdown.tsx
 *  Assignment: ENSF 614 Project
 *  Completed by: Matjaz Cigler
 * Description: This is a component takes in a className,
 * list of items, and button name (including the object to change the name of button)
 * Creates a dropdown of the list passed into it. The value show in the button
 * is changed as the user selects options
 */
import React from "react";
import { Dropdown } from "react-bootstrap";

interface Props {
  className: string;
  items: any[];
  buttonName: string;
  setButtonName: React.Dispatch<React.SetStateAction<string>>;
}

const DynamicDropdown = ({
  className,
  buttonName,
  setButtonName,
  items,
}: Props) => {
  return (
    <Dropdown className={className}>
      <Dropdown.Toggle variant="secondary" id="dropdownMenuButton">
        {buttonName}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {items.map((item, index) => (
          <Dropdown.Item key={index} onClick={() => setButtonName(item)}>
            {item}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DynamicDropdown;
