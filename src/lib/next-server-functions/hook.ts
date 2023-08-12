import { useMemo, useRef, useState } from "react";
import type { Mutation } from "./types";
import { z } from "zod";

export const useAction = <IV extends z.ZodTypeAny, Data>(
  fn: Mutation<IV, Data>
) => {
  const action = useRef(fn);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [data, setData] = useState<Data | null>(null);
  const mutate = useMemo(
    () => async (input: z.input<IV>) => {
      setIsLoading(true);
      setErr(null);
      setData(null);

      const result = await action.current(input);
      if (result.validationError) {
        //TODO: some way to handle validation errors either here on in procedure itself.
        setErr("validation error");
      }
      if (result.serverError) {
        setErr(result.serverError);
      }
      setData(result.data ?? null);
      setIsLoading(false);
      return result.data;
    },
    []
  );

  return {
    mutate,
    isLoading,
    err,
    data,
  };
};
