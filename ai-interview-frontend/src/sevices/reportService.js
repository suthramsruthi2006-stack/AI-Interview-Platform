import axios from "axios";

const API_URL = "http://localhost:8000";

export const getReport = async (reportId) => {
  try {
    const response = await axios.get(
      `${API_URL}/reports/${reportId}`
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching report:", error);
    throw error;
  }
};

export const getAllReports = async () => {
  try {
    const response = await axios.get(
      `${API_URL}/reports`
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching reports:", error);
    throw error;
  }
};