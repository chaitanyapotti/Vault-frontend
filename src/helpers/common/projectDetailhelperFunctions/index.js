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

// const formatNumber = (rate, precision = 2) => parseFloat(rate).toPrecision(precision);

const formatFromWei = (input, precision = 0) => Math.round(parseFloat(input) * Math.pow(10, -18) * Math.pow(10, precision)) / Math.pow(10, precision);

const formatTokenPrice = (input, precision = 0) => parseFloat(parseFloat(input) * Math.pow(10, -18)).toPrecision(precision);

const formatCent = tokenPrice => {
  if (tokenPrice < 100) {
    return `${tokenPrice}¢`;
  }
  return `$${tokenPrice}`;
};

const win = address => {
  window.open(`/pollscan?contract=${address}`);
};

const pollState = (startTime, endTime) => {
  const presentDate = new Date();
  if (presentDate < startTime) {
    return "Tentative";
  }
  if (startTime < presentDate < endTime) {
    return "Active";
  }
  if (presentDate > endTime) {
    return "Past";
  }
  return null;
};

const significantDigits = number => {
  let input = number;
  if (input === 0) return input;
  if (input < 1) {
    input *= 100;
  }
  let depth;
  if (input >= 1) {
    depth = 2;
  } else {
    depth = 1 + Math.ceil(Math.log10(1 / input));
  }
  const shift = Math.pow(10, depth);
  const roundedNum = Math.round(shift * input) / shift;
  return roundedNum;
};

const daysTookForTapPoll = (startTime, endTime) => {
  if (endTime) {
    secondsToDhms(endTime - startTime);
  }
  return "Yet To Complete";
};

const xfrResult = (startTime, endTime, consensus, xfrRejectionPercent) => {
  const presentDate = new Date();
  let result;
  if (startTime < presentDate < endTime) {
    result = "Ongoing";
  } else if (consensus < xfrRejectionPercent) {
    result = "Success";
  } else {
    result = "Fail";
  }
  return result;
};

const formatNumberToINRFormat = number => {
  let n1;
  let num;
  num = `${number}` || "";
  n1 = num.split(".");
  const n2 = n1[1] || null;
  n1 = n1[0].replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");
  num = n2 ? `${n1}.${n2}` : n1;
  return num;
};

const secondsToDhms = seconds => {
  const secs = Number(seconds) / 1000;
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
  const [round1] = rounds || {};
  const { tokenRate } = round1 || {}; // tokens/wei
  return formatRateToPrice(tokenRate);
};

const getRoundPrice = props => {
  const { rounds, currentRoundNumber } = props || {};
  const roundInfo = rounds[parseInt(currentRoundNumber, 10) - 1] || {};
  const { tokenRate } = roundInfo || {};
  return formatRateToPrice(tokenRate);
};

const getR1Goal = props => {
  const { rounds } = props || {};
  const [round1] = rounds || {};
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
  const { ETH } = prices || {};
  const { price: etherPrice } = ETH || {};
  let softCap = 0;
  for (let index = 0; index < rounds.length; index += 1) {
    const { tokenCount } = rounds[index];
    softCap += parseFloat(tokenCount);
  }
  return formatMoney(formatFromWei(softCap * getR3Price(props) * parseFloat(etherPrice), 2), 0);
};

const getHardCap = props => {
  const { totalMintableSupply, prices } = props || {};
  const { ETH } = prices || {};
  const { price: etherPrice } = ETH || {};
  return formatMoney(formatFromWei(parseFloat(totalMintableSupply) * getR3Price(props) * etherPrice), 0);
};

export {
  formatDate,
  formatRateToPrice,
  formatFromWei,
  formatMoney,
  formatTokenPrice,
  formatCent,
  secondsToDhms,
  r1EndsIn,
  getR1Price,
  getSoftCap,
  getHardCap,
  getR1Goal,
  getR3Price,
  getRoundPrice,
  formatCurrencyNumber,
  significantDigits,
  formatNumberToINRFormat,
  pollState,
  daysTookForTapPoll,
  xfrResult,
  win
};
