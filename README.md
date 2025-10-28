# Test Hono

Hono, DynamoDB での基本的な CRUD 操作

## DynamoDB Local

- cd docker
- docker-compose up -d
- "/"に GET リクエストを送って DB 初期化処理を実行

## エンドポイント一覧

- Posts 機能

  - [GET] /posts 全件取得
  - [GET] /posts/${id} ID 指定で取得
  - [POST] /posts:POST 作成
  - [PUT] /posts/${id} ID 指定で更新
  - [DELETE] /posts/${id} ID 指定で削除

- Admin 機能
  - /admin/\* ベーシック認証が必要なページ
