"use server"

import { revalidatePath } from "next/cache";
import User from "../models/userModel";
import { connectToDb } from "../validations/mongoose";
interface Params {
  userId: string;
  username: string;
  name: string;
  bio: string;
  image: string;
  path: string;
}

export async function updateUser({
  userId,
  bio,
  name,
  path,
  username,
  image,
}: Params): Promise<void> {
  try {
    connectToDb().then(async () => {
      console.log('____aya');
      await User.findOneAndUpdate(
        { id: userId },
        {
          username: username.toLowerCase(),
          name,
          bio,
          image,
          onboarded: true,
        },
        { upsert: true }
      );
      //TODO
      if (path === "/profile/edit") {
        revalidatePath(path);
      }

    });


  } catch (error: any) {
    throw new Error(`Failed to create/update user: ${error.message}`);
  }
}
export async function fetchUser(userid: String) {
  try {
    connectToDb();
   return await User.findOne({ id: userid });
  } catch (e){
    console.log(`___userfetch error ${e}`);

  }

}