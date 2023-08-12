"use server"

import { revalidatePath } from "next/cache";
import Thread from "../models/threadsModel";
import User from "../models/userModel";
import { connectToDb } from "../validations/mongoose";

interface Params {
    text: string, author: string,
    communityId: string | null,
    //
    path: string

}
export async function createThread({ text, author, communityId, path }: Params) {
    try {
        connectToDb();
        console.log(`textthreads njfdas`);

        const createThread = await Thread.create({
            text, author, community: null
        });
        await User.findByIdAndUpdate(author, {
            $push: { threads: createThread._id }
        })

        revalidatePath(path);
    } catch (e) {
        console.log(e);
    }

}