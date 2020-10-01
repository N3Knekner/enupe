

module.exports = class UserManager{

  newUser(username,userpassword,email,ip,stayConnected){
    let table = "users";
    let rows = [['username'],['userpassword'],['email'],['ip'],['stayConnected']];
    let values =  [[`"${username}"`],[`"${userpassword}"`],[`"${email}"`],[`"${ip}"`],[stayConnected]];

    let query = [[table],[rows],[values]];

    return query;
  }

  verifyUser(username,email){
    let sql_string = [`SELECT username FROM users WHERE username LIKE '${username}'`];
    sql_string[1] = `SELECT email FROM users WHERE  email LIKE '${email}'`;

    sql_string.forEach(element => {

      Query(this.DATABASE);

      function already(response){
        try{
         if(response[0].username){
           console.log(`User already exists`); //interagir com o front end
          }
          else if(response[0].email){
            console.log(`Email already exists`); //interagir com o front end
          }
          else{
            console.log("Error"); //interagir com o front end
          } 
        }
        catch{;}
      }

      function Query(database){
        new Promise(function(resolve, reject) {
          database.query(element, function (error,response) {
              resolve(response);
            });
        }).then((res) => {already(res)});
      }
    });
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


}





