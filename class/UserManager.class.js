const { DATABASE } = require("./System.class");
module.exports = class UserManager{

  newUser(username = undefined, userpassword = undefined, email = undefined, ip = "000.000.000"){
    if(username && userpassword && email){
      let table = "users";
      let rows = [['username'],['userpassword'],['email'],['ip']];

      let values =  [[`"${username}"`],[`"${userpassword}"`],[`"${email}"`],[`SHA1("${ip}")`]];
    
      this.sqlInsertion([[table],[rows],[values]]);
    }
  }

  verifyUserIdentity(res,username,email){
    let sql_string = [`SELECT username FROM users WHERE username LIKE '${username}'`];
    sql_string[1] = `SELECT email FROM users WHERE  email LIKE '${email}'`;

    sql_string.forEach(element => {

      Query(this.DATABASE);

      function alreadyStart(response){
        try{
         if(response[0].username){
            res.write(`User already exists`); //interagir com o front end
          }
          else if(response[0].email){
            res.write(`Email already exists`); //interagir com o front end
          }
          else{
            res.write("Permission to SIGN true"); //interagir com o front end
          } 
          res.end();
        } catch(err){console.log(err)}
      }
    
      function Query(database){
        new Promise(function(resolve, reject) {
          database.query(element, function (error,response) {
              resolve(response);
          });
        }).then((res) => {alreadyStart(res)});
      }
    });
  }
  

  userLogin(res,system,ip, username = undefined,userpassword = undefined){
    let DATABASE = this.DATABASE;

    if(username && userpassword) standardLogin();
    else ipLogin(ip);

    function standardLogin(){
      Query(`SELECT username FROM users WHERE username LIKE '${username}' AND userpassword LIKE '${userpassword}'`);
    }

    function ipLogin(ip){ // vou alterar o nome qnd a criatividade ajudar
      Query(`SELECT username FROM users WHERE ip like SHA1("${ip}");`);
    }

    function alreadyStart(user){
      try{
        let str = user[0] ? `user logged:${user[0].username}` : "incorrect credentials"
        res.write(str);
        res.end();
        system.userLogged(str);
      } catch {;}
    }


    function Query(sql_string){
      new Promise(function(resolve, reject) {
         DATABASE.query(sql_string, function (error,response) {
            resolve(response);
        });
      }).then((res) => {alreadyStart(res)});
    }
  }
}







