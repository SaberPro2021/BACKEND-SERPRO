const ldap = require('ldapjs');
const assert = require('assert');
const Usuario = require('../model/usuario.model');
const { encrypt, decrypt } = require('../model/crypto.model');

const Ldapclient = {};


const Estudiante = /OU=ESTUDIANTES/;
const Docente = /OU=DOCENTES/;

function expregStatus(expreg, str) {

    return expreg.exec(str);
}

Ldapclient.authentication = async function (req, res) {

    if (req.body) {
        const usuario = new Usuario(req.body.mail, req.body.password);

        console.log("Mail   -->", usuario.getMail());
        console.log("Password  -->", usuario.getPassword());

        const cliente = ldap.createClient({
            url: 'ldap://192.168.4.10',
            timeout: 5000,
            connectTimeout: 10000
        });

        const opts = {
            filter: '(mail=' + usuario.getMail() + '*)',
            scope: 'sub',
            attributes: ["sn", "givenname", "mail"]
        }

        const hash = encrypt(usuario.getPassword());
        console.log(hash);
        const text = decrypt(hash);
        console.log(text);
 
        try {
            cliente.bind(usuario.getMail(), decrypt(hash), async function (err) {
                if (err) {
                    console.log(err);
                    cliente.destroy(err);
                } else {
                    cliente.search('OU=usuarios, DC=poligran, DC=edu, DC=co', opts, (err, response) => {

                        assert.ifError(err);

                        response.on('searchEntry', (entry) => {

                            res.json(entry.object);


                            var outcome = expregStatus(Estudiante, entry.object.dn);
                            if (outcome != null)
                                console.log(outcome[0])
                            else {
                                var outcome = expregStatus(Docente, entry.object.dn);
                                if (outcome != null)
                                    console.log(outcome[0])
                                else
                                    console.log('NULL')

                            }

                        });
                    });

                }
            });
        } catch (e) {
            console.log('Bind failed');
        }

    } else {
        res.status(500).send({
            message: 'error, the body is empty'
        });
    }

}

module.exports = Ldapclient;