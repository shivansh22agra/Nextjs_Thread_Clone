import mongoose, { mongo } from "mongoose";
let isConnected = false;
export const connectToDb = async () => {
  mongoose.set('strictQuery', true);

  if (isConnected) {
    console.log('already connected to Mongoose');
  }
  try {
    console.log('come here');
    await mongoose.connect("mongodb+srv://agrawalshivansh22:NedHgaQsfyrYM1b9@cluster0.qqm2ohe.mongodb.net/?retryWrites=true&w=majority");
    isConnected = true;

  } catch (e) {
    console.log(e);

  };
}
