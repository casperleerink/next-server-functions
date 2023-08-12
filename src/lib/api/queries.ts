import { wait } from "../utils";
import { protectedProcedure, publicProcedure } from "./procedures";

export const queries = {
  date: publicProcedure.query(async () => {
    await wait(100);
    console.log("new date!");
    return { datum: new Date().toISOString() };
  }, "date"),
};
