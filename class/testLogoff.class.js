const test = require('tape');
const System = require("./System.class.js");

class LogoffAutoTest{

  begin(app){
    let system = this;
    System.begin(app, "localhost", "root", "", "ENUPE_BD");//start main class to test;
      app.get('/server/teste', function(req,res) {
      console.log(req.ip);
      system.testInit();
    });
  }

  testInit(){
    console.log('testing..');
    test('Excluir conta Comum', async (t) => {
      t.plan(1);
      const x = await System.logoff("123456789","e1234567");
      t.equal(x,"user deleted");
    });
    
    test('Excluir conta Comum', async (t) => {
      t.plan(1);
      const x = await System.logoff("1234567","e1234567");
      t.equal(x,"user deleted");
    });

    /*test('Excluir conta com Senha Incorreta', (t) => {
      t.assert(System.logoff("123456789","c123456") === "ERROR: logoff blocked", "WORKS!");
      t.end();
    });*/

    /*test('Excluir conta com Matricula Incorreta', (t) => {
      t.assert(System.logoff("92345678","e1234567") === "ERROR: logoff blocked", "WORKS!");
      t.end();
    });*/
  }
}
module.exports = new LogoffAutoTest();


