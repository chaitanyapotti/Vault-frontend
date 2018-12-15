import moment from "moment";
import React from "react";
import web3 from "../../web3";
import constants from "../../../constants";

const formatDate = dbDate =>
  // moment().locale("en-gb");
  // moment.updateLocale("en-gb", {
  //   ordinal(number, token) {
  //     const b = number % 10;
  //     const output = (number % 100) / 10 === 1 ? "th" : b === 1 ? "st" : b === 2 ? "nd" : b === 3 ? "rd" : "th";
  //     return number + output;
  //   }
  // });
  `${moment(dbDate).format("Do MMM YYYY | h:mm A z")}`;

const formatRateToPrice = rate => significantDigits(1 / parseFloat(rate));

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

const tapDataConverted = tapData => {
  const data = {};
  for (let i = 0; i < tapData.length; i += 1) {
    const ts = new Date(tapData[i].timestamp * 1000);
    const tap = parseFloat(tapData[i].amount) * 86400 * Math.pow(10, -18);
    const newDate = new Date(ts.getFullYear(), ts.getMonth(), ts.getDate());
    data[newDate.getTime()] = data[newDate.getTime()] > tap ? data[newDate.getTime()] : tap;
  }
  return data;
};

const withdrawDataConverted = withdrawData => {
  const data = {};
  for (let i = 0; i < withdrawData.length; i += 1) {
    const ts = new Date(withdrawData[i].timestamp * 1000);
    const tap = parseFloat(withdrawData[i].amount);
    const newDate = new Date(ts.getFullYear(), ts.getMonth(), ts.getDate());
    data[newDate.getTime()] = data[newDate.getTime()] ? tap + data[newDate.getTime()] : tap;
  }
  return data;
};

const withdrawXfrDataConverted = withdrawXfrData => {
  const data = {};
  for (let i = 0; i < withdrawXfrData.length; i += 1) {
    const ts = new Date(withdrawXfrData[i].timestamp * 1000);
    const tap = parseFloat(withdrawXfrData[i].amount);
    const newDate = new Date(ts.getFullYear(), ts.getMonth(), ts.getDate());
    data[newDate.getTime()] = data[newDate.getTime()] ? tap + data[newDate.getTime()] : tap;
  }
  return data;
};

const Colors = i => {
  const Palette = [
    "#ffb6c7",
    "#ff839b",
    "#e85b7d",
    "#94d1ff",
    "#4ca9fc",
    "#0968af",
    "#ffed85",
    "#ffe655",
    "#efcc00",
    "#d1b300",
    "#ad9400",
    "#af7000",
    "#d38200",
    "#f28f00",
    "#ffb052",
    "#ffc483",
    "#d585ff",
    "#c455ff",
    "#9d00ef",
    "#8900d1",
    "#7100ad"
  ];
  let greyHex;
  let greyInt;
  if (i > 15) {
    let hex;
    const excess = i - 15;
    for (let j = 0; j < excess; j += 1) {
      greyInt = Math.round((j + 1) * (256 / (excess + 1)));
      greyInt < 16 ? (hex = `0${greyInt.toString(16)}`) : (hex = greyInt.toString(16));
      greyHex = `#${hex}${hex}${hex}`;
      Palette.push(greyHex);
    }
  }
  const colorArray = ["#3d3d3d", "#ffffff", "#3d3d3d", "#ffffff"].concat(Palette.splice(0, 6 + i));
  return colorArray;
};

const contributionDataConverted = contributionData => {
  const data = {};
  for (let i = 0; i < contributionData.length; i += 1) {
    const ts = new Date(contributionData[i].timestamp * 1000);
    const tap = parseFloat(contributionData[i].amount);
    const newDate = new Date(ts.getFullYear(), ts.getMonth(), ts.getDate());
    data[newDate.getTime()] = data[newDate.getTime()] ? tap + data[newDate.getTime()] : tap;
  }
  return data;
};

const pollState = (startTime, endTime) => {
  const presentDate = new Date();
  if (presentDate < startTime) {
    return "Tentative";
  }
  if (startTime < presentDate && presentDate < endTime) {
    return "Active";
  }
  if (presentDate > endTime) {
    return "Past";
  }
  return null;
};

