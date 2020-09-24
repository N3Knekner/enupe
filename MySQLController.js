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


  newUser(username,userpassword,email,ip,stayConnected){
    let sql_string = `SELECT username, email FROM users WHERE username LIKE '${username}' OR email LIKE '${email}'`;

    getReturnQuery(this.DATABASE,sql_string);

    function alreadyStart(database,user){
      if(!user[0]){
        sql_string = `INSERT INTO users(username,userpassword,email,ip,stayConnected) VALUE("${username}","${userpassword}","${email}","${ip}","${stayConnected}")`;
        
        database.query(sql_string, function (error, returned_data) {
          if(error) console.log("Error: unregistered user\n" + error);// futuramente, isto ira interagir com o frontend
          else console.log("User Sign!");// futuramente, isto ira interagir com o frontend
        });
      } else{
        console.log("User Already Exists");// futuramente, isto ira interagir com o frontend
      }
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
        alreadyStart(database,response);
      });
    }
  }


  login(username,userpassword){
    let sql_string = `SELECT username FROM users WHERE username LIKE '${username}' AND userpassword LIKE '${userpassword}'`;

    getReturnQuery(this.DATABASE,sql_string);

    function alreadyStart(database,user){
      if(user[0]){
        console.log("User Logged!");// futuramente, isto ira interagir com o frontend
      } else{
        console.log("User not found or incorrect credentials");// futuramente, isto ira interagir com o frontend
      }
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
        alreadyStart(database,response);
      });
    }

  }


  newOccurrence(subject_matter,data_time,txt,sender,address,importance){
    let sql_string = `INSERT INTO occurrence(subject_matter,data_time,txt,sender,address,importance) VALUE("${subject_matter}","${data_time}","${txt}","${sender}","${address}","${importance}")`;

    this.DATABASE.query(sql_string, function (error, returned_data) {
      if(error) console.log("Error: unregistered occurrence\n" + error);// futuramente, isto ira interagir com o frontend
        else console.log("Registered Occurrence!");// futuramente, isto ira interagir com o frontend
    });
  } 


  end(){
    this.DATABASE.end();
  }


}



module.exports = new MySQLController(); // Exporta a clsse MySQLController para ser acessivel no index.js
