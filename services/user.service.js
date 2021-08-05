const ldap = require('ldapjs');
const assert = require('assert');
const Login = require('../model/loginClass.model');
const Profile = require('../model/profile.model')
const allVisitSessionClass = require('../model/allVisitSessionClass.model')
const allVisitSessionModel = require('../model/allVisitSession.model')

const { encrypt, decrypt } = require('./crypto.service');
const ProfileClass = require('../model/profileClass.model');
const profileController = require('../Controller/profile.controller')
const allVisitSessionController = require('../Controller/allVisitSession.controller')

const Ldapclient = {};
const Estudiante = /OU=ESTUDIANTES/;
const Docente = /OU=DOCENTES/;
const urlLDAP = 'ldap://192.168.4.10';
var outcome;

var fs = require('fs');

var imageAsBase64 = fs.readFileSync('./image/profile.png', 'base64');

function expregStatus(expreg, str) {

    return expreg.exec(str);
}

Ldapclient.authentication = async function (req, res) {

    
    if (req.body) {
        const userCredentials = new Login(req.body.email, req.body.password);
        //console.log("Mail   -->", userCredentials.getMail());
        //console.log("Password  -->", userCredentials.getPassword());

        const clientLDAP = ldap.createClient({
            url: urlLDAP,
            timeout: 5000,
            connectTimeout: 10000
        });

        const opts = {
            filter: '(mail=' + userCredentials.getMail() + '*)',
            scope: 'sub',
            attributes: ["sn", "givenname", "mail"]
        }

        const hash = encrypt(userCredentials.getPassword());
        //console.log(hash);
        const text = decrypt(hash);
        //console.log(text);

        try {
            clientLDAP.bind(userCredentials.getMail(), decrypt(hash), async function (err) {
                if (err) {
                    clientLDAP.destroy(err);
                    res.status(500).send({
                        message: 'bad credentials'
                    });

                } else {
                    clientLDAP.search('OU=usuarios, DC=poligran, DC=edu, DC=co', opts, (err, response) => {

                        assert.ifError(err);
                        
                        response.on('searchEntry', (entry) => {

                            //session with user name
                           
                            req.session.userName = entry.object.givenName;
                            req.session.email = userCredentials.getMail();
                            req.session.count = 0;
                            req.session.modules = []
                            req.session.tests = []

                          
                            /*  attribute cookie with only values
                           if (req.session.modules.indexOf(10001)==-1) {
                                req.session.modules.push (10001)
                            } */

                            req.session.dateVisit = Date(Date.now());
                     
                            

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

                            req.session.job = outcome[0];
                            //console.log("response cookie-> ",req.sessionID,' ',req.session.userName)
                            res.json(req.session)
                            console.log(req.session)
                            //res.json(entry.object);
                            
                            Ldapclient.profileUser(err, entry, outcome);
                            
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

Ldapclient.isAccessGrantedDocente = function (req, res, next) {
    
    console.log("isAccessGrantedDocente - GRANT USUARIO DE LA SESION->" + req.session.email)
    if (req.session.email == undefined || null) {
        req.session.destroy();
        return res.status(401).end();
    }

    if (Docente != "/" + outcome[0] + "/") 
        return res.status(401).end()
    next()
}

Ldapclient.isAccessGrantedLogin = function (req, res, next) {
        
    //console.log("isAccessGrantedLogin - GRANT USUARIO DE LA SESION >" + req.session.email)
    if (req.session.email == undefined || null) {
        req.session.destroy();
        return res.status(401).end();
    }
 
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
    //console.log("session -- > ", req.session) 
    classAllVisitUser = new allVisitSessionClass(req.session.email, req.session.modules, req.session.tests, req.session.dateVisit)
    const allVisitUserMongo = new allVisitSessionModel(classAllVisitUser);
    //save mongodb
    allVisitSessionController.SaveAllVisitSession(allVisitUserMongo)
    res.status(200).end()
    //delete DB the sessions
    req.session.destroy(() => {
        res.status(200).end('logged out')
        //res.redirect('/module') // will always fire after session is destroyed
    })
}

module.exports = Ldapclient;
