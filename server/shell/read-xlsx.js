const xlsx = require("node-xlsx");
const fs = require("fs");

function readXlsx() {
  const workSheetsFromBuffer = xlsx.parse(fs.readFileSync(`${__dirname}/1501.xlsx`));

  let scoreSheet = workSheetsFromBuffer[0].data;
  scoreSheet.shift();

  const grade = scoreSheet.map((items) => {
    return {
      schoolNumber: items[0],
      name: items[1],
      normal: parseInt(items[2] === undefined ? 0 : items[2]),
      middle: parseInt(items[3] === undefined ? 0 : items[3]),
      exc: parseInt(items[4] === undefined ? 0 : items[4]),
      end: parseInt(items[5] === undefined ? 0 : items[5]),
      total: parseInt(items[6] === undefined ? 0 : items[6]),
      info: items[7] === undefined ? '' : items[7],
    }
  });
  return grade;
}
module.exports = readXlsx;
