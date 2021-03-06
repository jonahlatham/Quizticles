create table genre (
    id serial primary key,
    genre varchar,
    date_added TIMESTAMP,
    is_active BOOLEAN
)

create table question_type (
    id serial primary key,
    genre varchar,
    date_added TIMESTAMP,
    is_active BOOLEAN
)

create table people (
    id serial primary key,
    first_name varchar,
    last_name varchar,
    email varchar,
    password varchar
)

create table quiz (
    id serial primary key,
    name varchar,
    genre_id int,
    is_private BOOLEAN,
    date_created TIMESTAMP,
    date_updated timestamp,
    creator_id int,
    foreign key(creator_id) REFERENCES people(id),
    foreign key(genre_id) REFERENCES genre(id)
) 

create table question (
    id serial primary key,
    question varchar,
    question_type_id int,
    quiz_id int,
    date_created TIMESTAMP,
    date_updated TIMESTAMP,
    FOREIGN key(question_type_id) REFERENCES question_type(id),
    FOREIGN key(quiz_id) REFERENCES quiz(id)
)

create table answer (
    id serial primary key,
    answer varchar,
    is_correct BOOLEAN,
    question_id int,
    date_created timestamp,
    date_updated TIMESTAMP,
    foreign key(question_id) REFERENCES question(id)
)

create table submitted_answer (
    id serial primary key,
    quiz_id int,
    question_id int,
    answer_id int,
    people_id int,
    selected_correct BOOLEAN,
    date_created TIMESTAMP,
    foreign key(answer_id) REFERENCES answer(id),
    foreign key(people_id) REFERENCES people(id),
    foreign key(question_id) REFERENCES question(id),
    foreign key(quiz_id) REFERENCES quiz(id)
)