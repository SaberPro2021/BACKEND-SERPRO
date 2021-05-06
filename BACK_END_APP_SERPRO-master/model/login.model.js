class User{
    
    constructor(mail, password){
        this.mail = mail;
        this.password = password;
    }

    getMail (){
        return this.mail;
    }
    getPassword(){
        return this.password;
    }
}

module.exports = User;