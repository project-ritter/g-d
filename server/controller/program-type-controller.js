const PaperScore = require('../model/paperScore');

class ProgramTypeController {
  getType(req, res, next) {
    PaperScore.find({}).distinct('program').exec((err, docs) => {
      if (err) {
        return next(err);
      }
      return res.status(200).send(docs);
    });
  }

}

module.exports = ProgramTypeController;
