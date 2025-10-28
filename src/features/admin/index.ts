import { Hono } from "hono";
import { basicAuth } from "hono/basic-auth";

const adminHono = new Hono();

// ベーシック認証
adminHono.use(basicAuth({ username: "test", password: "123" }));

adminHono.get("/*", (c) => {
  return c.text("Welcome to the admin panel");
});

export default adminHono;
