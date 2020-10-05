const { DATABASE } = require("./System.class");
module.exports = class UserManager{

  newUser(username, userpassword, email, matricula,type){
    console.log("aaaaaaa");
    if(username && userpassword && email){
      let table = "users";
      let rows = [['username'],['userpassword'],['email'],['matricula'],['type_u']];
      let values =  [[`"${username}"`],[`"${userpassword}"`],[`"${email}"`],[`"${matricula}"`],[`${type}`]];
      this.sqlInsertion([[table],[rows],[values]]);
    }
  }

  verifyUserIdentity(res, username = "", email = ""){
    let isExists = [false,""];

    let sql_string = [`SELECT username FROM users WHERE username LIKE '${username}'`,`SELECT email FROM users WHERE email LIKE "${email}"`];
    
    sql_string.forEach((element,index) => {
      Query(this.DATABASE,element,index);
    });

    function alreadyStart(response,index){
      try{
        if(response.username)
          isExists = [true,"username"];
        else(response.email)
          isExists = [true,"email"];

      } catch(err){;}

      if(index == 1)
        res.send({exists:isExists});
    }

    function Query(database,element,index){
      new Promise(function(resolve) {
        database.query(element, function (error,response) {
            resolve(response);
        });
      }).then((res) => {alreadyStart(res[0],index);});
    }
  }
  
  userLogin(res,system,ip, user,userpassword){
    let DATABASE = this.DATABASE;

    if(user && userpassword) standardLogin();
    else ipLogin(ip);

    function standardLogin(){
      Query(`SELECT username FROM users WHERE (username LIKE '${user}' OR email LIKE '${user}') AND userpassword LIKE '${userpassword}'`);
    }

    function ipLogin(ip){ // vou alterar o nome qnd a criatividade ajudar
      Query(`SELECT username FROM users WHERE ip like SHA1("${ip}");`);
    }

    function alreadyStart(user){
      try{
        let str = user[0] ? {correct:"hash sahcwdoilcndil", incorrect:[false,false]}:{correct:false, incorrect:[false,true]};
        console.log(user[0]);
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

  verifyMatricula(res,matricula){
    let DATABASE = this.DATABASE;

    Query(`SELECT matricula FROM users WHERE (matricula LIKE '${matricula}'`);

    function alreadyStart(matricula){
      try{
        let str = matricula[0].matricula ? res.send({exists:true}) : res.send({exists:false});;
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







