//app/page.tsx
import { fetchThread } from "@/lib/actions/threads.action";
import { UserButton } from "@clerk/nextjs";
export default async function Home() {
  const result = await fetchThread(1, 30);
  console.log(`cosomidfmf ${result?.posts}`);

  return (
    <div className="text-left head-text">
      Home
      <section className="mt-9 flex flex-col gap-10">
       {result?.posts.map((posts)=>{
        return <div></div>
       })}</section>{" "}
    </div>
  );
}
