const MySQLController = require("./MySQLController.class.js");
const DATABASE = undefined;
const app = undefined;

class System extends MySQLController{

  begin(app,host,user,password,db_name){
    this.app = app;
    this.sqlBegin(host,user,password,db_name);
  }

  main(){
    let system = this;
    console.log("Server is ON");
    
    system.app.post('/equipe4/server/signin', function(req,res) {
      system.newUser(res, req.body.name, req.body.password, req.body.email, req.body.matricula, req.body.type, req.ip);
    });

    system.app.post('/equipe4/server/login', function(req,res) {
      system.userLogin(res, system, req.ip, req.body.user, req.body.password);
    });

    system.app.post('/equipe4/server/user/hash', function(req,res) {
      system.hashLogin(res, req.body.hash,req.ip);
    });

    system.app.post('/equipe4/server/user/exists', function(req,res) {
      system.verifyUserIdentity(res, req.body.user, req.body.email);
    });

    system.app.post('/equipe4/server/user/matricula', function(req,res) {
      system.verifyMatricula(res, req.body.matricula);
    });
  
  }

}

module.exports = new System();