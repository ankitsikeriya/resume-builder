import express from 'express'
import cors from 'cors'
import 'dotenv/config' 
import { connectDB } from './config/db.js'; 
import userRouter from './routes/userRouter.js'; 
import resumeRouter from './routes/resumeRouter.js';
 
import path from 'path';
import { fileURLToPath } from 'url'; 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
// Serve static files from the 'uploads' directory
app.use('/api/resume', resumeRouter);
//Route to serve uploaded files
app.use(
    '/uploads',
     express.static(path.join(__dirname, 'uploads'),{
        setHeaders: (res, _path) => {
            res.set('Access-Control-Allow-Origin', 'http://localhost:5173'); // Set content disposition to inline
        }
     }));
// Test route
app.get('/',(req,res)=>{
    res.send("API working");
})
app.listen(PORT,()=>{
    console.log("server started on" ,PORT)
})
