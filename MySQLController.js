const mysql = require('mysql');
const DATABASE = null;


class MySQLController{

  constructor() {}
  

  begin(host,user,password,db_name){
    this.DATABASE = mysql.createConnection({
        host: host,
        user: user,
        password: password,
        database: db_name
    });
    this.DATABASE.connect((err) => {if(err) console.log("connection to DB fail")});
  }




  newUser(username,email){
    let sql_string = "SELECT username, email FROM users WHERE username like '"+username+"' OR email like '"+email+"'";

    getReturnQuery(this.DATABASE,sql_string);

    function alreadyStart(user){
      console.log(user[0].username);
      console.log(user[0].email);
    }


    async function getReturnQuery(database,sql){
      await selectUserQuery(database,sql);
    }
    function selectUserQuery(database,sql) {
      return new Promise(function(resolve, reject) {
          database.query(sql_string, function (error, returned_data) {
           resolve(returned_data);
        });
      }).then(response => {
        alreadyStart(response);
      });
    }
  }



  end(){
    this.DATABASE.end();
  }


}



module.exports = new MySQLController(); // Exporta a clsse MySQLController para ser acessivel no index.js
