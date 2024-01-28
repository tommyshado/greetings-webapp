create table greetings (
    id Serial Primary Key,
    name Text Not Null Unique,
    count Int Not Null
);