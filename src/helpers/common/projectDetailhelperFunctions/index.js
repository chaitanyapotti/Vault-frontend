import moment from "moment";
import axios from "axios";

const formatDate = dbDate => `${moment(dbDate).format("dddd, MMMM Do YYYY, h:mm:ss a z")}(UTC)`;

const etherPrice = () => {
  axios.get("https://api.coinmarketcap.com/v1/ticker/ethereum/?convert=USD").then(response => {
    const { price_usd } = response || "230";
    return price_usd;
  });
};

export { formatDate, etherPrice };
