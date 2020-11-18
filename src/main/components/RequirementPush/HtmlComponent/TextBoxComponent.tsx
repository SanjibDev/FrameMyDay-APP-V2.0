import React from "react";
import { Label, Input } from "reactstrap";
const TextBoxComponent = (props) => {
  return (
    <React.Fragment>
      <div style={{ marginLeft: "30px" }}>
        <Label for={props.alias}>{props.alias}</Label>
        <Input
          type="text"
          onBlur={(e) => {
            props.handleTextSelection(
              e,
              props.alias,
              props.label,
              props.sequence
            );
          }}
          id={props.alias}
        />
      </div>
    </React.Fragment>
  );
};
export default TextBoxComponent;
