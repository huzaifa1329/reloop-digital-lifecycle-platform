import { Router } from "express";
import Notification from "../models/Notification.js";
import { auth } from "../middleware/auth.js";
const router = Router();
router.get("/", auth, async (req,res)=>{ try { res.json(await Notification.find({userId:req.user.id}).sort({createdAt:-1}).limit(100)); } catch(e){res.status(500).json({message:e.message});} });
router.patch("/:id/read", auth, async (req,res)=>{ try { const n=await Notification.findOneAndUpdate({_id:req.params.id,userId:req.user.id},{isRead:true},{new:true}); if(!n)return res.status(404).json({message:"Notification not found."}); res.json(n);}catch(e){res.status(500).json({message:e.message});} });
router.patch("/read-all", auth, async(req,res)=>{try{await Notification.updateMany({userId:req.user.id,isRead:false},{isRead:true});res.json({message:"All notifications marked as read."});}catch(e){res.status(500).json({message:e.message});}});
export default router;
