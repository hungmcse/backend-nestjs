CREATE TABLE DB.video (
    id uuid        default gen_random_uuid() not null constraint video_pk primary key,
    url            text not null,
    author         varchar(256) not null constraint author_id_fk references DB.user(username),
    source         varchar(256) not null,
    created_date   timestamp default now(),
    updated_date   timestamp,
    deleted        boolean
);