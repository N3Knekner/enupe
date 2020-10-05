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
      system.verifyUserIdentity(res,name,email);
      system.userLogin(res,system,req.ip,req.body.user,req.body.password);//recebe do front-end
    });

    system.app.post('/server/user/exists', function(req,res) {
      system.verifyUserIdentity(res,req.body.user,req.body.user);
    });

    system.app.get('/server/sign', function(req,res) {
      res.write('<h1>new user</h1><br>');

      let name = "evandro"; //recebe do front-end
      let password = "evandro321"; //recebe do front-end
      let email = "e@gmail.com"; //recebe do front-end

      system.verifyUserIdentity(res,name,email);

      system.newUser(name,password,email,req.ip);
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
