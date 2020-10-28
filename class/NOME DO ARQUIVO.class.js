const test = require('tape'); //NAO ALTERE ISSO
const System = require("./System.class.js"); // NAO ALTERE ISSO

class YOUClassTest{ //DEFINA O NOME DE SUA CLASSE DE TESTE

  begin(app){ //AKI É O INICIALIZADOR DA CLASSE
    System.begin(app, "localhost", "root", "", "ENUPE_BD");// ESTE É O INICIALIZADOR DA MAIN BEGIN PARA TESTE



    //SE VOCE LEU O TUTORIAL DO LINK https://www.luiztools.com.br/post/tdd-como-criar-unit-tests-em-node-js-com-tape/
    // VOCE PODERÁ FAZER SEU TESTE ABAIXO



    test('NOME DE MEU TESTE', (t) => {
        t.assert(System.NOME_DA_MINHA_FUNCAO_IMPLEMENTADA() === "abc", "expected return");
        t.end()  ;
    });
  }
}

module.exports = new YOUClassTest(); // ALTERE PARA O MESMO NOME QUE VOCE DEFINIO NO INICIO


