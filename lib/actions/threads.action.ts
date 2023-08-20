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
} export async function fetchThreadById(threadId: string) {

    try {
        connectToDb();

        const thread = await Thread.findById(threadId)
            .populate({
                path: "author",
                model: User,
                select: "_id id name image",
            })
            .populate({
                path: "children",
                populate: [
                    {
                        path: "author",
                        model: User,
                        select: "_id id name parentId image",
                    },
                    {
                        path: "children",
                        model: Thread,
                        populate: {
                            path: "author",
                            model: User,
                            select: "_id id name parentId image",
                        },
                    },
                ],
            })
            .exec();

        return thread;
    } catch (err) {
        console.error("Error while fetching thread:", err);
        throw new Error("Unable to fetch thread");
    }
}
export async function addCommentToThread(
    threadId: string,
    commentText: string,
    userId: string,
    path: string
) {

    try {
        connectToDb();
        const originalThread = await Thread.findById(threadId);

        if (!originalThread) {
            throw new Error("Thread not found");
        }

        const commentThread = new Thread({
            text: commentText,
            author: userId,
            parentId: threadId,
        });

        const savedCommentThread = await commentThread.save();
        console.log(`original Thread ${originalThread.children}`);
        await Thread.findById(threadId, {
            $push: { children: savedCommentThread._id }
        })

        await originalThread.save();

        revalidatePath(path);
    } catch (err) {
        console.error("Error while adding comment:", err);
    }
}