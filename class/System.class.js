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
    
    system.app.get('/', function(req,res) {
        res.send('<h1>main</h1><br>');
    });
    
    system.app.post('/server/login', function(req,res) {
      system.userLogin(res,system,req.ip,req.body.user,req.body.password);
    });

    system.app.post('/server/user/exists', function(req,res) {
      system.verifyUserIdentity(res,req.body.user,req.body.email);
    });

    system.app.post('/server/user/matricula', function(req,res) {
      system.verifyMatricula(res,req.body.matricula);
    });

    system.app.post('/server/signin', function(req,res) {
      system.newUser(req.body.name,req.body.password,req.body.email,req.body.matricula,req.body.type);
    });


    
    //MySQL.newOccurrence("TESTE ASSUNTO","2020-09-30","Blablabla blabla <- this is a txt",1,2,3);
  }

  userLogged(str){
    this.app.get('/home', function(req,res) {
      res.write(str);
      res.end();
    });
  }


}













module.exports = new System();
