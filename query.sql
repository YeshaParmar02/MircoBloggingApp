show databases;
show tables;
create database bloggingapp;
use bloggingapp;

create table Users (
	Id varchar(20),
    Name varchar(20),
    Password varchar(10),
    Email varchar(20),
    Country varchar(10),
    primary key(Id)
);

create table Posts (
Id varchar(20),
Title varchar(20),
Content varchar(200),
Create_Time datetime default current_timestamp,
User_Id varchar(20),
primary key(Id),
foreign key (User_Id) references Users(Id)
);

alter table Posts add constraint CK_Content CHECK ( length(Content) <=200);

create table Comments (
Id varchar(20),
Content varchar(20),
Create_Time datetime default current_timestamp,
User_Id varchar(20),
Post_Id varchar(20),
primary key(Id),
foreign key (User_Id) references Users(Id),
foreign key (Post_Id) references Posts(Id)
); 

alter table Comments add constraint CK_Comment_length CHECK ( length(Content) <=100);

select * from Users;
