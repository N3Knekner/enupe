create database if not exists ENUPE_BD;
USE ENUPE_BD;

CREATE TABLE IF NOT EXISTS users (
	id int AUTO_INCREMENT PRIMARY KEY,
    username varchar(80) not null,
    userpassword varchar(80) not null,
    email varchar(80) not null,
    matricula varchar(10) not null,
    hashcode varchar(80),
    type_u int not null
);

insert into users(username,userpassword,email,matricula,hashcode,type_u) values ("evandro","e9faa739268aa9688440153d34a44df4ea1d87fe0efa396b8f7135056c9314bc","evandrosocrepa@gmail.com","123456789","",1);

select * from users;

delete from users where id = 2;







