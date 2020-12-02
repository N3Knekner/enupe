module.exports = class Ocurrence {
    constructor(DATABASE,title,txt,gravity,from,to,date,orig) {
        this.DATABASE = DATABASE;
        this.title = title;
        this.txt = txt;
        this.gravity = gravity;
        this.from = from;
        this.to = to; 
        this.date = date;
        this.orig = orig;
        
    }
    
    async get(res,matricula){
        let sql_string = `SELECT o.title,o.txt,o.gravity, o._from,o._to, o._date, o.orig FROM occurrence o inner join occurence_to_user ou on o.id = ou.orig WHERE ou._user = '${matricula}'`;
        let ocurrences = await this.DATABASE.Query(sql_string, callback);
        if(ocurrences) {
            let obj = [];
            for(let index = 0; index < ocurrences.length; index++) {
                obj[index] = new Ocurrence(this.DATABASE,ocurrences[index].title,ocurrences[index].txt,ocurrences[index].gravity,ocurrences[index]._from,ocurrences[index]._to,ocurrences[index]._date,ocurrences[index].orig);
            };
            console.log(obj);
            res.send(obj);
        }
    
        function callback(response){
          try{
            if(response)
            return response
            else return false;
          } catch (err) { return false;}
        }
    }
  
    async save(){
        let table = "occurrence";
        let rows = [['title'],['txt'],['gravity'],['_from'],['_to'],['_date'],['orig']];
        let values =  [[`"${this.title}"`],[`"${this.txt}"`],[`"${this.gravity}"`],[`"${this.from}"`],[`"${this.to}"`],[`"${this.date}"`],[this.orig]];
        this.DATABASE.sqlInsertion([[table],[rows],[values]]);
       
        let sql_string = `SELECT id FROM occurrence WHERE title = '${this.title}' and _from = '${this.from}'`;
        
        let id = await this.DATABASE.Query(sql_string, callback);
        if(id) {
            let table = "occurence_to_user";
            let rows = [['orig'],['_user']];
            for(let index = 0; index < this.to.length; index++){
              let x = [[id],[this.to[index]]];
              this.DATABASE.sqlInsertion([[table],[rows],[x]]);
            }
        }
        
        function callback(response){
          try{
            if(response[0].id)
            return response[0].id
            else return false;
          } catch (err) { return false;}
        }
    }
  }