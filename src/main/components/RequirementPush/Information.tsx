import React from "react";
import ReactPlayer from "react-player";

const Information = ({ tooltipText, title, url }) => {
  return (
    <div className="information-box">
      <div className="information-box-header">{title}</div>
      <div className="content">
        <br />
        <p>{tooltipText}</p>
        <span>
          <b>Here is the video preview :</b>
        </span>
        <ReactPlayer url={url} width="98%" height="55%" />
      </div>
    </div>
  );
};

export default Information;
