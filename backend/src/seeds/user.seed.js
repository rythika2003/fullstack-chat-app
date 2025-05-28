import {config} from "dotenv";
import  {connectDB} from "../lib/db.js";
import User from "../models/user.model.js";

config();

const seedUsers= [
//female users

 {
    fullName: "Emma Johnson",
    email: "emma.johnson@example.com",
    password: "123456",
    profilePic: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?cs=srgb&dl=pexels-olly-733872.jpg&fm=jpg"
  },
  {
    fullName: "Olivia Smith",
    email: "olivia.smith@example.com",
    password: "123456",
    profilePic: "https://st.depositphotos.com/1030327/2363/i/450/depositphotos_23636285-stock-photo-portrait-of-young-beautiful-woman.jpg"
  },
  {
    fullName: "Ava Williams",
    email: "ava.williams@example.com",
    password: "123456",
    profilePic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCmBt-bSVFpxA6b59hZanaUPVqKqMI2GcumJ8y8tN2GssFiyIMsLdbli-PTOjX3gSFADs&usqp=CAU"
  },
  {
    fullName: "Sophia Brown",
    email: "sophia.brown@example.com",
    password: "123456",
    profilePic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeL3QBceEErEMZ8IJ-KkodcCyuDHVcePEI54M8tR5nEQ-YKwsvthDPnXOa86atLPFVw50&usqp=CAU"
  },
  {
    fullName: "Isabella Davis",
    email: "isabella.davis@example.com",
    password: "123456",
    profilePic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmp8zwWjNc2_teUcPaReDcyBxyrjLdUn-cfHgN-z7FvHCnVwoYHhEnIAlWyhMYAfLRd4w&usqp=CAU"
  },

  // Male users
  {
    fullName: "Liam Miller",
    email: "liam.miller@example.com",
    password: "123456",
    profilePic: "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?cs=srgb&dl=pexels-nkhajotia-1516680.jpg&fm=jpg"
  },
  {
    fullName: "Noah Wilson",
    email: "noah.wilson@example.com",
    password: "1234563",
    profilePic: "https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    fullName: "Elijah Moore",
    email: "elijah.moore@example.com",
    password: "123456",
    profilePic: "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    fullName: "James Taylor",
    email: "james.taylor@example.com",
    password: "123456",
    profilePic: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=600"
  },
  {
    fullName: "Benjamin Anderson",
    email: "benjamin.anderson@example.com",
    password: "123456",
    profilePic: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=600"
  }

];


const seedDatabase = async () => {
    try {
        await connectDB();

        await User.insertMany(seedUsers);
        console.log("Database seeded successfully");
    } catch (error) {
        console.error("Error seeding database:", error);
    }
};
//call the function
seedDatabase();