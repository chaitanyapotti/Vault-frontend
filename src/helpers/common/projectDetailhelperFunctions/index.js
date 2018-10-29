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

const formatNumber = (rate, precision = 2) => parseFloat(rate).toPrecision(precision);

const formatFromWei = (input, precision = 0) => Math.round(parseFloat(input) * Math.pow(10, -18) * Math.pow(10, precision)) / Math.pow(10, precision);

const formatTokenPrice = (input, precision = 0) => parseFloat(parseFloat(input) * Math.pow(10, -18)).toPrecision(precision);

const formatCent = tokenPrice => {
  if (tokenPrice < 1) {
    return `${tokenPrice * 100}¢`;
  }
  return `$${tokenPrice}`;
};

const secondsToDhms = seconds => {
  const secs = Number(seconds);
  const y = Math.floor(secs / (3600 * 24 * 365));
  const mo = Math.floor((secs % (3600 * 24 * 365)) / (30 * 24 * 3600));
  const d = Math.floor((secs % (30 * 24 * 3600)) / (24 * 3600));
  const h = Math.floor((secs % (3600 * 24)) / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = Math.floor((secs % 3600) % 60);

  const yDisplay = y > 0 ? `${y}Y ` : "";
  const moDisplay = mo > 0 ? `${mo}M ` : "";
  const dDisplay = d > 0 ? `${d}D ` : "";
  const hDisplay = h > 0 ? `${h}H ` : "";
  const mDisplay = m > 0 ? `${m}m ` : "";
  const sDisplay = s > 0 ? `${s}s ` : "";

  if (y > 0) {
    return yDisplay + moDisplay + dDisplay;
  }
  if (m > 0) {
    return moDisplay + dDisplay + hDisplay;
  }
  if (d > 0) {
    return dDisplay + hDisplay + mDisplay;
  }
  if (h > 0) {
    return hDisplay + mDisplay + sDisplay;
  }
  if (m > 0) {
    return mDisplay + sDisplay;
  }
  if (s > 0) {
    return sDisplay;
  }
  // return yDisplay + moDisplay + dDisplay + hDisplay + mDisplay;
  return null;
};

const r1EndsIn = r1EndTime => {
  if (r1EndTime <= 0) {
    return `R1 Ended`;
  }
  return secondsToDhms(r1EndTime);
};

const formatMoney = (amount, decimalCount = 2, decimal = ".", thousands = ",") => {
  try {
    let amt = amount;
    let decimals = decimalCount;
    decimals = Math.abs(decimals);
    decimals = isNaN(decimals) ? 2 : decimals;

    const negativeSign = amount < 0 ? "-" : "";

    const i = parseInt((amt = Math.abs(Number(amount) || 0).toFixed(decimals)), 10).toString();
    const j = i.length > 3 ? i.length % 3 : 0;

    return `$${negativeSign +
      (j ? i.substr(0, j) + thousands : "") +
      i.substr(j).replace(/(\d{3})(?=\d)/g, `$1${thousands}`) +
      (decimals
        ? decimal +
          Math.abs(amount - i)
            .toFixed(decimals)
            .slice(2)
        : "")}`;
  } catch (e) {
    console.log(e);
  }
  return null;
};

export { formatDate, formatRateToPrice, formatFromWei, formatMoney, formatNumber, formatTokenPrice, formatCent, secondsToDhms, r1EndsIn };
