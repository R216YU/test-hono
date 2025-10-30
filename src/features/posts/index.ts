import { Hono } from "hono";
import { DeleteCommand, GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import { ScanCommand } from "@aws-sdk/client-dynamodb";
import { Post } from "../../types/Posts";
import db from "../../utils/db/dynamo-db-client";
import { TABLE_NAME } from "../../utils/db/table";

const postsHono = new Hono();

// read one✅
postsHono.get("/:id", async (c) => {
  const { id } = c.req.param();

  const cmd = new GetCommand({
    TableName: TABLE_NAME,
    Key: { id: Number(id) },
  });

  const result = await db.send(cmd);
  const item = result.Item as Post | undefined;

  return c.json({
    success: true,
    data: item || null,
  });
});

// read all✅
postsHono.get("/", async (c) => {
  const cmd = new ScanCommand({
    TableName: TABLE_NAME,
  });

  const result = await db.send(cmd);
  const items = result.Items as Post[] | undefined;
  console.log();

  return c.json({
    success: true,
    data: items || [],
  });
});

// create✅
postsHono.post("/", async (c) => {
  const req = await c.req.json();
  const { id, title } = req as Post;

  const createCmd = new PutCommand({
    TableName: TABLE_NAME,
    Item: {
      id: Number(id),
      title,
    },
  });
  await db.send(createCmd);

  const getCmd = new GetCommand({
    TableName: TABLE_NAME,
    Key: { id: Number(id) },
  });
  const result = await db.send(getCmd);

  return c.json({
    success: true,
    data: result.Item || null,
  });
});

// update ✅
postsHono.put("/:id", async (c) => {
  const { id } = c.req.param();

  const { title } = await c.req.json();

  const updateCmd = new PutCommand({
    TableName: TABLE_NAME,
    Item: {
      id: Number(id),
      title,
    },
  });
  await db.send(updateCmd);

  const getCmd = new GetCommand({
    TableName: TABLE_NAME,
    Key: { id: Number(id) },
  });
  const result = await db.send(getCmd);

  return c.json({
    success: true,
    data: result.Item || null,
  });
});

// delete ✅
postsHono.delete("/:id", async (c) => {
  const { id } = c.req.param();

  const deleteCmd = new DeleteCommand({
    TableName: TABLE_NAME,
    Key: { id: Number(id) },
  });
  await db.send(deleteCmd);

  return c.json({
    success: true,
    data: null,
  });
});

export default postsHono;
