# Fullstack Application Test Task

This project is a fullstack application built using Node.js, PostgreSQL, and React.js. The backend of the application is developed using Express.js to handle REST API requests and provide a well-structured API management system. Sequelize is used to interact with the PostgreSQL database and execute database operations.

On the frontend, the application utilizes React.js along with the Vite package bundler. A free and open-source React Redux [![dashboard template]](https://github.com/codedthemes/mantis-free-react-admin-template) is chosen as the foundation for the user interface. The main feature implemented in the frontend is an infinite loading table with pagination using [![ag-grid]](https://www.ag-grid.com/) models.

### Main tasks

- Create a database in DBMS Postgres with two tables. Link the tables by the foreign key field. Each table must have a key field and other fields like NUMERIC, VARCHAR, DATE, INTEGER. The database and table names are optional and filled with random data. The creation of the database and its filling with the initial data should be written in SQL language in the form of a script and placed in a separate file init-db.sql in the root folder of the project.
- Create server side using NodeJS. Connect to the created database using pg-promise or sequalize. If you use sequelize write some functions (methods) of working with data in SQL (use seq.query() method). 
To implement partial data loading (pagination, infinite loading) use SQL language operators limit and offset. Write routers using REST API architecture style. Implement basic operations: creating, receiving, changing and deleting. Server part should include folders: models (/models), controllers (/controllers), routers (/routes).
- The appearance is designed as a Dashboard with a side menu of several random items. Over the linked table place running buttons: Add a record, Change, Delete. When adding/modifying a record take into account connection with the main table in the foreign key field. Use infinite loading in the main table (use AgGrid Infinite Row Model). It is necessary to implement partial loading of records from the server (use SQL limit and offset language operators). When designing the Dashboard, use one of the modern open-sourse examples.

#### Download

- [Download from GitHub](https://github.com/5vver/Fullstack-app-test-task.git)

## Installation

```
git clone https://github.com/5vver/Fullstack-app-test-task.git
cd server
change .env.example file into .env
npm install
npm run dev

cd ..
cd client
change .env.example file into .env
npm install
npm run dev
```