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
export async function fetchThread(pageNumber = 1, pageSize = 20) {
    try {
        connectToDb();
        const skipsAmount = (pageNumber - 1) * pageSize;
        const threads = Thread.find({
            parentId: { $in: [null, undefined] }
        }).sort({ created: 'desc' }).skip(skipsAmount).limit(pageSize).populate({
            path: 'author',
            model: User
        }).populate({
            path: 'children', populate: {
                path: 'author',
                model: User
                , select: "_id name parentId image"
            }
        })
        const totalPostCount = await Thread.countDocuments({
            parentId: { $in: [null, undefined] }

        })
        const posts = await threads.exec();
        const isNext = totalPostCount > skipsAmount + posts.length;
        return { posts, isNext };
    } catch (e) {
        console.log(`error aya $e`);
    }
}