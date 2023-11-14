import sqlite3  from "sqlite3";

const db = new sqlite3.Database("./database.sqlite", (err) => {
    if (err) {
        console.log("[DB] Error connecting to database: ", err);
        return
    }

    console.log("[DB] Connected to database");
});

export default db;