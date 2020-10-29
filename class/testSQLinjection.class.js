const test = require('tape');
const System = require("./System.class.js");

module.exports = class testSQLinjection {
  constructor(app) {
    const sys = this;
    app.get('/server/sql', function (req, res) {
      sys.testInit();
      res.send(req.ip); //Block navigator reload
    });
  }

  testInit() {
    test('INJEÇÃO DE SQL', async (t) => {
      let res = await System.detectSQLinjection("Alfredo");
      t.equals(res, true, "Texto limpo");

      res = await System.detectSQLinjection("Alfredo');",);
      t.equals(res, false, "Texto com carateres especiais");

      res = await System.detectSQLinjection("SELECT email, userpassowrd FROM users",);
      t.equals(res, false, "Texto malicioso");

      t.end();
    });
  }
}


