import { z } from "zod";
import { revalidatePath, unstable_cache } from "next/cache";
import { QueryReturnDataOrError } from "./types";
import "server-only";

export const createServerProcedure = <Context extends object>(createOpts: {
  handleError: (e: any) => string;
  ctx?: () => Promise<Context>;
}) => {
  return {
    query: <IV, Data>(
      fn: (ctx: Context, input?: IV) => Promise<Data>,
      tag: string,
      revalidate?: number
    ) => {
      return {
        query: async (
          clientInput?: IV
        ): Promise<QueryReturnDataOrError<Data>> => {
          try {
            const ctx = (await createOpts.ctx?.()) ?? ({} as Context);
            const cachedFn = unstable_cache(fn, undefined, {
              revalidate: revalidate ?? 30,
              tags: [tag],
            });
            const data = await cachedFn(ctx, clientInput);
            return {
              data,
              error: undefined,
            };
          } catch (e) {
            return {
              data: undefined,
              error: createOpts.handleError(e),
            };
          }
        },
        revalidate: async () => {
          // console.log("revalidating tag", tag);
          revalidatePath(tag);
        },
      };
    },
    mutation: <IV extends z.ZodTypeAny, Data>({
      input,
      fn,
    }: {
      input?: IV;
      fn: (input: z.input<IV>, ctx: Context) => Promise<Data>;
    }) => {
      return {
        mutate: async (clientInput?: z.input<IV>) => {
          try {
            const inputVal = input ? input : (z.undefined() as IV);
            const parsedInput = inputVal.safeParse(clientInput);

            if (!parsedInput.success) {
              const fieldErrors = parsedInput.error.flatten()
                .fieldErrors as Partial<
                Record<keyof z.input<typeof inputVal>, string[]>
              >;

              return {
                validationError: fieldErrors,
                data: undefined,
                error: undefined,
              };
            }

            const ctx = (await createOpts.ctx?.()) ?? ({} as Context);

            const data = await fn(parsedInput.data, ctx);
            return {
              data,
              validationError: undefined,
              error: undefined,
            };
          } catch (e: any) {
            //TODO: handle errors
            return {
              data: undefined,
              validationError: undefined,
              error: createOpts.handleError(e),
            };
          }
        },
      };
    },
  };
};
