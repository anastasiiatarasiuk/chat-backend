import axios from "axios";

export const getQuote = async () => {
  try {
    const response = await axios.get("https://zenquotes.io/api/random");
    return response.data[0].q;
  } catch (error) {
    console.error("Failed to fetch quote:", error.message);
    return "Sorry, I couldn't fetch a quote at this time.";
  }
};
