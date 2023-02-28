// json をマージするスクリプト
const fs = require("fs");
const path = require("path");
const outputFileName = "response.json";

// ルートパスを設定
const root = path.resolve("./", "mock");
const fixturesPath = root + "/api-responses";
const json = {};

// json ファイルの生成
fs.readdirSync(fixturesPath).reduce((api, file) => {
  if (api === undefined) api = {};

  if (path.extname(file) == ".json") {
    const endpoint = path.basename(file, path.extname(file));
    if (api[endpoint] === undefined) api[endpoint] = {};
    json[endpoint] = JSON.parse(
      fs.readFileSync(fixturesPath + "/" + file, "utf-8")
    );
  }
}, {});

// 書き込み
fs.writeFile(root + "/" + outputFileName, JSON.stringify(json), function (err) {
  if (err) throw err;
  console.log("=== Create " + root + "/" + outputFileName);
});
