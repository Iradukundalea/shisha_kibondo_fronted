import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["Task", "Hours per Day"],
  ["Work", 11],
  ["Eat", 2],
  ["Commute", 2],
  ["Watch TV", 2],
  ["Sleep", 7],
];

export const options = {
  title: "System Users Statistics",
  colors: ['rgb(53, 138, 148)', 'rgb(33, 11, 165)', 'rgb(40, 34, 70)', '#f39f2a', '#188310']
};

export default function PieChart({ datasets }) {
  
  return (
    <Chart
      chartType="PieChart"
      data={datasets}
      options={options}
      width={"100%"}
      height={"400px"}
    />
  );
}
