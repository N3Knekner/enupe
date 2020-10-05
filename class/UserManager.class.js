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

  verifyUserIdentity(res,username = "",email = ""){
    let sql_string = [`SELECT username FROM users WHERE username LIKE '${username}'`];
    sql_string[1] = `SELECT email FROM users WHERE email LIKE '${email}'`;

    sql_string.forEach(element => {

      Query(this.DATABASE);

      function alreadyStart(response){
        try{
         if(response[0].username){
            res.send({exists:true});
          }
          else if(response[0].email){
            res.send({exists:true});
          }
          else{
            res.send({exists:false});
          } 
        } catch(err){}
      }
    
      function Query(database){
        new Promise(function(resolve) {
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
        let str = {correct:"AQUELE HASH LÁ IGUAL DA APAD", incorrect:[false,false]};
        res.send(str);
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







