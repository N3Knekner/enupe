const { DATABASE, hashGenerator } = require("./System.class");
const sha256 = require("sha256");
const MySQLController = require("./MySQLController.class.js");

module.exports = class UserManager extends MySQLController{

  //===== Queries =====//
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
  
  async login(res, ip,user,userpassword){
    
    const response = await this.Query(`SELECT username,email,type_u FROM users WHERE (username LIKE '${user}' OR email LIKE '${user}') AND userpassword LIKE '${sha256(userpassword)}'`, 
      async (user)=>{
        try {
          if (user[0]) {
            let hash = this.hashGenerator(user[0].type_u);
            let hashcode = sha256(hash + ip);
            await this.Query(`UPDATE users SET hashcode = '${hashcode}' WHERE username LIKE '${user[0].username}' AND email LIKE '${user[0].email}'`);
            return { correct: `${hash}`, incorrect: [false, false] };
          }
          else return { correct: false, incorrect: [false, true] };

        } catch (err) { console.log(err); }
      }
    );
    res.send(response);
  }

  hashLogin(res,hash,ip){
    this.Query(`SELECT username,email,matricula FROM users WHERE hashcode like "${sha256(hash + ip)}";`, 
    async (user) => {
      try{
        if(user[0] != undefined){
          let obj = {username:user[0].username, email:user[0].email, matricula:user[0].matricula};
          res.send(obj);
        }
        else res.send({correct:false});
      } catch (err) { res.send({ correct: false });}
      }
    );
  }

  async verifyUserIdentity(res, username = "", email = ""){
    let isExists = [false,""];
    let sql_string = [`SELECT username FROM users WHERE username LIKE '${username}'`,`SELECT email FROM users WHERE email LIKE "${email}"`];

    for (let i = 0; i < sql_string.length; i++){

      isExists = await this.Query(sql_string[i], callback);

      if (i === sql_string.length - 1 || isExists[0]) {
        await res.send({ exists: isExists });
        break;
      }
    };

    function callback(response){
      try{
        if(response[0].username)
        return [true,"username"];
        else if(response[0].email)
        return [true,"email"];
        else return[false, ""];
      } catch (err) { return [false, ""];}
    }
  }

  verifyMatricula(res,matricula){

    this.Query(`SELECT matricula FROM users WHERE matricula LIKE '${matricula}'`, callback);

    function callback(matricula){
      try{
       matricula[0] ? res.send({exists:true}) : res.send({exists:false});
      } catch{}
    }
  }

  
  authenticateServicer(matricula){
    this.Query(`SELECT matricula,type_u FROM users WHERE matricula LIKE '${matricula}'`, 
    async (user) => {
      try{
        if(user[0] != undefined){
          if(user[0].type_u == 2){
            this.Query(`UPDATE users SET type_u = 3 WHERE matricula = ${user[0].matricula}`);
            res.send({correct:true});
          }
          else {
            res.send({correct:false});
          }
        }
      } catch(err){;}
    }
  );
    
  }
  
  async SignInOff(matricula,userpassword){
    return await this.Query(`SELECT id FROM users WHERE matricula LIKE '${matricula}' AND userpassword LIKE '${sha256(userpassword)}'`, 
      async (user) => {
        if(user[0] != undefined){
          this.Query(`DELETE FROM users WHERE id = ${user[0].id}`);
          return "User deleted";
        }
        else{
          return "SignInOff blocked";
        }
      }
    );  
  }

  async keyRecovery(user){
    const found = await this.Query(`SELECT email FROM users WHERE email like "${user}" or username like "${user}";`, 
    (email) => {
      try{
        if(email[0] != undefined){
          return email[0];
        }else return false;
      } catch(err){ return false;};
      }
    );
    
    if (!found) return {incorrect: true}

    const hash = this.hashGenerator(5);
    const update = await this.Query(`UPDATE users SET hashcode = '${hash}' WHERE email LIKE '${found.email}'`);

    const subject = "ENUPE - Recuperação de Senha";
    const txt = `Para recuperar sua senha clique no link: http://localhost:3000/equipe4/updatePassword?hash=${hash}\nSe não foi você, fique atento a segurança de sua conta.`;

    this.senderMail(this.mailConstructor(found.email, subject, txt));
  }

  async updateKey(res,obj){
    this.Query(`SELECT id FROM users WHERE hashcode like '${obj.hash}'`, // só pra dar seguranca no code tipo verificacao de duas etapas
      async (user) => {
        try{
          console.log(user[0]);
          if(user[0] != undefined){
            this.Query(`UPDATE users SET userpassword = "${sha256(obj.password)}" WHERE id = ${user[0].id}`);
            res.send({correct:true});
          }
          else{
            res.send({correct:false});
          }
        }catch{
          res.send({correct:false});
        }
      }
    );
  }
  
  //===== Utils =====//
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
  
  //TESTE FUNCTION pros integrantes do grupo.
  NOME_DA_FUNCAO_DO_SISTEMA(p1,p2){
    p1+p2;
    return "RETORNO ESPERADO";
  }
  
  

}







