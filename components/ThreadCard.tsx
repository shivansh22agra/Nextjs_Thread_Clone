import { auth } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import React from "react";
interface Props {
  id: string;
  currentUserId: string | undefined;
  parentId: string | null;
  content: string;
  author: {
    name: string;
    image: string;
    id: string;
  };
  community: {
    id: string;
    name: string;
    image: string;
  } | null;
  createdAt: string;
  comments: {
    author: {
      image: string;
    };
  }[];
  isComment?: boolean;
}

function ThreadCard({
  id,
  currentUserId,
  parentId,
  content,
  author,
  community,
  createdAt,
  comments,
  isComment,
}: Props) {
  return (
    <section className="flex flex-col w-full rounded-xl bg-dark-2 p-7">
      <div className=" flex items-start justify-between">
        <div className="flex w-full flex-1 flex-row gap-4">
          <div className="flex flex-col items-center">
            <Link
              href={`/profile/${author.id}`}
              className=" relative h-11 w-11"
            >
              <Image
                src={author.image}
                alt="Profile image"
                fill
                className="rounded-full cursor-pointer"
              />
            </Link>
            {/* <div className="relative mt-2 w-0.5 grow rounded-full bg-neutral-800" /> */}
          </div>
          <div className="flex w-full flex-col">
            <Link
              href={`/profile/${author.id}`}
              className=" w-fit cursor-pointer"
            >
              {author.name}
            </Link>
            <p className="mt-2 text-light-1 text-small-regular">{content}</p>
            <div className="flex flex-col mt-5 gap-3">
              <div className="flex gap-3.5">
                <Image
                  src="/assets/heart-gray.svg"
                  alt="heart"
                  width={22}
                  height={22}
                  className="cursor-pointer"
                />
                <Link href={`/thread/${id}`}>
                  <Image
                    src="/assets/reply.svg"
                    alt="reply"
                    width={22}
                    height={22}
                    className="cursor-pointer"
                  />
                </Link>
                <Image
                  src="/assets/repost.svg"
                  alt="repost"
                  width={22}
                  height={22}
                  className="cursor-pointer"
                />
                <Image
                  src="/assets/share.svg"
                  alt="share"
                  width={22}
                  height={22}
                  className="cursor-pointer"
                />{" "}
              </div>
              {isComment && comments.length > 0 && (
                <div>
                  <p className="mt-1 text-subtle-medium">{comments.length} replies</p>
                  <Link href={`/thread/${id}`}>
                    {comments.map((comment) => {
                      return <div> {comment.author.image}</div>;
                    })}
                  </Link>
                </div>
              )}
            </div>{" "}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ThreadCard;
