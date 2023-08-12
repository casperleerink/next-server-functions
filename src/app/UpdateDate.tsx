"use client";

import { createPost, updateDate } from "@/lib/api/actions";
import { useAction } from "@/lib/next-server-functions/hook";
import { useTransition } from "react";

export const UpdateDate = () => {
  const post = useAction(createPost);
  const [isPending, startTransition] = useTransition();
  const onSubmit = () => {
    startTransition(async () => {
      const result = await updateDate();
      console.log(result);
    });
  };
  return (
    <>
      <button
        onClick={onSubmit}
        disabled={isPending}
        className="bg-white text-stone-900 px-2 py-2 rounded-lg disabled:animate-pulse"
      >
        update date
      </button>
      <button onClick={() => post.mutate({ name: "hallo!" })}>
        Create Post
      </button>
      <div className="bg-stone-500 text-stone-50">
        {post.data?.name ?? "no data"}
      </div>
    </>
  );
};
