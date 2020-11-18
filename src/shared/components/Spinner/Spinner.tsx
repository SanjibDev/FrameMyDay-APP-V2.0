import React from "react";
import { usePromiseTracker } from "react-promise-tracker";
import Loader from "react-loader-spinner";
import "../Spinner/Spinner.css";

const Spinner = () => {
  const { promiseInProgress } = usePromiseTracker();
  return (
    <React.Fragment>
      {promiseInProgress && (
        <div className="loder-div">
          <Loader type="ThreeDots" color="#33b0ff" height={100} width={100} />
        </div>
      )}
    </React.Fragment>
  );
};

export default Spinner;
