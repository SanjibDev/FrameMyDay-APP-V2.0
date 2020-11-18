import React from "react";
import DatePicker from "react-date-picker";

const DatePickerComponent = (props) => {
  return (
    <div>
      <DatePicker
        value={props.value}
        clearIcon={null}
        onChange={(e) => props.handleChange(props.idx, e, props.label)}
      />
      &nbsp;&nbsp;
      {props.idx > 0 && props.type === "MultipleDatePicker" ? (
        <span onClick={() => props.handleRemove(props.idx, props.label)}>
          <i className="fa fa-trash" aria-hidden="true"></i>
        </span>
      ) : null}
    </div>
  );
};
export default DatePickerComponent;
