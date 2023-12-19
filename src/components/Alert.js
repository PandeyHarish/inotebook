import React from "react";
import "../css/alert.css"
const Alert = (props) => {
  return (
    <div>
      {props.alert && (
        <div className={`alert ${props.alert.type}`}>{props.alert.msg}</div>
      )}
    </div>
  );
};

export default Alert;