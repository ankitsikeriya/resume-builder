import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { connectDB } from './config/db.js';
import userRouter from './routes/userRouter.js';

const app = express();
const PORT =  4000;

app.use(cors())
//connect DB
connectDB();
// Middleware to parse JSON
app.use(express.json())

// Import user routes

// Use user routes
app.use('/api/auth', userRouter);
// Test route
app.get('/',(req,res)=>{
    res.send("API working");
})
app.listen(PORT,()=>{
    console.log("server started on" ,PORT)
})
