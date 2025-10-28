import { Hono } from "hono";
import postsHono from "./features/posts";
import adminHono from "./features/admin";
import intializeDB from "./utils/db/init-db";

const app = new Hono();

// Initialize DB on root route
app.get("/", async (c) => {
  let response;

  try {
    await intializeDB();
    response = c.json({ success: true, message: "DB initialized" });
  } catch (error) {
    response = c.json({
      success: false,
      message: "DB initialization failed",
      error: error instanceof Error ? error.message : String(error),
    });
    c.status(500);
  }

  return response;
});

// Route modules
app.route("/posts", postsHono);
app.route("/admin", adminHono);

export default app;