const significantDigits = (number, perc = false, len = 2) => {
  let input = number;
  if (input === 0) return input;
  if (perc) {
    input *= 100;
  }
  let depth;
  if (input >= 1) {
    depth = 2;
  } else {
    depth = len - 1 + Math.ceil(Math.log10(1 / input));
  }
  const shift = Math.pow(10, depth);
  const roundedNum = Math.round(shift * input) / shift;
  return roundedNum;
};

const daysTookForTapPoll = (startTime, endTime) => {
  if (endTime) {
    if (parseFloat(endTime) === 0 || endTime - startTime === 1) return "Yet To Complete";
    return secondsToDhms(endTime * 1000 - startTime * 1000);
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

const xfrWithdrawStatus = (amount, startTime, endTime) => {
  let result;
  const presentDateTime = new Date();
  const convertedStartTime = new Date(startTime * 1000);
  const convertedEndTime = new Date(endTime * 1000);
  if (amount > 0) {
    result = "Y";
  } else if (presentDateTime > convertedStartTime && presentDateTime < convertedEndTime) {
    result = "NA";
  } else {
    result = "N";
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

    const negativeSign = amt < 0 ? "-" : "";

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

const getR1Price = rounds => formatRateToPrice(getR1Rate(rounds));

const getR1Rate = rounds => {
  const [round1] = rounds || {};
  const { tokenRate } = round1 || {}; // tokens/wei
  return tokenRate;
};

// const getRoundPrice = props => {
//   const { rounds, currentRoundNumber } = props || {};
//   const roundInfo = rounds[parseInt(currentRoundNumber, 10) - 1] || {};
//   const { tokenRate } = roundInfo || {};
//   return formatRateToPrice(tokenRate);
// };

const getR1Goal = rounds => {
  const [round1] = rounds || {};
  const { tokenRate, tokenCount } = round1 || {}; // tokens/wei
  return formatTokenPrice(parseFloat(tokenCount) / parseFloat(tokenRate), 6);
};

const getR3Price = rounds => {
  const round3 = [...rounds].pop() || {};
  const { tokenRate } = round3 || {}; // tokens/wei
  return formatRateToPrice(tokenRate);
};

const getSoftCap = (rounds, prices) => {
  const { ETH } = prices || {};
  const { price: etherPrice } = ETH || {};
  let softCap = 0;
  for (let index = 0; index < rounds.length; index += 1) {
    const { tokenCount } = rounds[index];
    softCap += parseFloat(tokenCount);
  }
  return formatMoney(formatFromWei(softCap * getR3Price(rounds) * parseFloat(etherPrice), 2), 0);
};

const r1TokenCount = rounds => {
  const [round1] = rounds || {};
  const { tokenCount } = round1 || {};
  return tokenCount;
};

const roundTokensSold = roundInfo => {
  const { totalTokensSold } = roundInfo || "";
  return totalTokensSold;
};

const getHardCap = (totalMintableSupply, prices, rounds) => {
  const { ETH } = prices || {};
  const { price: etherPrice } = ETH || {};
  return formatMoney(formatFromWei(parseFloat(totalMintableSupply) * getR3Price(rounds) * etherPrice), 0);
};

const getRoundText = (roundInfo, currentRoundNumber) => {
  const { tokenCount, totalTokensSold } = roundInfo || "";
  if (currentRoundNumber === "4") return "Sold Out (3rd Round Ended)";
  if (totalTokensSold && tokenCount && web3.utils.toBN(totalTokensSold).eq(web3.utils.toBN(tokenCount))) return `Round ${currentRoundNumber} Ended`;
  // based on tokens sold
  return `${formatCurrencyNumber(formatFromWei(totalTokensSold), 0)} Tokens Sold of ${formatCurrencyNumber(
    formatFromWei(tokenCount),
    0
  )} (Round ${currentRoundNumber} of 3)`;
};

const getPriceIncrement = (tokenTag, prices) => {
  const { [tokenTag]: tokenPrice } = prices || {};
  const { change } = tokenPrice || {};
  return change || 0;
};

const getLastRoundInfo = (roundInfo, currentRoundNumber) => {
  // TODO: get current round and price
  const { tokenRate } = roundInfo;
  const roundNumber = currentRoundNumber === "4" ? "3" : currentRoundNumber;
  return (
    <div style={{ marginTop: "24px" }}>
      <div className="text-right">Round {roundNumber} price</div>
      <div className="text-right opacity-75">{formatRateToPrice(tokenRate) || 0} ETH</div>
    </div>
  );
};

const getPrice = (tokenTag, prices, roundInfo) => {
  // TODO: to use external API
  const { [tokenTag]: tokenPrice } = prices || {};
  const { price } = tokenPrice || {};
  if (!price) {
    const { tokenRate } = roundInfo || {};
    return formatRateToPrice(tokenRate);
  }
  return price;
  // return 0.009861;
};

const getNextKillPollStartDate = (killPollIndex, r1EndTime) => {
  const endDate = new Date(r1EndTime);
  // if (new Date() - endDate < 0) return endDate;
  endDate.setDate(endDate.getDate() + (killPollIndex + 1) * 89);
  return endDate;
};

const getKillPollStartDate = killPollEndDate => {
  const endDate = new Date(killPollEndDate);
  const startDate = endDate.setDate(endDate.getDate() - 89);
  return new Date(startDate);
};

const getXfrEndDate = xfrStartDate => {
  const startDate = new Date(xfrStartDate);
  const endDate = startDate.setDate(startDate.getDate() + 29);
  return new Date(endDate);
};

const r1Finish = (r1EndTime, roundInfo) => {
  const { tokenCount, totalTokensSold } = roundInfo || "";
  return new Date(r1EndTime) < new Date() && totalTokensSold && tokenCount && web3.utils.toBN(totalTokensSold).lt(web3.utils.toBN(tokenCount));
};

const getButtonVisibility = (isCurrentMember, isMembershipRequestPending, signInStatusFlag) => {
  if (
    typeof isCurrentMember !== "undefined" &&
    typeof isMembershipRequestPending !== "undefined" &&
    !isCurrentMember &&
    !isMembershipRequestPending &&
    signInStatusFlag > 3
  )
    return true;
  return false;
};

const getIndividualCap = (maximumEtherContribution, rounds) => {
  const r1Goal = parseFloat(getR1Goal(rounds));
  const maxEther = significantDigits(formatFromWei(maximumEtherContribution, 3));
  return maxEther > r1Goal ? "Uncapped" : `${maxEther} ETH/person`;
};

const getSignInStatusText = (signInStatusFlag, isIssuerOfProject) => {
  switch (signInStatusFlag) {
    case 0:
      return constants.METAMASK_NOT_INSTALLED;
    case 1:
      return constants.METAMASK_NOT_SIGNED_IN;
    case 2:
      return constants.METAMASK_WRONG_NETWORK;
    case 3:
      return constants.NOT_VAULT_MEMBER;
    case 4:
      return constants.NOT_VAULT_ISSUER;
    case 5:
      if (!isIssuerOfProject) return constants.NOT_VAULT_ISSUER;
      break;
    default:
      break;
  }
  return constants.FAILED;
};

const getEtherScanHashLink = (txHash, network = null) => {
  const localNetwork = network === null ? "main" : network;
  return network === "main" ? `https://etherscan.io/tx/${txHash}` : `https://${localNetwork}.etherscan.io/tx/${txHash}`;
};

const getEtherScanAddressLink = (address, network = null) => {
  const localNetwork = network === null ? "main" : network;
  return network === "main" ? `https://etherscan.io/address/${address}` : `https://${localNetwork}.etherscan.io/address/${address}`;
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
  // getRoundPrice,
  formatCurrencyNumber,
  significantDigits,
  formatNumberToINRFormat,
  pollState,
  daysTookForTapPoll,
  xfrResult,
  win,
  tapDataConverted,
  withdrawDataConverted,
  withdrawXfrDataConverted,
  xfrWithdrawStatus,
  getR1Rate,
  r1TokenCount,
  roundTokensSold,
  contributionDataConverted,
  Colors,
  getSignInStatusText,
  getRoundText,
  r1Finish,
  getPriceIncrement,
  getLastRoundInfo,
  getPrice,
  getNextKillPollStartDate,
  getKillPollStartDate,
  getXfrEndDate,
  getEtherScanHashLink,
  getEtherScanAddressLink,
  getButtonVisibility,
  getIndividualCap
};
