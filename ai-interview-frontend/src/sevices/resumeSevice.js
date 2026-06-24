import axios from "axios";

const API_URL = "http://localhost:8000";

export const uploadResume = async (formData) => {
  const response = await axios.post(
    `${API_URL}/resume/upload`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};