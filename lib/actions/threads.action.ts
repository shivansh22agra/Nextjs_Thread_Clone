import { connectToDb } from "../validations/mongoose";

interface Params {
    text: string, author: string,
    communityId: string | null,
    //
    path: string

}
export async function createThread({text,author,communityId,path }: Params) {
    try {
        connectToDb();

    } catch (e) {
        console.log(e);
    }

}