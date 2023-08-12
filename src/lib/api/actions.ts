"use server";

import { z } from "zod";
import { protectedProcedure } from "./procedures";
import { queries } from "./queries";
import { wait } from "../utils";

export const updateDate = protectedProcedure.mutation({
  fn: async () => {
    await wait(300);
    console.log("update date!");
    queries.date.revalidate();
    return "date updated";
  },
}).mutate;

export const createPost = protectedProcedure.mutation({
  input: z.object({
    name: z.string(),
  }),
  fn: async (input) => {
    await wait(300);
    console.log("create post!");
    return {
      id: 0,
      name: input.name,
    };
  },
}).mutate;
