// api.js
import axios from "axios";

export const fetchData = async (selectedDate) => {
  try {
    const url = "/getDateData";
    const response = await axios.get(url, {
      params: {
        date: selectedDate,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};
