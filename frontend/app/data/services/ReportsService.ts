import axios, { AxiosInstance } from "axios";

export class ReportsService {
  protected readonly instance: AxiosInstance;
  public constructor(url: string) {
    this.instance = axios.create({
      baseURL: url,
      timeout: 30000,
      timeoutErrorMessage: "URL Time Out!",
    });
  }

  getListReport = () => {
    return this.instance
      .get(`/`)
      .then((res) => {
        return res.data;
      })
      .catch(function (error) {
        if(error.response) {
          const errorResponse = {
            code: error.response.status,
            message: error.response.statusText,
          }
          return errorResponse
        } else {
          const errorResponse = {
            code: error.code,
            message: error.message,
            name: error.name
          }
          return errorResponse;
        }
      });
  };

  getDetailReport = (reportId: string) => {
    return this.instance
      .get(`/${reportId}`)
      .then((res) => {
        return res.data;
      })
      .catch(function (error) {
        if(error.response) {
          const errorResponse = {
            code: error.response.status,
            message: error.response.statusText,
          }
          return errorResponse
        } else {
          const errorResponse = {
            code: error.code,
            message: error.message,
            name: error.name
          }
          return errorResponse;
        }
      });
  };
}
