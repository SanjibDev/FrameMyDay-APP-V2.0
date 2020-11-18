import React, { useState, useEffect } from "react";
import ModalComponent from "../../../../../shared/components/Modal/ModalComponent";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { POST } from "../../../../../core/services/apiHelper";
import { SaveRequirementPublish } from "../../../../../core/services/apiURLHelper";
import { useHistory } from "react-router-dom";

const WeddingMessage = (props) => {
  const [firstSelection, setFirstSelection] = useState(null);
  const [secondSelection, setSecondSelection] = useState(null);
  const [selectedEventTypes, setSelectedEventTypes] = useState("");
  const [requirementDateVenue, setRequirementDateVenue] = useState("");
  const [requirementOthers, setRequirementOthers] = useState("");

  const history = useHistory();

  useEffect(() => {
    getFirstSelectedItem(props.events[0].value),
      getSecondSelectedItem(
        props.mainEventTypes.filter(
          (item: any) => item.id == props.events[0].value
        )[0].parentId
      ),
      setHeaderSelection(),
      setRequirement();
  }, []);
  const modalCloseFunctionCall = () => {
    if (props.setFinalMessageDisplay) props.setFinalMessageDisplay();
  };
  const saveData = async (editorValue: any) => {
    modalCloseFunctionCall();
    let finalData = {
      description: editorValue,
      bitEnd: new Date(),
    };
    try {
      let response = await POST(SaveRequirementPublish(), finalData);
      if (response.status === 201) {
        Swal.fire({
          title: "Requirement Publish Successfull!",
          text: "Requirement publishing has been successfully done!",
          icon: "success",
          confirmButtonText: "Ok",
        }).then((result) => {
          if (result) {
            history.push("/requirement");
          }
        });
      } else {
        toast.error("Some error has occured!");
      }
    } catch (err) {
      console.log("err", err);
      toast.error("Some error has occured!");
    }
  };
  const getFirstSelectedItem = (id: any) => {
    if (
      props.mainEventTypes.filter(
        (item: any) => item.id == id && item.parentId !== null
      ).length > 0
    ) {
      getFirstSelectedItem(
        props.mainEventTypes.filter((item: any) => item.id == id)[0].parentId
      );
    } else {
      setFirstSelection(
        props.mainEventTypes.filter((item: any) => item.id == id)[0].alias
      );
    }
  };
  const getSecondSelectedItem = (id: any) => {
    return new Promise((resolve, reject) => {
      setSecondSelection(
        props.mainEventTypes.filter((item: any) => item.id == id)[0].alias
      );
      resolve(true);
    });
  };
  const setHeaderSelection = () => {
    props.events.map((item: any, idx: number) => {
      if (idx == 0) setSelectedEventTypes(`${item.label}`);
      else if (props.events.length == idx + 1 && idx > 0)
        setSelectedEventTypes((prevState) => prevState + ` and ${item.label}`);
      else setSelectedEventTypes((prevState) => prevState + `, ${item.label}`);
    });
  };

  const setRequirement = () => {
    setRequirementDateVenue(
      props.events.map((item: any) =>
        props.selectedEvents
          .filter((filterItem: any) => filterItem.mainItem == item.label)
          .sort(function (a: any, b: any) {
            return a.sequence - b.sequence;
          })
          .filter(
            (subItems: any) =>
              subItems.subItem.startsWith("Date(s)") ||
              subItems.subItem.startsWith("Venue")
          )
          .map((innerItem: any, idx: number) =>
            idx == 0
              ? `<br/><b><span>${item.label}</span>:</b><br/><span>${innerItem.subItem}</span><br/>`
              : `<span>${innerItem.subItem}</span><br/>`
          )
          .join(" ")
      )
    );
    setRequirementOthers(
      props.events.map((item: any) =>
        props.selectedEvents
          .filter((filterItem: any) => filterItem.mainItem == item.label)
          .sort(function (a: any, b: any) {
            return a.sequence - b.sequence;
          })
          .filter(
            (subItems: any) =>
              !subItems.subItem.startsWith("Date(s)") &&
              !subItems.subItem.startsWith("Venue")
          )
          .map((innerItem: any, idx: number) =>
            idx == 0
              ? `<br/><span><b>${
                  item.label
                }:</b></span><br/><span>${innerItem.subItem
                  .replace(/Include/g, "")
                  .trim()}</span><br/>`
              : `<span>${innerItem.subItem
                  .replace(/Include/g, "")
                  .trim()}</span><br/>`
          )
          .join(" ")
      )
    );
  };
  return (
    <ModalComponent
      title={firstSelection}
      value={`<span style="font-size:15px;">Requesting bids from ${secondSelection} ${firstSelection} for capturing ${selectedEventTypes}.</span>
    <br/>
    <br/>
    <b>Event Details:</b>
    <br/>
    <span>--------------------------------</span>    
    <br/> 
    ${requirementDateVenue}
    <br/>
    <b>Deliverables:</b>
    <br/>
    <span>--------------------------------</span> 
    <br/>
    ${requirementOthers}`.replace(/,/g, "")}
      modalCloseFunctionCall={modalCloseFunctionCall}
      saveData={(editorValue: any) => {
        saveData(editorValue);
      }}
    />
  );
};

export default WeddingMessage;
