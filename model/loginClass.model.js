class User{
    
    constructor(email, password){
        this.email = email;
        this.password = password;
    }
    getMail (){
        return this.email;
    }
    getPassword(){
        return this.password;
    }
}

module.exports = User;