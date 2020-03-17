import React from "react";
import ReactDOM from "react-dom";
import RenderItem from "../RenderItem";
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import renderer from "react-test-renderer";

afterEach(cleanup);

it("renders without crash", () => {
  const div = document.createElement("div");
  ReactDOM.render(<RenderItem />, div);
});

it("renders correctly", () => {
  const { getByTestId } = render(
    <RenderItem onClick={() => {}} movieName="hello" />
  );
  expect(getByTestId("render-item-button")).toHaveTextContent("hello");
});

it("renders correctly", () => {
  const { getByTestId } = render(
    <RenderItem onClick={() => {}} movieName="save" />
  );
  expect(getByTestId("render-item-button")).toHaveTextContent("save");
});

it("matches snapshot 1", () => {
  const tree = renderer
    .create(<RenderItem onClick={() => {}} movieName="save" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("matches snapshot 2", () => {
  const tree = renderer
    .create(<RenderItem onClick={() => {}} movieName="matrix" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
