const { DATABASE, hashGenerator } = require("./System.class");
const sha256 = require("sha256");

module.exports = class UserManager{

  signin(res, username, userpassword, email, matricula,type,ip){
    if(username && userpassword && email){
      let hash = this.hashGenerator(type);
      let hashcode = sha256(hash + ip);

      res.send({correct:`${hash}`});

      let table = "users";
      let rows = [['username'],['userpassword'],['email'],['matricula'],['type_u'],['hashcode']];
      let values =  [[`"${username}"`],[`"${sha256(userpassword)}"`],[`"${email}"`],[`"${matricula}"`],[`${type}`],[`"${hashcode}"`]];
      this.sqlInsertion([[table],[rows],[values]]);
    }
  }
  
  login(res, system, ip,user,userpassword){
    let DATABASE = this.DATABASE;
    
    Query(`SELECT username,email,type_u FROM users WHERE (username LIKE '${user}' OR email LIKE '${user}') AND userpassword LIKE '${sha256(userpassword)}'`);
  
    function callback(user){
      try{
        if(user[0]){
          let hash = system.hashGenerator(user[0].type_u);
          let hashcode = sha256(hash + ip);
          res.send({correct:`${hash}`, incorrect:[false,false]});
          Query(`UPDATE users SET hashcode = '${hashcode}' WHERE username LIKE '${user[0].username}' AND email LIKE '${user[0].email}'`,true);
        }
        else res.send({correct:false, incorrect:[false,true]});

      } catch(err){;}
    }

    function Query(sql_string,update=false){
      new Promise(function(resolve, reject) {
         DATABASE.query(sql_string, function (error,response) {
            resolve(response);
        });
      }).then((res) => {update ? "" : callback(res)});
    }
  }

  hashLogin(res,hash,ip){
    let DATABASE = this.DATABASE;
    Query(`SELECT username,email,matricula FROM users WHERE hashcode like "${sha256(hash + ip)}";`);

    function callback(user){
      try{
        if(user[0] != undefined){
          let obj = {username:`${user[0].username}`, email:`${user[0].email}`, matricula:`${user[0].matricula}`};
          res.send(obj);
        }
        else res.send({correct:false});
      } catch (err){;}
    }

    function Query(sql_string){
      new Promise(function(resolve, reject) {
         DATABASE.query(sql_string, function (error,response) {
            resolve(response);
        });
      }).then((res) => {callback(res)});
    }
  }

  verifyUserIdentity(res, username = "", email = ""){
    let isExists = [false,""];

    let sql_string = [`SELECT username FROM users WHERE username LIKE '${username}'`,`SELECT email FROM users WHERE email LIKE "${email}"`];
    
    sql_string.forEach((element,index) => {
      Query(this.DATABASE,element,index);
    });

    function callback(response,index){
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
      }).then((res) => {callback(res,index);});
    }
  }

  verifyMatricula(res,matricula){
    let DATABASE = this.DATABASE;

    Query(`SELECT matricula FROM users WHERE matricula LIKE '${matricula}'`);

    function callback(matricula){
      try{
       matricula[0] ? res.send({exists:true}) : res.send({exists:false});
      } catch(err) {console.log(err)}
    }

    function Query(sql_string){
      new Promise(function(resolve, reject) {
         DATABASE.query(sql_string, function (error,response) {
            resolve(response);
        });
      }).then((res) => {callback(res)});
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

  authenticateServicer(matricula){
    let DATABASE = this.DATABASE;
    Query(`SELECT matricula,type_u FROM users WHERE matricula LIKE '${matricula}'`);
  
    function callback(user){
      try{
        if(user[0] != undefined){
          if(user[0].type_u == 2){
            Query(`UPDATE users SET type_u = 3 WHERE matricula = ${user[0].matricula}`);
            res.send({correct:true});
          }
          else {
            res.send({correct:false});
          }
        }
      } catch(err){;}
    }

    function Query(sql_string){
      new Promise(function(resolve, reject) {
         DATABASE.query(sql_string, function (error,response) {
            resolve(response);
        });
      }).then((res) => {callback(res)});
    }
  }

  async SignInOff(matricula,userpassword){
    let DATABASE = this.DATABASE;
  
    return await Query(`SELECT type_u FROM users WHERE matricula LIKE '${matricula}' AND userpassword LIKE '${sha256(userpassword)}'`);
  
    function callback(user){
      if(user[0] != undefined){
        Query(`DELETE FROM users WHERE id = ${user[0].id}`);
        return "User deleted";
      }
      else{
        return "SignInOff blocked";
      }
    }

    async function Query(sql_string){
      return await new Promise(function(resolve, reject) {
        DATABASE.query(sql_string, function (error,response) {resolve(response);});
      }).then((res) => {return callback(res)});
    }

  }

  

  //TESTE FUNCTION pros integrantes do grupo.
  NOME_DA_FUNCAO_DO_SISTEMA(p1,p2){
    p1+p2;
    return "RETORNO ESPERADO";
  }



}







