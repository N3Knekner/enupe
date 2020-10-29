const mysql = require('mysql');
const UserManager = require('./UserManager.class');

module.exports = class MySQLController extends UserManager{


  sqlBegin(host,user,password,db_name){
    this.DATABASE = mysql.createConnection({
        host: host,
        user: user,
        password: password,
        database: db_name
    });

    this.DATABASE.connect((err) => {
      if(err){
        console.log("connection to DB fail");
        this.end();
      }
      else this.main();
    });
  }

  sqlInsertion(query){

    let sql_string = stringGenerate();

    Query(this.DATABASE);

    function already(response){
      if(response){
        console.log("Insertion Error"); //interagir com o front end
      }
      else{
        console.log("Insertion done"); //interagir com o front end
      }
    }

    function Query(database){
      new Promise(function(resolve, reject) {
         database.query(sql_string, function (error) {
            resolve(error);
          });
      }).then((res) => {already(res)});
    }

    function stringGenerate(){
      let table = query[0];
      let rows = query[1];
      let values = query[2];

      let string = `INSERT INTO ${table}(`;
      let length = rows.length - 1;

      for(let x = 0; x < length; x++)
        string += rows[x] + ',';
  
      string += rows[length]+') VALUE(';

      for(let x = 0; x < length; x++)
        string += values[x] + ',';

      string += values[length]+');';

      return string;
    }

  }
  
  detectSQLinjection(str) {
    str = str.toLowerCase();
    const keys = ['select', 'delete', 'update', 'insert', 'from', 'where', '=', '!', '(', ')', "'", '"'];
    let clear = true;
    keys.map((key) => { if (str.includes(key)) clear = false; });
    return clear;
  }

  end(){
    this.DATABASE.end();
  }


}



