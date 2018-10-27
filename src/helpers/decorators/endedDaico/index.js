/* eslint camelcase: 0 */
const baseValue = {
    tableData:[]
};

const calculateEndDuration = r1EndTime =>
  // console.log(moment.duration( moment(moment(r1EndTime).format('YYYY-MM-DD hh:mm:ss')), moment(moment().format('YYYY-MM-DD hh:mm:ss'))))
  r1EndTime;
 
export default (baseline = baseValue, payload = {}, extra = {}) => {
    const data = payload.map((item) => {
        const {projectName, rounds, startDateTime, r1EndTime} = item || {};
        const dataArray = [
                            projectName,
                            100,
                            1,
                            90,
                            100,
                            1,
                            new Date(startDateTime).toISOString(),
                            calculateEndDuration(r1EndTime)
                         ];
        return dataArray
    })
    return {
      ...baseline,
      tableData: data
    };
  };
  