import React, { useState, useEffect } from "react";
import { ModalHeader, ModalBody, ModalFooter, Modal } from "reactstrap";
import { Editor } from "@tinymce/tinymce-react";
import ButtonComponent from "../../../main/components/RequirementPush/HtmlComponent/ButtonComponent";

const ModalComponent = (props) => {
  const [show, setShow] = useState(true);
  const [editorValue, setEditorValue] = useState(true);

  const closeModal = () => {
    toggleModal();
  };
  const saveData = () => {
    setShow(!show);
    let getEditorValue: any = "";
    if (editorValue) getEditorValue = props.value;
    else getEditorValue = editorValue;
    if (props.saveData) props.saveData(getEditorValue);
  };
  const toggleModal = () => {
    setShow(!show);
    if (props.modalCloseFunctionCall) props.modalCloseFunctionCall();
  };
  const handleEditorChange = (e) => {
    debugger;
    setEditorValue(e.target.getContent());
  };
  return (
    <Modal isOpen={show} className="custommodal">
      <ModalHeader>
        <b>
          <span>{`Format for ${props.title}`}</span>
        </b>
      </ModalHeader>
      <ModalBody>
        <Editor
          value={props.value}
          init={{
            height: 300,
            width: 430,
          }}
          onChange={handleEditorChange}
        ></Editor>
      </ModalBody>
      <ModalFooter>
        <ButtonComponent color="success" buttonClick={saveData} size="sm">
          Ok
        </ButtonComponent>
        &nbsp;&nbsp;
        <ButtonComponent color="primary" buttonClick={closeModal} size="sm">
          Close
        </ButtonComponent>
      </ModalFooter>
    </Modal>
  );
};
export default ModalComponent;
