import bcrypt from "bcryptjs";
import User from "./models/User.js";
import Product from "./models/Product.js";
import Listing from "./models/Listing.js";
import Notification from "./models/Notification.js";

export async function seedDemoData() {
  const password = await bcrypt.hash("password123", 12);
  const accounts = [
    { name:"Ahmed Khan", email:"ahmed@reloop.dev", role:"customer", emailVerified:true, verificationStatus:"Verified" },
    { name:"Usman Ali", email:"usman@reloop.dev", role:"repair_partner", emailVerified:true, verificationStatus:"Verified", businessName:"Usman Repair Lab", location:"Islamabad", categories:["Laptops","Phones"], ratingAverage:4.8, reviewCount:24 },
    { name:"Platform Admin", email:"admin@reloop.dev", role:"admin", emailVerified:true, verificationStatus:"Verified" },
  ];
  const users={};
  for(const a of accounts){let u=await User.findOne({email:a.email});if(!u){u=await User.create({...a,password});} users[a.role]=u;}
  const customer=users.customer;
  if(customer && await Product.countDocuments({ownerId:customer._id})===0){
    const p=await Product.create({ownerId:customer._id,name:"Dell XPS 15",brand:"Dell",model:"9530",category:"Laptops",purchaseDate:"2024-02-12",condition:"Excellent",estimatedValue:165000,serialNumber:"RL-DELL-001",notes:"Demo product for the ReLoop marketplace flow.",lifecycleStatus:"Active"});
    await Listing.create({sellerId:customer._id,productId:p._id,title:"Dell XPS 15 — ReLoop listing",name:p.name,brand:p.brand,model:p.model,category:p.category,condition:p.condition,health:92,price:145000,location:"Islamabad",status:"Active",verified:true});
    await Notification.create({userId:customer._id,title:"Welcome to ReLoop",message:"Your demo product passport is ready.",type:"info"});
  }
}
