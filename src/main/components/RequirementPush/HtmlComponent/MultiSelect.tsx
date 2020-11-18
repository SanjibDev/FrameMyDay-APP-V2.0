import React, { useState, useEffect } from "react";
import "../RequirementPush.css";
import Select from "react-select";

const MultiSelect = (props) => {
  const [childEvents, setChildEvents] = useState([]);

  useEffect(() => {
    setChildEvents(
      props.dataToPopulate.map((item: any) => {
        return { label: item.alias, value: `${item.id}|multiselect` };
      })
    );
  }, [props.dataToPopulate]);

  return (
    <div className={`${props.selectDivStyle}`}>
      <Select
        defaultMenuIsOpen={props.defaultMenuIsOpen}
        options={childEvents}
        isMulti={true}
        onChange={(e: any) => {
          if (props.onSelectChange) props.onSelectChange(e);
        }}
      />
    </div>
  );
};

export default MultiSelect;
