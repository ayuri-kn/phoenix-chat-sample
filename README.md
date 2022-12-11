# Elixir + Phoenixでチャットアプリケーションを作ってみよう 2022

# 前提環境
- macOS 12.5.1
- Elixir 1.14.1
- Erlang/OTP 25
- Phoenix 1.6.15
- Docker環境(Docker Desktopなど)

# 本リポジトリの説明
- 本リポジトリは後述する手順にて既に作成済みのリポジトリとなります
- 自環境で作成する時の参考にしてください
- [ツールのインストール手順](docs/installation.md)を実行後であれば、本リポジトリをcloneして動作を試してみることが可能です
- 下記手順にて起動してみてください
```bash
$ git clone https://github.com/ayuri-kn/phoenix-chat-sample.git
$ cd phoenix-chat-sample
## DB起動
$ docker-compose up -d
## アプリケーション起動
$ cd chat
## ecto.createは1度のみでOK
$ mix ecto.create
$ mix phx.server
```

# アプリケーションの作り方
- 下記ドキュメントを参照してください
- commitの単位はなるべく手順の単位になるよう分割してありますので、参考にしてください
   - [Webアプリケーション作成準備](docs/prep_web_application.md)
   - [WebSocketアプリケーション作成方法](docs/websocket_application.md)

# 参考
- 公式ドキュメント  
https://hexdocs.pm/phoenix/overview.html

- D3のCollisionサンプルは下記のQiita記事を参考にさせていただきました  
大変参考になりました。ありがとうございます。  
**Phoenix で WebSocket 通信をする**  
https://qiita.com/mserizawa/items/2c67031e794964f3a740