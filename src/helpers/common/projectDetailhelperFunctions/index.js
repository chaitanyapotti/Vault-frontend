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
  const d = Math.floor(secs / (3600 * 24));
  const h = Math.floor((secs % (3600 * 24)) / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = Math.floor((secs % 3600) % 60);

  const dDisplay = d > 0 ? d + (d === 1 ? " D " : " D ") : "";
  const hDisplay = h > 0 ? h + (h === 1 ? " H " : " H ") : "";
  const mDisplay = m > 0 ? m + (m === 1 ? " M " : " M ") : "";
  return dDisplay + hDisplay + mDisplay;
};

const r1EndsIn = r1EndTime => {
  if (r1EndTime <= 0) {
    return `R1 Ended`;
  }
  return secondsToDhms(r1EndTime);
};

const formatMoney = (amount, decimalCount = 2, decimal = ".", thousands = ",") =>
  `$${formatCurrencyNumber(amount, decimalCount, decimal, thousands)}`;

const formatCurrencyNumber = (amount, decimalCount = 2, decimal = ".", thousands = ",") => {
  try {
    let amt = amount;
    let decimals = decimalCount;
    decimals = Math.abs(decimals);
    decimals = isNaN(decimals) ? 2 : decimals;

    const negativeSign = amount < 0 ? "-" : "";

    const i = parseInt((amt = Math.abs(Number(amount) || 0).toFixed(decimals)), 10).toString();
    const j = i.length > 3 ? i.length % 3 : 0;

    return `${negativeSign +
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

const getR1Price = props => {
  const { rounds } = props || {};
  const [round1, ...rest] = rounds || {};
  const { tokenRate } = round1 || {}; // tokens/wei
  return formatRateToPrice(tokenRate);
};

const getR1Goal = props => {
  const { rounds } = props || {};
  const [round1, ...rest] = rounds || {};
  const { tokenRate, tokenCount } = round1 || {}; // tokens/wei
  return formatTokenPrice(parseFloat(tokenCount) / parseFloat(tokenRate), 2);
};

const getR3Price = props => {
  const { rounds } = props || {};
  const round3 = [...rounds].pop() || {};
  const { tokenRate } = round3 || {}; // tokens/wei
  return formatRateToPrice(tokenRate);
};

const getSoftCap = props => {
  const { rounds, prices } = props || {};
  const { ETH: etherPrice } = prices || {};
  let softCap = 0;
  for (let index = 0; index < rounds.length; index += 1) {
    const { tokenCount } = rounds[index];
    softCap += parseFloat(tokenCount);
  }
  return formatMoney(formatFromWei(softCap * getR3Price(props) * parseFloat(etherPrice), 2), 0);
};

const getHardCap = props => {
  const { totalMintableSupply, prices } = props || {};
  const { ETH: etherPrice } = prices || {};
  return formatMoney(formatFromWei(parseFloat(totalMintableSupply) * getR3Price(props) * etherPrice), 0);
};

export {
  formatDate,
  formatRateToPrice,
  formatFromWei,
  formatMoney,
  formatNumber,
  formatTokenPrice,
  formatCent,
  secondsToDhms,
  r1EndsIn,
  getR1Price,
  getSoftCap,
  getHardCap,
  getR1Goal,
  getR3Price,
  formatCurrencyNumber
};
