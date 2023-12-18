/*
 *  File Name: LinkDropdown.tsx
 *  Assignment: ENSF 614 Project
 *  Completed by: Matjaz Cigler
 * Description: This is a component takes in a className,
 * list of links,  and button name (including the object to change the name of button)
 * Creates a dropdown of the list passed into it. When clicked the link is followed
 */

import { Dropdown } from "react-bootstrap";
import { Link } from "../types.ts";

interface Props {
  className: string;
  items: Link[];
  buttonName: string;
}

const DynamicDropdown = ({ className, buttonName, items }: Props) => {
  return (
    <Dropdown className={className}>
      <Dropdown.Toggle variant="secondary" id="dropdownMenuButton">
        {buttonName}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {items.map((item, index) => (
          <Dropdown.Item href={item.path} key={index}>
            {item.label}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DynamicDropdown;
