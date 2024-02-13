import express from "express";
const login = express.Router();
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sql from "../../services/sql";
import {registerActivity} from "../../utils/utils";

login.post("/", async (req, res) => {
    const { username, password } = req.body;
    // check if username and password are provided
    if (!username || !password) {
        return res.status(400).json({ error: "Username and password required" });
    }
    // check in database for user with same username
    const user = await sql`SELECT * FROM public.users WHERE username = ${username}`;
    // if user does not exist, return error
    if (user.length === 0) {
        return res.status(400).json({ error: "Username or password incorrect" });
    }
    // check if password matches
    bcrypt.compare(password, user[0].password, async (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Internal server error" });
        }
        // if password does not match, return error
        if (!result) {
            return res.status(400).json({ error: "Username or password incorrect" });
        }
        // if password matches, create token
        const token = jwt.sign({ id: user[0].id }, process.env.JWT_SECRET as string, { expiresIn: "1h" });

        // expire all tokens for user
        await sql`UPDATE public.tokens SET status = 0 WHERE user_id = ${user[0].id}`;
        // put token in sql table
        await sql`INSERT INTO public.tokens (token, user_id, status) VALUES (${token}, ${user[0].id}, 1)`
            .catch((err) => {
            console.log(err);
            return res.status(500).json({ error: "Internal server error" });
        });
        await registerActivity(user[0].id, "User logged in", 1)
        // return token
        return res.status(200).json({ token });
    });
});
export default login;