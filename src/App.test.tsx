import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import Enzyme, { mount, shallow } from "enzyme";
import HighchartsReact from "highcharts-react-official";
import Adapter from "enzyme-adapter-react-16";
Enzyme.configure({ adapter: new Adapter() });

describe("App", () => {
  it("App to be render", () => {
    const app = shallow(<App />);
    expect(app).toBeTruthy();
  });
  it("Test Chart component to be render inside app", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(<HighchartsReact />)).toBeTruthy();
  });
  it("Test Chart component has the prop named option", () => {
    const highchart = shallow(<HighchartsReact />);
    expect(highchart.find("options")).toBeTruthy();
  });
});
