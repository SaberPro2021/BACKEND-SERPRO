const scoreModel = require('../model/score.model');

require('../database/db.connection');

const Score = {};

Score.postScore = async function (req, res) {

    if (req.body) {
        const scoreModels = new scoreModel(req.body);
        scoreModels.save((err, response) => {
            if (err) {
                res.status(500).send({
                    message: 'error insertando la puntuación del usuario'
                });
            }
            res.json(response);
        });
    } else {
        res.status(500).send({
            message: 'error, the body is empty'
        });
    }
}


Score.getScoreByUserTestModuleId = async function (req, res) {

    let userIdParam = req.params.userId;
    const data = scoreModel.aggregate([
        { $match: { userId: userIdParam } },
        {
            $group: {
                _id: "$moduleId",
                count: { $sum: 1 },
                sum: { $sum: "$time" }
            }
        }
    ]).exec(function (err, data) {
        if (err) {
            console.log(err);
            res.status(500).send({
                message: 'error, Score.getScoreByUserTestModuleId'
            });
        }
        console.log(data);
        res.send(data);
    });

};


module.exports = Score;