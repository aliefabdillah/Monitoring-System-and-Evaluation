import { ReportsService } from "./ReportsService";

export const reportsService = new ReportsService(`${process.env.API_URL}/reports/`);