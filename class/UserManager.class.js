const { DATABASE, hashGenerator } = require("./System.class");
const sha256 = require("sha256");

module.exports = class UserManager{

  newUser(res, username, userpassword, email, matricula,type,ip){
    if(username && userpassword && email){
      let hash = this.hashGenerator(type);
      let hashcode = sha256(hash += ip);

      res.send({correct:`"${hash}"`});

      let table = "users";
      let rows = [['username'],['userpassword'],['email'],['matricula'],['type_u'],['hashcode']];
      let values =  [[`"${username}"`],[`"${sha256(userpassword)}"`],[`"${email}"`],[`"${matricula}"`],[`${type}`],[`"${hashcode}"`]];
      this.sqlInsertion([[table],[rows],[values]]);
    }
  }
  
  userLogin(res, system, ip,user,userpassword){
    let DATABASE = this.DATABASE;
    
    Query(`SELECT username,email,type_u FROM users WHERE (username LIKE '${user}' OR email LIKE '${user}') AND userpassword LIKE '${sha256(userpassword)}'`);
  
    function alreadyStart(user){
      try{
        if(user[0]){
          let hash = system.hashGenerator(user[0].type_u);
          let hashcode = sha256(hash + ip);
          res.send({correct:`"${hash}"`, incorrect:[false,false]});
          Query(`UPDATE users SET hashcode = '${hashcode}' WHERE username LIKE '${user[0].username}' AND email LIKE '${user[0].email}'`,true);
        }
        else res.send({correct:false, incorrect:[false,true]});

      } catch{}
    }

    function Query(sql_string,update=false){
      new Promise(function(resolve, reject) {
         DATABASE.query(sql_string, function (error,response) {
            resolve(response);
        });
      }).then((res) => {update ? "" : alreadyStart(res)});
    }
  }

  hashLogin(res,hash,ip){
    let DATABASE = this.DATABASE;
    
    Query(`SELECT username,email,matricula FROM users WHERE hashcode like "${sha256(hash + ip)}";`);

    function alreadyStart(user){
      try{
        let obj = user[0] ? {username:`${user[0].username}`, email:`${user[0].email}`, matricula:`${user[0].matricula}`} : {correct:false};
        res.send(obj);
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

  verifyUserIdentity(res, username = "", email = ""){
    let isExists = [false,""];

    let sql_string = [`SELECT username FROM users WHERE username LIKE '${username}'`,`SELECT email FROM users WHERE email LIKE "${email}"`];
    
    sql_string.forEach((element,index) => {
      Query(this.DATABASE,element,index);
    });

    function alreadyStart(response,index){
      try{
        if(response[0].username)
        isExists[0] ? isExists : isExists = [true,"username"];
        else(response[0].email)
        isExists[0] ? isExists : isExists = [true,"email"];

      } catch(err){;}

      if(index == 1)
        res.send({exists:isExists});
    }

    function Query(database,element,index){
      new Promise(function(resolve) {
        database.query(element, function (error,response) {
            resolve(response);
        });
      }).then((res) => {alreadyStart(res,index);});
    }
  }

  verifyMatricula(res,matricula){
    let DATABASE = this.DATABASE;

    Query(`SELECT matricula FROM users WHERE matricula LIKE '${matricula}'`);

    function alreadyStart(matricula){
      try{
       matricula[0] ? res.send({exists:true}) : res.send({exists:false});
      } catch(err) {console.log(err)}
    }

    function Query(sql_string){
      new Promise(function(resolve, reject) {
         DATABASE.query(sql_string, function (error,response) {
            resolve(response);
        });
      }).then((res) => {alreadyStart(res)});
    }
  }

  hashGenerator(type){
    let number = Math.ceil(Math.random() * 1000000);
    let randomized = sha256(number+randomString());
    let hash = insertType(randomized);

    return hash;

    function insertType(randomized){
      let half = randomized.length/2;
      let hash = randomized.substr(0,half) + type + randomized.substr(half);
      return hash;
    }

    function randomString(){
      let letters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o'];
      let length = letters.length;
      let string = "";

      letters.forEach((element) => {
        string += letters[Math.round(Math.random()*(length - 1))];
      });
      return string;
    }
  }

}







