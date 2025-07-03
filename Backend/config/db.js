import mongoose from "mongoose";
export const connectDB= async()=>{
    await mongoose.connect('mongodb+srv://flowagentic:njUnWuHMgVO9zeNL@cluster0.3i9bjna.mongodb.net/RESUME')
    .then(()=>console.log("DB Connected"))
}