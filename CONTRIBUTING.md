# Contributing
## 必要なもの
- git
- Golang
- Node.js(npm)
## 必要な知識
- Golang
- HTML
- CSS
- TypeScript
## BlueScriptureを起動する
- リポジトリをcloneする
- TypeScriptをトランスパイルする
    1. リポジトリのルートで`npm install`を実行して必要なモジュールをインストールする
    2. `npm run build`を実行してTypeScriptファイルをトランスパイルする
- バックエンドを起動する
bluescripture.goの実行方法の例を以下に示します。
    - IDEのデバッグ機能を使う(オススメ)
    - `go run bluescripture.go`する
    - `go build bluescripture.go`し、生成された実行可能ファイルを実行
## Pull Requestを送る前に
機能増設や改善など、開発にご協力いただくことは大歓迎です。  
ですが、Pull Requestを送る前に以下の内容をご確認ください。
- 適切な単位でPull Requestしてください。一つのPull Requestで複数の事象を処理しないでください。
- Pull Requestのタイトルと説明を書いてください。「このPull Requestによって何が変わるのか」を明確にしてください。
- コードをコミット前にテストしてください。すべてのコードがきちんと動作するか確認してからPull Requestを作成してください。TypeScriptについては、当リポジトリではより円滑で安全なの開発のためにESLintを導入しています。開発時のチェックを容易にするため、IDEにもESLint拡張機能を追加することをおすすめします。Pull Requestの作成後にもGitHub ActionsによってESLintのチェックが行われますが、極力コミット前にコードをテストするよう心がけてください。
- 不要なファイルを含めないでください。特にIDEを利用した開発の際にはIDEによって生成されるアーティファクトがコミットに含まれないよう注意してください。
## ありがとうございます！
開発へのご協力に感謝します。