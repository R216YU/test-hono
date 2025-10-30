import {
  BillingMode,
  CreateTableCommand,
  ListTablesCommand,
  ScanCommand,
} from "@aws-sdk/client-dynamodb";
import db from "./dynamo-db-client";
import { TABLE_NAME } from "./table";

/**
 * DBの初期化処理
 * @returns
 */
const intializeDB = async () => {
  // DBにテーブルが存在するか確認する
  try {
    const listTablesCmd = new ListTablesCommand({});
    const existingTables = await db.send(listTablesCmd);
    if (
      existingTables.TableNames &&
      existingTables.TableNames.includes(TABLE_NAME)
    ) {
      console.log(
        `テーブル ${TABLE_NAME} は既に存在します。テーブルの作成をスキップします。`
      );
      return;
    }
  } catch (error) {
    console.error("テーブル一覧取得エラー:", error);
    throw error;
  }

  // 存在しない場合はテーブルを作成する
  try {
    const createTableCmd = new CreateTableCommand({
      TableName: TABLE_NAME,
      AttributeDefinitions: [
        {
          AttributeName: "id",
          AttributeType: "N",
        },
      ],
      KeySchema: [
        {
          AttributeName: "id",
          KeyType: "HASH",
        },
      ],
      BillingMode: BillingMode.PAY_PER_REQUEST,
    });

    const response = await db.send(createTableCmd);
    console.log("テーブル作成成功:", response);
  } catch (error) {
    console.error("テーブル作成エラー:", error);
    throw error;
  }

  // テーブル内のレコードを取得して確認する
  try {
    const scanCmd = new ScanCommand({
      TableName: TABLE_NAME,
    });
    const scanResult = await db.send(scanCmd);
    console.log("テーブルデータ取得成功:", scanResult.Items);
  } catch (error) {
    console.error("テーブルデータ取得エラー:", error);
    throw error;
  }
};

export default intializeDB;
