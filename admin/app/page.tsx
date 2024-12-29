"use client";
import { useEffect, useState } from "react";
import BasePage from "./components/BasePage";
import { Statistic } from "./types/Report";
import { ApiError } from "./types/ApiError";
import { reportsService } from "./data/services";
import ErrorToast from "./components/ErrorToast";
import RecipientProgramChart from "./components/RecipientProgramChart";
import DistributionChart from "./components/DistributionChart";

export default function Home() {
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [statisticData, setStatisticData] = useState<Statistic>();
  const [errorData, setErrorData] = useState<ApiError>({
    code: 0,
    message: "",
  });

  const loadData = async () => {
    const response = await reportsService.getStatistic();
    if (response.data) {
      const reportResult: Statistic = response.data;
      setStatisticData(reportResult);
    } else {
      setErrorData({
        code: response.code,
        message: response.message,
      });
      setIsToastOpen(true);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCloseToast = () => {
    setIsToastOpen(false);
  };

  return (
    <BasePage>
      <ErrorToast
        error={errorData}
        isOpen={isToastOpen}
        onClose={handleCloseToast}
      />
      <div className="w-2/3">
        {/* <StatisticCard /> */}
        <p className="font-poppins font-normal text-3xl">
          Total Laporan -{" "}
          <span className="font-bold">{statisticData?.totalReports}</span>
        </p>
        <div className="divider"></div>
        <RecipientProgramChart
          recipientData={statisticData ? statisticData.recipientsPerProgram : []}
        />
        <div className="divider"></div>
        <DistributionChart distributionData={statisticData ? statisticData.distributionByProvince : []}/>
        
      </div>
    </BasePage>
  );
}
