import React from "react";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { fetchUser } from "@/lib/actions/user.actions";
import PostThread from "@/app/api/postThread";
async function CreateThread() {
  const user = await currentUser();
  if (!user) return null;
  const userinfo = await fetchUser(user.id);
  console.log(`__User ${userinfo}`);

  if (!userinfo?.onboarded) redirect("/onBoarding");

  return (
    <div className="text-light-1">
      CreateThread
      <PostThread userid={userinfo?._id} />
    </div>
  );
}

export default CreateThread;
