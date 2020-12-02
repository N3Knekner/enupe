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

CREATE TABLE IF NOT EXISTS occurrence (
id int primary key auto_increment,
title varchar(30),
txt varchar(256),
gravity int,
_from varchar(10),
_to varchar(10),
_date date,
orig int
);

CREATE TABLE IF NOT EXISTS occurence_to_user(
id int primary key auto_increment,
orig int,
_user varchar(10)
);

CREATE TABLE IF NOT EXISTS meet (
id int primary key auto_increment,
title varchar(30),
txt varchar(256),
gravity int,
_from varchar(10),
_to varchar(10),
_date date
);

CREATE TABLE IF NOT EXISTS meet_to_user(
id int primary key auto_increment,
orig int,
_user varchar(10)
);
/*
insert into users(username,userpassword,email,matricula,hashcode,type_u) values ("jorge","e9faa739268aa9688440153d34a44df4ea1d87fe0efa396b8f7135056c9314bc","evandrosocrepa@gmail.com","123456789","",1);
insert into users(username,userpassword,email,matricula,hashcode,type_u) values ("genisvaldo","e9faa739268aa9688440153d34a44df4ea1d87fe0efa396b8f7135056c9314bc","evandrosocrepa@gmail.com","123456799","",1);
insert into users(username,userpassword,email,matricula,hashcode,type_u) values ("juninho","e9faa739268aa9688440153d34a44df4ea1d87fe0efa396b8f7135056c9314bc","evandrosocrepa@gmail.com","1234567","",1);
*/
select * from users;
select * from occurrence;
select * from occurence_to_user;





SELECT o.title,o.txt,o.gravity, o._from,o._to, o._date FROM occurrence o inner join occurence_to_user ou on o.id = ou.orig WHERE ou._user = '123456789'


