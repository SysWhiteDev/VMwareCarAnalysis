import sqlite3  from "sqlite3";

const db = new sqlite3.Database("./database.sqlite", (err) => {
    if (err) {
        console.log("Error connecting to database: ", err);
        return
    }

    console.log("Connected to database");
});

export default db;