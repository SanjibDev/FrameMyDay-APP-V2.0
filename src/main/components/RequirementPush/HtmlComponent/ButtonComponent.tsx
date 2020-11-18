import React, { useState } from "react";
import { Button } from "reactstrap";
const ButtonComponent = (props) => {
  const [color] = useState(props.color);
  const [size] = useState(props.size);

  const buttonClick = () => {
    if (props.buttonClick) props.buttonClick();
  };
  return (
    <Button
      color={`${color}`}
      onClick={buttonClick}
      disabled={props.disabled}
      size={`${size}`}
    >
      {props.children}
    </Button>
  );
};
export default ButtonComponent;
