const ldap = require('ldapjs');
const assert = require('assert');
const Usuario = require('../model/loginClass.model');
const Profile = require('../model/profile.model')
const { encrypt, decrypt } = require('./crypto.service');
const ProfileClass = require('../model/profileClass.model');
const profileController = require('../Controller/profile.controller')

const Ldapclient = {};
const Estudiante = /OU=ESTUDIANTES/;
const Docente = /OU=DOCENTES/;
var userMail = '';
var outcome;

var fs = require('fs');

var imageAsBase64 = fs.readFileSync('./image/profile.png', 'base64');
const buffer = Buffer.from(imageAsBase64, "base64");
//console.log(imageAsBase64 , "  --->>   ",buffer)


fs.writeFileSync("C:\\Users\\jubernal11\\OneDrive - Politécnico Grancolombiano\\Escritorio\\image\\x.png", buffer);


function expregStatus(expreg, str) {

    return expreg.exec(str);
}

Ldapclient.authentication = async function (req, res) {

    if (req.body) {
        const usuario = new Usuario(req.body.email, req.body.password);
        userMail = req.body.email;
        //console.log("Mail   -->", usuario.getMail());
        //console.log("Password  -->", usuario.getPassword());

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
        //console.log(hash);
        const text = decrypt(hash);
        //console.log(text);

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

                            outcome = expregStatus(Estudiante, entry.object.dn);
                            if (outcome != null)
                                console.log("Outcome -> ", outcome[0])
                            else {
                                outcome = expregStatus(Docente, entry.object.dn);
                                if (outcome != null)
                                    console.log(outcome[0])
                                else
                                    console.log('NULL')

                            }

                            Ldapclient.profileUser(err, entry, outcome);
                        });

                        //session with user name
                        req.session.user = usuario.getMail()

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

Ldapclient.isAccessGrantedDocente = function (req, res, next) {
    console.log("Salida de outcome ->", outcome[0])
    console.log("isAccessGrantedDocente - GRANT USUARIO DE LA SESION->" + req.session.user + " " + userMail)
    //if (req.session.user != userMail)
      //  return res.status(401).end()

    if (Docente != "/" + outcome[0] + "/") return res.status(401).end()
    next()
}

Ldapclient.isAccessGrantedLogin = function (req, res, next) {
    //Se requiere validar con la sesion también
    console.log("isAccessGrantedLogin - GRANT USUARIO DE LA SESION >" + req.session.user + " " + userMail)
    console.log(req.session);
   // if (req.session.user != userMail)
     //   return res.status(401).end()

     console.log("outcome --> " ,outcome[0])

    if (Docente != "/" + outcome[0] + "/" && Estudiante != "/" + outcome[0] + "/")
        return res.status(401).end()
    next()
}

Ldapclient.profileUser = function (err, entry, outcome) {

    profileClass = new ProfileClass(entry.object.givenName, entry.object.sn, entry.object.mail, outcome[0], imageAsBase64)

    const profileMongo = new Profile(profileClass);
    //console.log("Profile -- > ",profileMongo);
    profileController.createProfile(err, profileMongo);
    return profileMongo;
};

Ldapclient.destroySession = async function (req, res) {
    console.log("session -- > ", req.session)
    req.session.destroy(() => {
        res.redirect('/') // will always fire after session is destroyed
    })
}

module.exports = Ldapclient;
