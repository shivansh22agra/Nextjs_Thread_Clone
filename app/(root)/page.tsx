//app/page.tsx
import ThreadCard from "@/components/ThreadCard";
import { fetchThread } from "@/lib/actions/threads.action";
import User from "@/lib/models/userModel";
import { UserButton, currentUser } from "@clerk/nextjs";
export default async function Home() {
  const result = await fetchThread(1, 30);
  const user = await currentUser();
  console.log(`cosomidfmf ${result?.posts}`);

  return (
    <div className="text-left head-text">
      Home
      <section className="mt-9 flex flex-col gap-10">
        {result?.posts.length === 0 ? (
          <p>No Threads found</p>
        ) : (
          <>
            {result?.posts.map((post) => {
              return (
                <ThreadCard
                key={post._id}
                id={post._id}
                currentUserId={user?.id}
                parentId={post.parentId}
                content={post.text}
                author={post.author}
                community={post.community}
                createdAt={post.createdAt}
                comments={post.children}
                />
              );
            })}
            
      {/* <Pagination
        path='/'
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        isNext={result.isNext}
      /> */}
          </>
        )}
      </section>
    </div>
  );
}
