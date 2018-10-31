/* eslint camelcase: 0 */
const baseValue = {
  tableData: []
};

const calculateEndDuration = r1EndTime =>
  // console.log(moment.duration( moment(moment(r1EndTime).format('YYYY-MM-DD hh:mm:ss')), moment(moment().format('YYYY-MM-DD hh:mm:ss'))))
  r1EndTime;

const calculateRoundGoal = round => parseFloat(round.tokenCount) / (parseFloat(round.tokenRate) * Math.pow(10, 18));

const calculateFinalGoal = roundArray => {
  let finalGoal = 0;
  for (let i = 0; i < roundArray.length; i += 1) {
    finalGoal += calculateRoundGoal(roundArray[i]);
  }
  return finalGoal;
};

export default (baseline = baseValue, payload = {}, extra = {}) => {
  const data = payload.map(item => {
    const { projectName, rounds, startDateTime, r1EndTime } = item || {};
    const dataArray = [
      projectName,
      rounds.length,
      calculateRoundGoal(rounds[0]),
      calculateFinalGoal(rounds),
      100,
      1,
      new Date(startDateTime).toISOString(),
      calculateEndDuration(r1EndTime)
    ];
    return dataArray;
  });
  return {
    ...baseline,
    tableData: data
  };
};
