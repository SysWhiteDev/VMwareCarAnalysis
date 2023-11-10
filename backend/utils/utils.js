import db from "./db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const utils = {
    db,
    bcrypt,
    jwt
}

export default utils;