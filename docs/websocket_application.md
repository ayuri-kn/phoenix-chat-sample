
# Websocketを使ってChatアプリを作ってみる
今回はBrowser上で入力したTextが別Browser上でも表示されるような、簡単なChatアプリを作成します

## ServerSide実装
アプリケーションディレクトリで下記コマンドを実行してみましょう  
これはsocket handlerを追加するコマンドになります  
```bash
$ mix phx.gen.socket User
```

Mixコマンドの実行後に [lib/chat_web/channels/user_socket.ex](../chat/lib/chat_web/channels/user_socket.ex)ファイルが追加されました  
このファイルの中に次の記述があるので、このコメントアウトを外しましょう  
```elixir
channel "room:*", ChatWeb.RoomChannel
```

socketリクエストを受けとるためにはエンドポイントの定義が必要です  
[lib/chat_web/endpoint.ex](../chat/lib/chat_web/endpoint.ex)ファイルに下記を追加します  
socket "/live"の指定の上あたりに追加してみましょう  
```elixir
    socket "/socket", ChatWeb.UserSocket,
      websocket: true,
      longpoll: false
```

接続したsocketに流されてくるリクエストを処理するため、Channelを追加しましょう  
```bash
$ mix phx.gen.channel Room
```
追加された[lib/chat_web/channels/room_channel.ex](../chat/lib/chat_web/channels/room_channel.ex)ファイルを参照してみます  
`handle_in` とありますが、これが受け取ったrequestを処理する部分になります  
このファイルに下記を追加してみましょう  
```elixir
  def handle_in("new_msg", %{"body" => body}, socket) do
    broadcast!(socket, "new_msg", %{body: body})
    {:noreply, socket}
  end
```

ServerSideの処理はこれで完了です！

## Client実装
[assets/js/app.js](../chat/assets/js/app.js)ファイルを開くと user_socket.js のimport部がコメントアウトされていますので、このコメントを外しておきましょう  
```javascript
import "./user_socket.js"
```

Chatとしては入力欄が必要です  
[lib/chat_web/templates/page/index.html.heex](../chat/lib/chat_web/templates/page/index.html.heex)ファイルに下記の2行を適当に加えてみましょう  
```html
<div id="messages" role="log" aria-live="polite"></div>
<input id="chat-input" type="text">
```

次に[assets/js/user_socket.js](../chat/assets/js/user_socket.js)ファイルを開きます  
まず、defaultで設定されているchannel定義は一旦コメントアウトしておきます  
```javascript
let channel = socket.channel("room:42", {})
```

その下に下記を追加しましょう  
```javascript
let channel           = socket.channel("room:lobby", {})
let chatInput         = document.querySelector("#chat-input")
let messagesContainer = document.querySelector("#messages")

chatInput.addEventListener("keypress", event => {
  if(event.key === 'Enter'){
    channel.push("new_msg", {body: chatInput.value})
    chatInput.value = ""
  }
})

// 画面表示テスト用
channel.on('new_msg', (payload) => {
  const msgItem = document.createElement('li');
  msgItem.innerText = `[${Date()}] ${payload.body}`;
  messagesContainer.appendChild(msgItem);
});
```

これでClient側の準備も完了です  
下記コマンドにて再度起動します  
```bash
$ mix phx.server
```

http://localhost:4000/ でbrowser(tab)を2つ起動し、text fieldに文字列を入力していただくと、別browserに配信されているのがわかると思います

# D3 Collisionサンプルの追加
これは簡単な説明になりますが、下記ファイルを追加,修正しています  
下記対応後に `mix phx.server` で起動してください  
- [assets/js/d3_collision_sample.js](../chat/assets/js/d3_collision_sample.js) の追加
- [assets/js/app.js](../chat/assets/js/app.js#L15) の修正  
`import "./d3_collision_sample.js"` の追記
- [lib/chat_web/templates/page/index.html.heex](../chat/lib/chat_web/templates/page/index.html.heex#L46) の修正  
下記の追記  
```html
<section class="row">
  <h2>Channel Sample</h2>
  <div>
    <script src="https://d3js.org/d3.v3.min.js"></script>
  </div>
</section>
```
- [lib/chat_web/channels/room_channel.ex](../chat/lib/chat_web/channels/room_channel.ex#L20) の修正  
下記の追記  
```elixir
  def handle_in("move", %{"x" => x, "y" => y}, socket) do
    broadcast!(socket, "move", %{x: x, y: y})
    {:noreply, socket}
  end
```

# 参考
公式ドキュメントは下記を参照してください  
https://hexdocs.pm/phoenix/channels.html#client-libraries