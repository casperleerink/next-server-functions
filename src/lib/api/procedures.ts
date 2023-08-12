import { createServerProcedure } from "../next-server-functions";

export const publicProcedure = createServerProcedure({
  handleError: (e) => {
    return "Server error";
  },
});

export const protectedProcedure = createServerProcedure({
  ctx: async () => {
    //for example any auth logic here.
    const user = {
      id: 1,
      name: "John",
    };
    if (!user) {
      throw new Error("User not found");
    }
    return {
      user,
    };
  },
  handleError: (e) => {
    // here you can write you own custom error function.
    return "Server error";
  },
});
