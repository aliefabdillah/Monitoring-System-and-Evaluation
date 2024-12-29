/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Distribution } from "../types/Report";
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

const fetchWilayahName = async (
  id: string | undefined,
  type: "province" | "district" | "regency"
) => {
  const response = await fetch(
    `https://www.emsifa.com/api-wilayah-indonesia/api/${type}/${id}.json`
  );

  const data = await response.json();
  return data.name;
};

export default function DistributionChart({
  distributionData,
}: {
  distributionData: Distribution[];
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

  const [formattedData, setFormattedData] = useState<Distribution[]>([]);

  useEffect(() => {
    const fetchAllNames = async () => {
      const result: Distribution[] = await Promise.all(
        distributionData.map(async (report: Distribution) => {
          const province = await fetchWilayahName(report.provinsi, "province");

          return {
            provinsi: province,
            jumlah_laporan: report.jumlah_laporan,
          };
        })
      );

      setFormattedData(result);
    };

    fetchAllNames();
  }, [distributionData]);

  const data = {
    type: "bar",
    labels: ["Laporan Bantuan"],
    datasets: formattedData.map((distribution) => {
      return {
        label: distribution.provinsi,
        data: [distribution.jumlah_laporan],
        borderWidth: 1,
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
        text: "Jumlah Laporan Bantuan per Provinsi",
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
