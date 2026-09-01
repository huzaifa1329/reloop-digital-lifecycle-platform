import bcrypt from "bcryptjs";
import User from "./models/User.js";
import Product from "./models/Product.js";
import Listing from "./models/Listing.js";
import Notification from "./models/Notification.js";

export async function seedDemoData() {
  try {
    const password = await bcrypt.hash("password123", 12);

    const accounts = [
      {
        name: "Ahmed Khan",
        email: "ahmed@reloop.dev",
        role: "customer",
        emailVerified: true,
        verificationStatus: "Verified",
      },
      {
        name: "Usman Ali",
        email: "usman@reloop.dev",
        role: "repair_partner",
        emailVerified: true,
        verificationStatus: "Verified",
        businessName: "Usman Repair Lab",
        location: "Islamabad",
        categories: ["Laptops", "Phones"],
        ratingAverage: 4.8,
        reviewCount: 24,
      },
      {
        name: "Platform Admin",
        email: "admin@reloop.dev",
        role: "admin",
        emailVerified: true,
        verificationStatus: "Verified",
      },
    ];

    const users = {};

    for (const account of accounts) {
      let user = await User.findOne({ email: account.email });

      if (!user) {
        user = await User.create({
          ...account,
          password,
        });
      }

      users[account.role] = user;
    }

    const customer = users.customer;

    if (!customer) {
      console.warn("Demo customer account could not be created/found.");
      return;
    }

    const existingProducts = await Product.countDocuments({
      ownerId: customer._id,
    });

    if (existingProducts === 0) {
      const product = await Product.create({
        ownerId: customer._id,
        name: "Dell XPS 15",
        brand: "Dell",
        model: "9530",
        category: "Laptops",
        purchaseDate: "2024-02-12",
        condition: "Excellent",
        estimatedValue: 165000,
        serialNumber: "RL-DELL-001",
        notes: "Demo product for the ReLoop marketplace flow.",
        lifecycleStatus: "Active",
      });

      await Listing.create({
        sellerId: customer._id,
        productId: product._id,
        title: "Dell XPS 15 — ReLoop listing",
        name: product.name,
        brand: product.brand,
        model: product.model,
        category: product.category,
        condition: product.condition,
        health: 92,
        price: 145000,
        location: "Islamabad",
        status: "Active",
        verified: true,
      });

      await Notification.create({
        userId: customer._id,
        title: "Welcome to ReLoop",
        message: "Your demo product passport is ready.",
        type: "info",
      });

      console.log("Demo product, listing and notification created.");
    }

    console.log("Demo data check completed.");
  } catch (error) {
    console.error("Demo data seeding failed:", error.message);
    throw error;
  }
}