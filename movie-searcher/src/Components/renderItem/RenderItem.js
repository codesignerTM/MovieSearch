import React from "react";
import "./RenderItem.scss";

const RenderItem = props => {
  return (
    <>
      <li>
        <button className="render-item" onClick={props.onClick}>
          {props.movieName}
        </button>
      </li>
    </>
  );
};

export default RenderItem;
