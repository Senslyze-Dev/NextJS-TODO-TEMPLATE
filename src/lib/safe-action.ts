import { DEFAULT_SERVER_ERROR, createSafeActionClient } from "next-safe-action";
import { auth } from "@clerk/nextjs/server";

class CustomError extends Error {}

export const authenticatedAction = createSafeActionClient({
  async middleware() {
    const { userId } = auth();
    console.log("userId:", userId);

    if (!userId) {
      throw new CustomError("Unauthenticated user!");
    }

    return { userId };
  },
  handleReturnedServerError(e) {
    if (e instanceof CustomError) {
      return e.message;
    }

    return DEFAULT_SERVER_ERROR;
  },
});
