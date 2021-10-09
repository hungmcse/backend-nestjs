CREATE SCHEMA IF NOT EXISTS db;
CREATE TABLE DB.user (
    username       varchar(100) not null constraint user_pk primary key,
    password       varchar(256) not null,
    created_date   timestamp default now(),
    updated_date   timestamp,
    deleted        boolean
);