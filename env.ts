import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";
 
export const env = createEnv({
  clientPrefix: "EXPO_PUBLIC",
  client: {
    EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string(),
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});