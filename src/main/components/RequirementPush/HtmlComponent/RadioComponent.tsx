import React, { useState, forwardRef, useImperativeHandle } from "react";
import { CustomInput } from "reactstrap";

const RadioComponent = forwardRef((props: any, ref: any) => {
  const onSelectionChange = (
    id: any,
    accordianTitle: string,
    selectedValue: any,
    parentId: string
  ) => {
    props.handleRadioSelection(accordianTitle, selectedValue, parentId);
  };
  const removeChecked = (parentId: string) => {
    let radios = document.getElementsByName(`radio${parentId}`) as NodeListOf<
      HTMLInputElement
    >;
    for (let count = 0; count < radios.length; count++) {
      let r = radios[count];
      r.checked = false;
    }
  };
  const addChecked = (parentId: string, index: number) => {
    let radio = document.getElementsByName(`radio${parentId}`)[
      index
    ] as HTMLInputElement;
    radio.checked = true;
  };
  useImperativeHandle(ref, () => {
    return {
      onSelectionChange: onSelectionChange,
      removeChecked: removeChecked,
      addChecked: addChecked,
    };
  });
  return (
    <CustomInput
      type="radio"
      name={`radio${props.parentId}`}
      label={props.alias}
      id={props.id}
      onChange={(e) => {
        addChecked(props.parentId, props.index);
        onSelectionChange(props.id, props.label, props.alias, props.parentId);
      }}
    />
  );
});
export default RadioComponent;
