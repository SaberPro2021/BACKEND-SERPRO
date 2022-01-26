const scoreModel = require('../model/score.model');

require('../database/db.connection');

const Score = {};
 
Score.postScore = async function(req, res) {
    
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

module.exports = Score;