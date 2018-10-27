import moment from "moment";

const formatDate = dbDate =>
  // moment().locale("en-gb");
  // moment.updateLocale("en-gb", {
  //   ordinal(number, token) {
  //     const b = number % 10;
  //     const output = (number % 100) / 10 === 1 ? "th" : b === 1 ? "st" : b === 2 ? "nd" : b === 3 ? "rd" : "th";
  //     return number + output;
  //   }
  // });
  `${moment(dbDate).format("Do MMM YYYY | h:mm A z")}(UTC)`;

const formatRateToPrice = rate => parseFloat(1 / parseFloat(rate)).toPrecision(2);

const formatFromWei = (input, precision = 0) => Math.round(parseFloat(input) * Math.pow(10, -18) * Math.pow(10, precision)) / Math.pow(10, precision);

export { formatDate, formatRateToPrice, formatFromWei };
