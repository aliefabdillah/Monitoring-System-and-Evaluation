import React from "react";
import { Recipient } from "../types/Report";
import {
  BarElement,
  CategoryScale,
  Chart,
  Colors,
  Legend,
  LinearScale,
  Title,
} from "chart.js";
import { Tooltip } from "chart.js";
import { Bar } from "react-chartjs-2";
// import Loading from "./Loading";

export default function RecipientProgramChart({
  recipientData,
}: {
  recipientData: Recipient[];
}) {
  Chart.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Colors
  );

  const labelProgram = ["PIP", "JKN_KIS", "BST", "BPNT", "Subsidi Listrik"];

  const data = {
    type: "bar",
    labels: ["Program Bantuan"],
    datasets: labelProgram.map((label) => {
      return {
        label: label,
        data: [
          recipientData
            .filter((data) => data.nama_program === label)
            .map((data) => data.total_penerima)[0] || 0,
        ],
        borderWidth: 1,
        barPercentage: 0.5,
      };
    }),
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Jumlah Penerima Bantuan per Program",
        font: { size: 25, familiy: "Poppins" },
        color: "#141414",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    animation: {
      duration: 1500, 
      easing: "easeInBounce" as const,
    },
  };

  return (
    <div className={`flex justify-center items-center`}>
      <Bar data={data} options={options}></Bar>
    </div>
  );
}
