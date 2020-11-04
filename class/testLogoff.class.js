const test = require('tape');
const System = require("./System.class.js");

module.exports = class LogoffAutoTest {
  constructor(app) {
    const sys = this;
    app.get('/server/testLogoff', function(req,res) { //rota para iniciar o teste
      sys.testInit();
      res.send(req.ip + "<br>Test Logoff"); //retorno do servidor para o navegador nao recarregar.
    });
  }

  testInit() {
    test('Teste de exclusao - SignInOff', async (t) => {
      let res = await System.SignInOff("123456789", "djbvdjfbvf"); //teste 1
      t.equals(res, "SignInOff blocked", "Nao excluir conta com Senha Incorreta");

      res = await System.SignInOff("8451261352", "e1234567"); //teste 2
      t.equals(res, "SignInOff blocked", "Nao excluir conta com Matricula Incorreta");

      res = await System.SignInOff("8451261352", "e1234567"); //teste 3
      t.equals(res, "SignInOff blocked", "Nao excluir nehuma conta com ambos parametros incorretos");

      res = await System.SignInOff("123456789", "e1234567"); //teste 4
      t.equals(res, "User deleted", "Excluir conta Comum");

      t.end();
    });
  }
}

