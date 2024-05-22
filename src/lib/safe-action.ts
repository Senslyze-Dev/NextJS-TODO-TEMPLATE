import { DEFAULT_SERVER_ERROR, createSafeActionClient } from "next-safe-action";
import { auth } from "@clerk/nextjs/server";
import { unstable_cache as cache } from "next/cache";

class CustomError extends Error {}

export const authenticatedAction = createSafeActionClient({
  async middleware() {
    const userId = cache(async () => {
      const { userId } = auth();
      console.log("userId: ", userId);
      return userId;
    });
    if (!userId) {
      throw new CustomError("Unauthorized user!");
    }
  },
  handleReturnedServerError(e) {
    if (e instanceof CustomError) {
      return e.message;
    }

    return DEFAULT_SERVER_ERROR;
  },
});
