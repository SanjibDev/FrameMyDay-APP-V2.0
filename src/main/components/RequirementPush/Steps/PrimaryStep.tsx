import React, { useState } from "react";
import "../RequirementPush.css";
import CustomSelect from "../HtmlComponent/CustomSelect";
import MultiSelect from "../HtmlComponent/MultiSelect";
import FinalStep from "./FinalStep";

const PrimaryStep = (props) => {
  const onSelectChange = (value: any) => {
    if (props.setChildEventType) props.setChildEventType(value);
  };
  return (
    <div>
      {props.currentStep == props.componentStep &&
        props.dataToPopulate.length > 0 &&
        (props.isFinalStep === true ? (
          <FinalStep
            events={props.dataToPopulate.map((item: any) => {
              return { label: item.label, value: item.value.split("|")[0] };
            })}
            mainEventTypes={props.mainEventTypes}
          />
        ) : (
          <div>
            <div>
              <span className="question-title">{props.question}</span>
            </div>
            <div>
              <span className="select_box_text"> {props.answer}</span>
              {props.dataToPopulate.filter(
                (item: any) =>
                  item.specialType !== "SelectPicker" &&
                  item.isSpecialType === true
              ).length == 0 ? (
                <CustomSelect
                  dataToPopulate={props.dataToPopulate}
                  onSelectChange={onSelectChange}
                  selectTextStyle="select_box_selected_text"
                  selectDivStyle="select_box"
                  selectTag="span"
                />
              ) : null}
              {props.dataToPopulate.filter(
                (item: any) =>
                  item.specialType !== "MultiSelectPicker" &&
                  item.isSpecialType === true
              ).length == 0 ? (
                <MultiSelect
                  dataToPopulate={props.dataToPopulate}
                  onSelectChange={onSelectChange}
                  selectDivStyle="multiselect_box"
                />
              ) : null}
            </div>
          </div>
        ))}
    </div>
  );
};

export default PrimaryStep;
