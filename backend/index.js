import Express from 'express';
import cors from 'cors';
import 'dotenv/config'
const app = Express();



// import middlewares
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use(cors());

import authMiddleware from './middlewares/authMiddleware.js';
import viewersAuthMiddleware from './middlewares/viewerAuthMiddleware.js';
// auth routes
import authRoutes from './routes/auth/authRoutes.js';
app.use("/auth", authRoutes);
// viewers routes
import viewersAuthRoutes from './routes/viewers/viewersAuthRoutes.js';
app.use("/v", viewersAuthRoutes);


app.listen(process.env.PORT, () => {
    console.log(`API LISTENING ON PORT: ${process.env.PORT}`)
});