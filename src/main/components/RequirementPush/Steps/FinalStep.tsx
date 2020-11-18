import React, { useState, useEffect, useRef } from "react";
import { Container, FormGroup } from "reactstrap";
import "../RequirementPush.css";
import Accordion from "../../../../shared/components/Accordion/Accordion";
import ButtonComponent from "../HtmlComponent/ButtonComponent";
import DatePickerComponent from "../HtmlComponent/DatePickerComponent";
import CheckBoxComponent from "../HtmlComponent/CheckBoxComponent";
import RadioComponent from "../HtmlComponent/RadioComponent";
import TextBoxComponent from "../HtmlComponent/TextBoxComponent";
import Popup from "reactjs-popup";
import Information from "../Information";
import WeddingMessage from "../Templates/FinalRequirementMessage/WeddingMessage";

const FinalStep = (props) => {
  const [showFinalMessage, setshowFinalMessage]: any = useState(false);
  const [selectedEvents, setSelectedEvent]: any = useState([]);
  const [dateFields, setDateFields]: any = useState([
    { value: null, head: "", isChanged: false },
  ]);
  const setFinalMessageDisplay = () => {
    setshowFinalMessage(false);
  };
  const radioComponentRef: any = useRef(null);
  useEffect(() => {
    const values: any = [];
    const selectedDateEvents: any = [];
    props.events.map((item: any) => {
      values.unshift({
        value: null,
        head: item.label,
        isChanged: false,
      });
      selectedDateEvents.unshift({
        mainItem: item.label,
        subItem: `Date(s): Not decided / Negotiable`,
        sequence: 1,
      });
      selectedDateEvents.unshift({
        mainItem: item.label,
        subItem: `Venue: Not decided`,
        sequence: 2,
      });
    });
    setDateFields(values);
    setSelectedEvent(selectedDateEvents);
  }, []);

  const handleChange = (i, event, title) => {
    const values = [...dateFields.filter((item: any) => item.head === title)];
    values[i].value = event;
    values[i].isChanged = true;
    setDateFields([
      ...dateFields.filter((item: any) => item.head !== title),
      ...values,
    ]);
    onDateChange(
      title,
      dateFields.filter((item: any) => item.head === title)
    );
  };
  const handleTextSelection = (
    e: any,
    eventAlias: string,
    accordianTitle: string,
    sequence: number
  ) => {
    let enteredValue = e.target.value === "" ? "Not Decided" : e.target.value;
    let setItem: any = {
      mainItem: accordianTitle,
      subItem: `${eventAlias}: ${enteredValue}`,
      sequence: sequence,
    };
    let newItems = selectedEvents.filter(
      (item: any) =>
        item.mainItem == accordianTitle &&
        item.subItem.startsWith(eventAlias) &&
        item.sequence === sequence
    );
    if (newItems.length > 0) {
      selectedEvents.splice(
        selectedEvents.findIndex(
          (x) =>
            x.mainItem === newItems[0].mainItem &&
            x.subItem === newItems[0].subItem &&
            x.sequence === newItems[0].sequence
        ),
        1
      );
    }
    setSelectedEvent([...selectedEvents, setItem]);
  };

  const handleAdd = (title) => {
    const values = [...dateFields];
    values.push({ value: null, head: title, isChanged: false, sequence: 1 });
    setDateFields(values);
  };

  const handleRemove = (i, title) => {
    const values = dateFields.filter((item: any) => item.head === title);
    values.splice(i, 1);
    const othervalues = dateFields.filter((item: any) => item.head !== title);
    setDateFields([...othervalues, ...values]);
    onDateChange(title, values);
  };

  const handleRadioSelection = (
    accordianTitle: any,
    selectedValue: any,
    parentId: string
  ) => {
    if (
      selectedEvents.filter(
        (item: any) =>
          item.mainItem == accordianTitle &&
          item.subItem.startsWith(
            props.mainEventTypes.filter(
              (mainItem: any) => mainItem.id === parentId
            )[0].alias
          )
      ).length == 0
    ) {
      let checkbox = document.getElementsByName(
        `checkbox-${parentId}`
      )[0] as HTMLInputElement;
      checkbox.checked = true;
    }
    let newItems = selectedEvents.filter(
      (item: any) =>
        item.mainItem == accordianTitle &&
        item.subItem.startsWith(
          props.mainEventTypes.filter(
            (mainItem: any) => mainItem.id === parentId
          )[0].alias
        )
    );
    if (newItems.length > 0) {
      selectedEvents.splice(
        selectedEvents.findIndex(
          (x) =>
            x.mainItem === newItems[0].mainItem &&
            x.subItem === newItems[0].subItem
        ),
        1
      );
    }
    let setItem: any = {
      mainItem: accordianTitle,
      subItem: `${
        props.mainEventTypes.filter(
          (mainItem: any) => mainItem.id === parentId
        )[0].alias
      } - ${selectedValue}`,
      sequence: props.mainEventTypes.filter(
        (mainItem: any) => mainItem.id === parentId
      )[0].sequence,
    };
    setSelectedEvent([...selectedEvents, setItem]);
  };

  const onDateChange = (accordianTitle: any, dateValue: any) => {
    let setItem: any = {
      mainItem: accordianTitle,
      subItem: `Date(s): Not decided / Negotiable`,
      sequence: 1,
    };
    let newItems = selectedEvents.filter(
      (item: any) =>
        item.mainItem == accordianTitle && item.subItem.startsWith("Date(s): ")
    );
    if (newItems.length > 0) {
      selectedEvents.splice(
        selectedEvents.findIndex(
          (x) =>
            x.mainItem === newItems[0].mainItem &&
            x.subItem === newItems[0].subItem
        ),
        1
      );
    }
    if (dateValue.filter((item: any) => item.isChanged == true).length > 0) {
      setItem = {
        mainItem: accordianTitle,
        subItem: `Date(s): ${dateValue
          .filter((item: any) => item.isChanged == true)
          .map((item: any) =>
            item.value.toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })
          )
          .join(" | ")}`,
        sequence: 1,
      };
      setSelectedEvent([...selectedEvents, setItem]);
    } else {
      setSelectedEvent([...selectedEvents, setItem]);
    }
  };

  const handleCheck = (
    e: any,
    eventAlias: string,
    accordianTitle: string,
    sequence: number,
    parentId: string
  ) => {
    let setItem: any = {
      mainItem: accordianTitle,
      subItem: eventAlias,
      sequence: sequence,
    };
    if (e.target.checked) {
      // selection part here

      if (eventAlias.startsWith("Include Album")) {
        radioComponentRef.current.addChecked(e.target.id, 0);
        radioComponentRef.current.onSelectionChange(
          props.mainEventTypes.filter(
            (item: any) => item.parentId === e.target.id
          )[0].id,
          accordianTitle,
          props.mainEventTypes.filter(
            (item: any) => item.parentId === e.target.id
          )[0].alias,
          e.target.id
        );
      } else {
        if (
          props.mainEventTypes.filter(
            (mainItem: any) => mainItem.id === parentId
          ).length > 0
        ) {
          setItem = {
            mainItem: accordianTitle,
            subItem: `${
              props.mainEventTypes.filter(
                (mainItem: any) => mainItem.id === parentId
              )[0].alias
            }-${eventAlias}`,
            sequence: `${
              props.mainEventTypes.filter(
                (mainItem: any) => mainItem.id === parentId
              )[0].sequence
            }`,
          };
          if (
            selectedEvents.filter(
              (item: any) =>
                item.mainItem == accordianTitle &&
                item.subItem.startsWith(
                  props.mainEventTypes.filter(
                    (mainItem: any) => mainItem.id === parentId
                  )[0].alias
                )
            ).length == 0
          ) {
            let checkbox = document.getElementsByName(
              `checkbox-${parentId}`
            )[0] as HTMLInputElement;
            checkbox.checked = true;
          } else {
            let targetIndex = selectedEvents
              .map(function (o) {
                return o.mainItem + o.subItem;
              })
              .indexOf(
                setItem.mainItem +
                  props.mainEventTypes.filter(
                    (mainItem: any) => mainItem.id === parentId
                  )[0].alias
              );
            selectedEvents.splice(targetIndex, 1);
          }
        }
        setSelectedEvent([...selectedEvents, setItem]);
      }
    } else {
      if (eventAlias.startsWith("Include Album")) {
        let targetIndex = selectedEvents.filter(
          (item: any) =>
            item.mainItem == accordianTitle &&
            item.subItem.startsWith("Include Album")
        );
        radioComponentRef.current.removeChecked(e.target.id);
        selectedEvents.splice(
          selectedEvents.findIndex(
            (x) =>
              x.mainItem === targetIndex[0].mainItem &&
              x.subItem === targetIndex[0].subItem
          ),
          1
        );
      } else {
        // deselection part here
        if (
          props.mainEventTypes.filter(
            (mainItem: any) => mainItem.parentId === e.target.id
          ).length > 0
        ) {
          let checkbox = document.getElementsByName(
            `checkbox-${
              props.mainEventTypes.filter(
                (mainItem: any) => mainItem.parentId === e.target.id
              )[0].id
            }`
          )[0] as HTMLInputElement;
          checkbox.checked = false;
          selectedEvents.splice(
            selectedEvents.findIndex(
              (x) =>
                x.mainItem === setItem.mainItem &&
                x.subItem.startsWith(setItem.subItem)
            ),
            1
          );
        } else if (
          props.mainEventTypes.filter(
            (mainItem: any) => mainItem.id === parentId
          ).length > 0
        ) {
          let targetIndex = selectedEvents.findIndex(
            (x) =>
              x.mainItem === setItem.mainItem &&
              x.subItem.startsWith(setItem.subItem)
          );
          if (targetIndex == -1) {
            targetIndex = selectedEvents.findIndex(
              (x) =>
                x.mainItem === setItem.mainItem &&
                x.subItem.includes(`-${setItem.subItem}`)
            );
          }
          selectedEvents.splice(targetIndex, 1);

          setItem = {
            mainItem: accordianTitle,
            subItem: `${
              props.mainEventTypes.filter(
                (mainItem: any) => mainItem.id === parentId
              )[0].alias
            }`,
            sequence: `${
              props.mainEventTypes.filter(
                (mainItem: any) => mainItem.id === parentId
              )[0].sequence
            }`,
          };
          setSelectedEvent([...selectedEvents, setItem]);
        } else {
          let targetIndex = selectedEvents
            .map(function (o) {
              return o.mainItem + o.subItem;
            })
            .indexOf(setItem.mainItem + setItem.subItem);
          selectedEvents.splice(targetIndex, 1);
        }
      }
    }
  };
  const submitRequirement = () => {
    setshowFinalMessage(true);
  };
  return (
    <React.Fragment>
      <Container fluid>
        <ButtonComponent
          color="success"
          buttonClick={submitRequirement}
          size="sm"
        >
          Submit Requirement
        </ButtonComponent>
        <div className="wrapper">
          {props.events.length > 0 &&
            props.events.map((item: any) => (
              <Accordion title={item.label}>
                {props.mainEventTypes
                  .filter((mainItem: any) => mainItem.parentId === item.value)
                  .sort(function (a: any, b: any) {
                    return a.sequence - b.sequence;
                  })
                  .map((event: any) => (
                    <div className="eventItems">
                      {event.specialType === "MultipleDatePicker" ||
                      event.specialType === "DatePicker" ? (
                        <div className="event-div">
                          <div style={{ marginLeft: "30px" }}>
                            Event Dates &nbsp;&nbsp;
                            {event.specialType === "MultipleDatePicker" ? (
                              <span onClick={() => handleAdd(item.label)}>
                                <i
                                  className="fa fa-plus-circle"
                                  aria-hidden="true"
                                ></i>
                              </span>
                            ) : null}
                          </div>
                          {dateFields
                            .filter(
                              (dateItem: any) => dateItem.head === item.label
                            )
                            .map((field: any, idx: any) => (
                              <div
                                key={field - idx - item.label}
                                className="event-div"
                                style={{
                                  marginLeft: "30px",
                                }}
                              >
                                <DatePickerComponent
                                  idx={idx}
                                  label={item.label}
                                  value={field.value}
                                  type={event.specialType}
                                  handleChange={handleChange}
                                  handleRemove={handleRemove}
                                />
                              </div>
                            ))}
                        </div>
                      ) : (
                        <div className="event-div">
                          <FormGroup>
                            {event.specialType === null && (
                              <CheckBoxComponent
                                alias={event.alias}
                                label={item.label}
                                id={event.id}
                                parentId={""}
                                sequence={event.sequence}
                                handleCheck={handleCheck}
                              />
                            )}
                            {event.specialType === "TextBox" && (
                              <TextBoxComponent
                                alias={event.alias}
                                label={item.label}
                                sequence={event.sequence}
                                handleTextSelection={handleTextSelection}
                              />
                            )}
                            &nbsp; &nbsp;
                            {event.extendedDescription !== null ? (
                              <Popup
                                trigger={
                                  <i
                                    className="fa fa-info-circle"
                                    aria-hidden="true"
                                  ></i>
                                }
                                position="right bottom"
                                on="hover"
                              >
                                <Information
                                  tooltipText={event.extendedDescription}
                                  title={event.alias}
                                  url={event.sampleLink}
                                />
                              </Popup>
                            ) : (
                              ""
                            )}
                            {props.mainEventTypes.filter(
                              (innerMainItem: any) =>
                                innerMainItem.parentId === event.id
                            ).length > 0 &&
                              props.mainEventTypes
                                .filter(
                                  (innerMainItem: any) =>
                                    innerMainItem.parentId === event.id
                                )
                                .map((innerEvent: any, idx: number) => (
                                  <FormGroup check>
                                    {innerEvent.specialType ===
                                      "RadioButtonPicker" && (
                                      <RadioComponent
                                        label={item.label}
                                        alias={innerEvent.alias}
                                        id={innerEvent.id}
                                        parentId={event.id}
                                        handleRadioSelection={
                                          handleRadioSelection
                                        }
                                        ref={radioComponentRef}
                                        index={idx}
                                      />
                                    )}
                                    {innerEvent.specialType === null && (
                                      <CheckBoxComponent
                                        alias={innerEvent.alias}
                                        label={item.label}
                                        id={innerEvent.id}
                                        parentId={event.id}
                                        sequence={innerEvent.sequence}
                                        handleCheck={handleCheck}
                                      />
                                    )}
                                    &nbsp; &nbsp;
                                    {innerEvent.extendedDescription !== null ? (
                                      <Popup
                                        trigger={
                                          <i
                                            className="fa fa-info-circle"
                                            aria-hidden="true"
                                          ></i>
                                        }
                                        position="right bottom"
                                        on="hover"
                                      >
                                        <Information
                                          tooltipText={
                                            innerEvent.extendedDescription
                                          }
                                          title={innerEvent.alias}
                                          url={innerEvent.sampleLink}
                                        />
                                      </Popup>
                                    ) : (
                                      ""
                                    )}
                                  </FormGroup>
                                ))}
                          </FormGroup>
                        </div>
                      )}
                    </div>
                  ))}
              </Accordion>
            ))}
        </div>
        {showFinalMessage ? (
          <WeddingMessage
            events={props.events}
            selectedEvents={selectedEvents}
            setFinalMessageDisplay={setFinalMessageDisplay}
            mainEventTypes={props.mainEventTypes}
          />
        ) : null}
      </Container>
    </React.Fragment>
  );
};

export default FinalStep;
