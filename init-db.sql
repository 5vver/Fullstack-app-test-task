CREATE DATABASE BookStore

\connect BookStore

CREATE TABLE Authors (
    author_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    birth_date DATE NOT NULL,
    nationality VARCHAR(50)
)

CREATE TABLE Books (
    book_id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    publication_date DATE NOT NULL,
    pages INTEGER NOT NULL,
    price NUMERIC(5,2) NOT NULL,
    author_id INTEGER,
    FOREIGN KEY (author_id) REFERENCES Authors (author_id)
)

INSERT INTO Authors (name, birth_date, nationality)
VALUES ('Author1', '1970-01-01', 'American'), 
       ('Author2', '1980-02-02', 'British')

INSERT INTO Books (title, publication_date, pages, price, author_id)
VALUES ('Book1', '2000-01-01', 300, 15.99, 1), 
       ('Book2', '2005-02-02', 350, 20.99, 2)