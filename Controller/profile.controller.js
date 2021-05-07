require('../database/db.connection');

const UsuarioLogin = require('../services/user.service');

const Profiles = {};

Profiles.createProfile = async function(req, res) {
    if (req.body) {
        const Profiles = new Profile(req.body);
        Profiles.save((err, response) => {
            if (err) {
                res.status(500).send({
                    message: 'error insertando modulo'
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