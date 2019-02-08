import React from "react";
import "jest-dom/extend-expect";
import jwt from "jsonwebtoken";

import { render } from "react-testing-library";
import { cleanup } from "./utils";

import Component from "../using-string-token";

afterEach(cleanup);

test("using-string-token", () => {
  const { getByText } = render(<Component />);
  expect(getByText(/^My Name Is:/)).toHaveTextContent("My Name Is: John Smith");
});
