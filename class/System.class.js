const UserManager = require("./UserManager.class.js");

class System extends UserManager{

  async begin(app,host,user,password,db_name){
    this.app = app;
    const connected = await this.sqlBegin(host,user,password,db_name);
    connected ? this.main() : this.closeServer();
  }

  main(){
    const t = this;
    this.app.post('/server/signin', function(req,res) {
      t.signin(res, req.body.name, req.body.password, req.body.email, req.body.matricula, req.body.type, req.ip);
    });

    this.app.post('/server/login', function(req,res) {
      t.login(res, req.ip, req.body.user, req.body.password);
    });

    this.app.post('/server/user/hash', function(req,res) {
      t.hashLogin(res, req.body.hash,req.ip);
    });

    this.app.post('/server/user/exists', function(req,res) {
      t.verifyUserIdentity(res, req.body.user, req.body.email);
    });

    this.app.post('/server/user/matricula', function(req,res) {
      t.verifyMatricula(res, req.body.matricula);
    });
  
  }

  closeServer(){
    process.exit(1);
  }

}

module.exports = new System();
