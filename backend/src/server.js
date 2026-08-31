import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/products.js";
import listingRoutes from "./routes/listings.js";
import notificationRoutes from "./routes/notifications.js";
import repairRoutes from "./routes/repairs.js";
import adminRoutes from "./routes/admin.js";
import engagementRoutes from "./routes/engagement.js";
import providerRoutes from "./routes/providers.js";
import { seedDemoData } from "./seed.js";

const app=express(); const PORT=process.env.PORT||5000;
app.use(cors({origin:process.env.CLIENT_URL||"http://localhost:5173"}));
app.use(express.json({limit:"12mb"}));
app.get('/api/health',(req,res)=>res.json({ok:true,service:'ReLoop API',time:new Date().toISOString()}));
app.use('/api/auth',authRoutes); app.use('/api/products',productRoutes); app.use('/api/listings',listingRoutes); app.use('/api/notifications',notificationRoutes); app.use('/api/repairs',repairRoutes); app.use('/api/providers',providerRoutes); app.use('/api/admin',adminRoutes); app.use('/api',engagementRoutes);
app.use('/api',(req,res)=>res.status(404).json({message:'Not found.'}));
app.use((err,req,res,next)=>{console.error(err);res.status(err.status||500).json({message:err.message||'Internal server error.'});});

if(!process.env.JWT_SECRET){console.error('Missing JWT_SECRET in .env — set one before starting the server.');process.exit(1);}
connectDB().then(seedDemoData).then(()=>app.listen(PORT,()=>console.log(`ReLoop API running on http://localhost:${PORT}`))).catch(e=>{console.error('Server startup failed:',e.message);process.exit(1);});
