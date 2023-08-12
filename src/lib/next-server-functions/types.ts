import type { z } from "zod";

// CLIENT

export type Mutation<IV extends z.ZodTypeAny, Data> = (
  input: z.input<IV>
) => Promise<{
  data?: Data;
  serverError?: string;
  validationError?: Partial<Record<keyof z.input<IV>, string[]>>;
}>;

// export type Mutation<IV extends z.ZodTypeAny, Data> = (
//   input: z.input<IV>
// ) => Promise<{
//   data?: Data;
//   serverError?: true;
//   validationError?: Partial<Record<keyof z.input<IV>, string[]>>;
// }>;

export type ProcedureReturn<IV extends z.ZodTypeAny, Data> = {
  query: Mutation<IV, Data>;
  // mutation: Mutation<IV, Data>;
};

export type QueryReturnDataOrError<Data> = {
  data: Data | undefined;
  error: string | undefined;
};
/**
 * Type of the function that executes server code when defining a new safe action.
 */
export type ActionServerFn<
  IV extends z.ZodTypeAny,
  Data,
  Context extends object
> = (parsedInput: z.input<IV>, ctx: Context) => Promise<Data>;
