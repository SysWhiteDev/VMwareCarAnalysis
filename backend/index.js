import Express from 'express';
import 'dotenv/config'
const app = Express();

// import middlewares
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
import authMiddleware from './middlewares/authMiddleware.js';

// auth routes
import authRoutes from './routes/auth/authRoutes.js';
app.use("/auth", authRoutes);
// data routes
import dataRoutes from './routes/data/dataRoutes.js';
app.use("/data", authMiddleware, dataRoutes);

app.listen(process.env.PORT, () => {
    console.log(`API LISTENING ON PORT: ${process.env.PORT}`)
});