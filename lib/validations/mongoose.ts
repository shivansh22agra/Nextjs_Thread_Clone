import mongoose, { mongo } from "mongoose";
let isConnected = false;
export const connectToDb = async () => {
  mongoose.set('strictQuery', true);

if(isConnected){
  console.log('already connected to Mongoose');
}
  try {
    await mongoose.connect("mongodb+srv://agrawalshivansh22:NedHgaQsfyrYM1b9cluster0.qqm2ohe.mongodb.net/");
    isConnected = true;

  } catch (e) {
    console.log(e);

  };
}
