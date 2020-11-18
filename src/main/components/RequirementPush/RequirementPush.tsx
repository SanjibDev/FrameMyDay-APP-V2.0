import React, { useEffect, useState } from "react";
import { eventType, requirementType } from "./RequirementTypes";
import { EventText } from "./Templates/StepTemplate";
import Header from "./../../../shared/components/Header/Header";
import Footer from "./../../../shared/components/Footer/Footer";
import { GET, POST } from "./../../../core/services/apiHelper";
import { GetAllEventTypes } from "./../../../core/services/apiURLHelper";
import PrimaryStep from "./Steps/PrimaryStep";
import ButtonComponent from "./HtmlComponent/ButtonComponent";

const RequirementPush = () => {
  const [eventTypes, setEventType] = useState([]);
  const [childEventTypes, setChildEventType]: any = useState([]);
  const [data, setData]: any = useState([
    {
      id: 0,
      isFinalStep: false,
      questionText: "",
      answerText: "",
      dataSet: [],
    },
  ]);
  const [currentStep, setCurrentStep] = useState(1);
  const [prevBtnDisable, setPrevBtnDisable] = useState(true);
  const [nextBtnDisable, setNextBtnDisable] = useState(true);
  const [mainEvent, setMainEvent] = useState("");

  useEffect(() => {
    getAllEventTypes();
  }, []);

  const nextButtonClick = () => {
    if (childEventTypes[0].value.includes("multiselect")) {
      setData([
        ...data,
        {
          id: currentStep + 1,
          isFinalStep: true,
          dataSet: childEventTypes,
        },
      ]);
    } else {
      setData([
        ...data,
        {
          id: currentStep + 1,
          isFinalStep: false,
          questionText: EventText.filter(
            (item: any) => item.mainEvent == mainEvent
          )[0].QuestionAnswerText.filter(
            (item: any) => item.step == data[data.length - 1].id
          )[0].question,
          answerText: EventText.filter(
            (item: any) => item.mainEvent == mainEvent
          )[0].QuestionAnswerText.filter(
            (item: any) => item.step == data[data.length - 1].id
          )[0].answer,
          dataSet: eventTypes
            .filter((e: any) => e.parentId == childEventTypes[0].value)
            .sort(function (a: any, b: any) {
              return a.sequence - b.sequence;
            }),
        },
      ]);
    }
    setCurrentStep((prevCurrentStep: any) => prevCurrentStep + 1);
    setNextBtnDisable(true);
  };

  const prevButtonClick = () => {
    setData(data.slice(0, -1));
    setCurrentStep((prevCurrentStep: any) => prevCurrentStep - 1);
    setNextBtnDisable(true);
  };

  const getAllEventTypes = async () => {
    let response = await GET(GetAllEventTypes());
    let eventTypes = await response.json();
    setEventType(eventTypes);
    setData([
      ...data,
      {
        id: currentStep,
        isFinalStep: false,
        questionText: `What is your main goal today?`,
        answerText: `I have a requirement for`,
        dataSet: eventTypes
          .filter((e: any) => e.parentId == null)
          .sort(function (a: any, b: any) {
            return a.sequence - b.sequence;
          }),
      },
    ]);
  };

  return (
    <React.Fragment>
      <Header />
      <h4 style={{ marginLeft: "5px" }}>Requirement Placeing</h4>
      <div className="container">
        <React.Fragment>
          <PrimaryStep
            key={data[data.length - 1].id}
            question={data[data.length - 1].questionText}
            answer={data[data.length - 1].answerText}
            dataToPopulate={data[data.length - 1].dataSet}
            isFinalStep={data[data.length - 1].isFinalStep}
            setChildEventType={(childeventType: any) => {
              setChildEventType(childeventType);
              setPrevBtnDisable(false);
              setNextBtnDisable(false);
              if (mainEvent == "") {
                setMainEvent(childeventType[0].label);
              }
            }}
            currentStep={currentStep}
            componentStep={data[data.length - 1].id}
            mainEventTypes={
              data[data.length - 1].isFinalStep == true ? eventTypes : []
            }
          />
          <br />
          {currentStep == data[data.length - 1].id && currentStep !== 1 && (
            <ButtonComponent
              key={`prev-${data[data.length - 1].id}`}
              color="primary"
              buttonClick={prevButtonClick}
              disabled={prevBtnDisable}
              size="sm"
            >
              Prev
            </ButtonComponent>
          )}{" "}
          {"  "}
          {currentStep == data[data.length - 1].id && (
            <ButtonComponent
              key={`next-${data[data.length - 1].id}`}
              color="primary"
              buttonClick={nextButtonClick}
              disabled={nextBtnDisable}
              size="sm"
            >
              Next
            </ButtonComponent>
          )}
        </React.Fragment>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default RequirementPush;
