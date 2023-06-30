create database blog_db;

use blog_db;

create table user (
    id integer primary key auto_increment,
    firstName varchar(20),
    lastName varchar(20),
    email varchar(50),
    password varchar(100),
    phone varchar(15)
    profileImage varchar(100)
);

create table blogDetails (
    id integer primary key auto_increment,
    title varchar(100),
    content varchar(1024),
    userId integer,
    status int(1) default 0,
    createdDate timestamp default CURRENT_TIMESTAMP
);