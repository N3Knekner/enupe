const mysql = require('mysql');

module.exports = class MySQLController{


  async sqlBegin(host,user,password,db_name){
    this.DATABASE = mysql.createConnection({
        host: host,
        user: user,
        password: password,
        database: db_name
    });

    const pointer = this.DATABASE; // Promisses and the bug fixes
    return await new Promise(function (resolve) {
      pointer.connect((err) => {resolve(err);});
    }).then((err)=>{
      if (err) {
        console.log(" [1;31mConnect to DataBase failed [0m");
        this.end();
        return false;
      }
      else {
        console.log(" [1;32mConnect to DataBase successful [0m");
        return true;
      };
    })
  }

  async Query(sql_string, callback = (res)=>{return res;}) {
    const pointer = this.DATABASE;
    return await new Promise(function (resolve) {
      pointer.query(sql_string, function (error, response) { resolve(response); });
    }).then((res) => { return callback(res) });
  }

  sqlInsertion(query){

    let sql_string = stringGenerate();

    Query(this.DATABASE);

    function already(response){
      if(response){
        console.log("❌ Insertion Error"); //interagir com o front end
      }
      else{
        console.log("✔ Insertion done"); //interagir com o front end
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



