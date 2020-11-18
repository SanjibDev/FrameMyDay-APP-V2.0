import React from "react";
import { CustomInput } from "reactstrap";

const CheckBoxComponent = (props) => {
  return (
    <CustomInput
      type="checkbox"
      onChange={(e) =>
        props.handleCheck(
          e,
          props.alias,
          props.label,
          props.sequence,
          props.parentId
        )
      }
      name={`checkbox-${props.id}`}
      id={props.id}
      label={props.alias}
    />
  );
};
export default CheckBoxComponent;
