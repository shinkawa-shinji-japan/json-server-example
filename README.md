# このディレクトリについて

[json-server](https://github.com/typicode/json-server) というライブラリを用いて API のモックを構築しています。

# 起動方法

## 1.モック API の起動

以下のコマンドを実行する

```bash
# docker-compose が使える場合
docker-compose up

# docker-compose が使えない場合
yarn
yarn watch-run
```

# フォルダ構成

- `merge.js` api-responses/ 配下の json ファイルをマージし、db.json を作成するためのスクリプト
- `mock/middleware.js` GET リクエスト以外で API 実行すると api-responses/ 配下の 対象の json ファイルがリクエストボディの値で上書きされてしまうのを防ぐために GET リクエスト以外は GET リクエストに置き換えている。ブラウザからは POST でリクエストを送っていることに変わりはない。
- `mock/response.json` このファイルに記載されているデータを json-server でモックしている。
- `mock/route.json` 特定のパスに対する値を指定のファイルのレスポンスに置き換えたいときに編集が必要。詳細は「ルーティングを設定する」を参照。
- `mock/api-responses/*.json` API のレスポンスを記載するフォルダ。詳細は「モックデータを作成・編集する」を参照。

## モックデータを作成・編集する

モックデータは `mock/api-responses/[APIのパス].json` に作成します。

例として
mock/api-responses/test.json というファイルを作成し、中身に

```json
// mock/api-responses/test.json
{ "message": "hello world" }
```

と記載すると
http://localhost:5001/test の レスポンスが
`{"message":"hello world"}`
となります。

## ルーティングを設定する

`mock/api-responses/[APIのパス].json` は階層は意識していないので、v1/test/test1 というパスに対してのモックを作りたい場合は mock/api-responses/v1/test/test1.json ではなく、 v1_test_test1.json などでファイルを作成し、 route.json で API ルートのマッピングを行ってください。

```json
// mock/route.json
{
  "/v1/test/test1": "/v1_test_test1"
}
```

※`route.json` の注意事項

ファイルの上にあるルートの方が有効になることに注意。

例えば  
「\*（アスタリスク）」があるルートで以下のように設定をしてしまうと、

```json
// mock/route.json
// NG
{
  "/v1/users*": "/users",
  "/v1/users?kind=0&*": "/special_users"
}
```

`/v1/users?kind=0&_` へのリクエストが `/v1/users`とみなされ `users.json` の値がレスポンスされてしまう。

以下のように順番を意識して書く必要がある。

```json
// mock/route.json
// OK
{
  "/v1/users?kind=0&*": "/special_users",
  "/v1/users*": "/users"
}
```

# 参考にしたサイト

https://hodalog.com/run-json-server-using-docker/  
https://github.com/yoshiyasuko/sample-api-mock
