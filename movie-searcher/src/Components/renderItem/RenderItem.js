import React from "react";
import "./RenderItem.scss";

const RenderItem = props => {
  return (
    <>
      <li>
        <button
          className="render-item"
          onClick={props.onClick}
          data-testid="render-item-button"
        >
          {props.movieName}
        </button>
      </li>
    </>
  );
};

export default RenderItem;
