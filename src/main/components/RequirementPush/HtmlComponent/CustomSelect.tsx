import React, { useState } from "react";
import "../RequirementPush.css";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Dropdown,
} from "reactstrap";

const CustomSelect = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [data] = useState(props.dataToPopulate);
  const [dropdownValue, setDropdownValue] = useState("Select Event");

  const toggle = (e: any) => {
    setDropdownValue(e.currentTarget.textContent);
    if (props.onSelectChange)
      props.onSelectChange([
        { label: e.currentTarget.textContent, value: e.currentTarget.id },
      ]);
  };

  let options = data.map((data: any) => (
    <DropdownItem id={data.id} onClick={toggle} key={data.id}>
      {data.alias}
    </DropdownItem>
  ));
  const dropdowntoggle = () => setDropdownOpen((prevState) => !prevState);

  return (
    <div className={`${props.selectDivStyle}`}>
      <Dropdown isOpen={dropdownOpen} toggle={dropdowntoggle}>
        <DropdownToggle
          caret
          className={`${props.selectTextStyle}`}
          style={{ backgroundColor: "#f1f1f1" }}
        >
          {dropdownValue}
        </DropdownToggle>
        <DropdownMenu>{options}</DropdownMenu>
      </Dropdown>
    </div>
  );
};
export default CustomSelect;
