import React from "react";

export function CreatGrpBtn(props) {
  return (
    <button {...props} style={{ float: "left", marginBottom: 10 }} className="btn btn-success">
      {props.children}
    </button>
  );
}