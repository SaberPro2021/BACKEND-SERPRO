const ldap = require('ldapjs');
const assert = require('assert');


const Ldapclient = {};



Ldapclient.t = async function(req, res) {

    const cliente = ldap.createClient({
        url : 'ldap://192.168.4.10',
        timeout : 5000,
        connectTimeout: 10000
    });
    
    const user = 'jubernal11@poligran.edu.co';
    const pass   = '*******';
    //let err = new Error(`Page Doesn't Exist`);
    
    const opts = {
        filter : '(mail='+user+'*)',
        scope : 'sub',
        attributes : ["sn","givenname","mail"]
    }

    try {
        cliente.bind(user, pass, async function (err) {
            if (err) {
                console.log(err);
                cliente.destroy(err);
            } else { 
                cliente.search('OU=usuarios, DC=poligran, DC=edu, DC=co', opts, (err, response) => {
    
                    assert.ifError(err);
    
                    response.on('searchEntry', (entry) => {

                        res.json(entry.object);
                        console.log('entry: ' + JSON.stringify(entry.object));
                        });
                });
                
            }
        });
    } catch (e) {
        console.log('Bind failed');
      }
    
}


/*
try {
    client.bind(user, pass, async function (error) {
        if (error) {
            console.log(error);
        } else {
            client.search('OU=usuarios, DC=poligran, DC=edu, DC=co', opts, (err, res) => {
    
                assert.ifError(err);

                res.on('searchEntry', (entry) => {
                console.log('entry: ' + JSON.stringify(entry.object));
                });

                res.on('searchReference', (referral) => {
                console.log('referral: ' + referral.uris.join());
                });

                res.on('error', (err) => {
                console.error('error: ' + err.message);
                });

                res.on('end', (result) => {
                console.log('status: ' + result.status);
                });
            });
        }
    });

} catch (err) {
    console.log(err);
}
*/

module.exports = Ldapclient;