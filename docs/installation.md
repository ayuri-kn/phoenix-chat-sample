# 開発ツールのinstall
公式ドキュメントは下記を参照してください  
https://hexdocs.pm/phoenix/installation.html


## install erlang & elixir with asdf
```bash
$ brew install asdf
$ asdf plugin add erlang https://github.com/asdf-vm/asdf-erlang.git
$ asdf plugin add elixir https://github.com/asdf-vm/asdf-elixir.git
$ asdf install erlang latest
$ asdf global erlang <installed-version>
$ asdf install elixir latest
$ asdf global elixir <installed-version>
```

## install phoneix
```bash
$ mix local.hex
$ mix archive.install hex phx_new 1.6.15
```
