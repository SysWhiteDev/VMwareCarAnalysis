// src/index.js
import 'dotenv/config';
import express from 'express';
import {log} from './utils/utils';
import redis from './services/redis';
console.log(redis);

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send(`EVver2 running`);
});

app.listen(process.env.PORT, () => {
    log(`Server is running at http://localhost:${process.env.PORT || 8069}`, "info");
    if (process.env.NODE_ENV === "production") {
        log("Production mode", "info");
    }
    else {
        log("Development mode", "warn");
    }
});