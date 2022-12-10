# プロジェクトの作成と起動
## プロジェクト作成
プロジェクト名chatでアプリケーションを作成しましょう  
```bash
$ mix phx.new chat
```
依存関係のinstallはYを選択してください  
```bash
> Fetch and install dependencies? [Yn]
```


## 起動
### DB起動
DBがないと `mix ecto.create` が失敗するので、DB起動しておきましょう  
プロジェクトのルートディレクトリで下記コマンドを実行してください  
```bash
$ docker-compose up -d
```

### サーバ起動
下記を実行した後、Browserで下記にアクセスすると画面が表示されます  
http://localhost:4000/
```bash
$ cd chat
$ mix ecto.create
$ mix phx.server
```

# 参考
公式ドキュメントは下記を参照してください  
https://hexdocs.pm/phoenix/up_and_running.html