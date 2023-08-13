import AccountProfile from "@/components/accountProfile";
import { currentUser } from "@clerk/nextjs";
async function OnBoarding() {
  const user = await currentUser();
  const userinfo = {
    _id: user!.id,
    username: user!.username,
    name: user!.firstName,
    bio: "",
    image: "",
  };
  const userData = {
    id: user!.id,
    _id: userinfo!._id,
    username: user!.username || userinfo!.username||"",
    name: user!.firstName || userinfo!.name || "",
    bio: userinfo!.bio || "",
    image: user!.imageUrl || userinfo!.image || "",
  };
  return (
    <section className="mx-auto flex max-w-3xl flex-col justify-start px-10 py-20">
      <h1 className="text-white text-heading1-bold">OnBoarding</h1>
      <p className="mt-3 text-base-regular text-light-2">
        Complete your profile now to use the App
      </p>
      <section className="mt-9 bg-dark-2 p-10">
        <AccountProfile  user={userData} btntitle="Continue"/>
      </section>
    </section>
  );
}

export default OnBoarding;
