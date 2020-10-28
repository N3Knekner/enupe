const test = require('tape'); //NAO ALTERE ISSO
const System = require("./System.class.js"); // NAO ALTERE ISSO

module.exports = class SUACLASSE {
  constructor(app) {
    const sys = this;
    app.get('/server/NOMEDOSEUTESTE', function (req, res) { // Para iciar o teste acesse essa URL
      sys.testInit();
      res.send(req.ip); //Block navigator reload
    });
  }

  testInit() {
    test('CATEGORIA DO TESTE', async (t) => {
      let res = await System.NOME_DA_FUNCAO_DO_SISTEMA("PARAMENTRO 1", "PARAMETRO 2");
      t.equals(res, "RETORNO ESPERADO", "TITULO DO TESTE");

      // VOCE PODE REPETIR OS COMANDOS PARA OUTROS TESTES
      /* res = await System.NOME_DA_FUNCAO_DO_SISTEMA("PARAMENTRO 1", "PARAMETRO 2");
      t.equals(res, "RETORNO ESPERADO", "TITULO DO TESTE"); */

      t.end(); // SEMPRE MATENHA ESSE COMANDO NO FINAL
    });
  }
}


