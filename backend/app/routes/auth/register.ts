import express from "express";
const register = express.Router();
import sql from "../../services/sql";
import bcrypt from "bcrypt";

register.post("/", async (req, res) => {
    const { username, password } = req.body;
    // check if username and password are provided
    if (!username || !password) {
        return res.status(400).json({ error: "Username and password required" });
    }

    // check in database for user with same username
    const user = await sql`SELECT * FROM public.users WHERE username = ${username}`;
    // if user exists, return error
    if (user.length > 0) {
        console.log(user)
        return res.status(400).json({ error: "Username already exists" });
    }

    // hash password
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({ error: "Internal server error" });
        }
        // insert user into database
        sql`INSERT INTO public.users (username, password) VALUES (${username}, ${hash})`
            .then(() => {
                return res.status(200).json({ success: "User created" });
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json({ error: "Internal server error" });
            });
    })
});

export default register;