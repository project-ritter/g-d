const xlsx = require("node-xlsx");
const fs = require("fs");

function paperScoreXlsx() {
  const workSheetsFromBuffer = xlsx.parse(fs.readFileSync(`${__dirname}/paper-score.xlsx`));

  let scoreSheet = workSheetsFromBuffer[0].data;

  const paperScore = scoreSheet.map((items) => {
    if (items[0]) {
      return {
        one: {score: items[0], total: 15},
        two: {score: items[1], total: 10},
        three: {score: items[2], total: 25},
        four: {score: items[3], total: 15},
        five: {score: items[4], total: 10},
        six: {score: items[5], total: 25},
        total: items[6],
        program: items[7]
      }
    }

  });
  return paperScore;
}
module.exports = paperScoreXlsx;
