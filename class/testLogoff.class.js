const test = require('tape');
const System = require("./System.class.js");

module.exports = class LogoffAutoTest {
  constructor(app) {
    const sys = this;
    app.get('/server/teste', function(req,res) {
      sys.testInit();
      res.send(req.ip); //Block navigator reload
    });
  }

  testInit() {
    test('Teste de exclusão - SignInOff', async (t) => {
      let res = await System.SignInOff("123456789", "c123456");
      t.equals(res, "SignInOff blocked", "Não excluir conta com Senha Incorreta");

      res = await System.SignInOff("92345678", "e1234567");
      t.equals(res, "SignInOff blocked", "Não excluir conta com Matricula Incorreta");

      res = await System.SignInOff("123456789", "e1234567")
      t.equals(res, "User deleted", "Excluir conta Comum");
      
      t.end();
    });
  }
}

