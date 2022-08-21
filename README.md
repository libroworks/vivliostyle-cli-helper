# vivliostyle-cli-helper README
Vivliostyle CLIのコマンド発行を代行する機能拡張です。

https://docs.vivliostyle.org/ja/vivliostyle-cli

事前に[Node.js](https://nodejs.org/ja/)をインストールし、ターミナルからvivliostyle CLIをインストールしてください。

```
npm install -g @vivliostyle/cli
```

## Features
コマンドパレットから4つのコマンドを選択できます。previewと名の付くものはVivliostyleプレビューを表示し、buildと名の付くものはPDFを生成します。

![command pallet](docimg1.png)

また、現在エディタで開いているファイル（HTMLまたはMakrdown）を対象にするものと、vivliostyle.confg.jsの設定を対象にするものがあります。vivliostyle.config.jsでは複数ファイルを連結できます。

#### vivliostyle.config.jsの例
```
// @ts-check
const vivliostyleConfig = {
  entry: [
    // 目次の生成テスト
    // { rel: 'contents', theme: '20_genkou/_css/main.css' },
    'formattest_chap1.html',
    // 'formattest_chap2.html'
  ], 
  // toc: 'toc.html',
  // tocTitle: '目次',
  output: [
    '30_pdf/merged_output.pdf',
  ],
};

module.exports = vivliostyleConfig;
```

### プレビュー
プレビューコマンドを実行すると、Webブラウザが起動してプレビューが表示されます。HTMLやCSSファイルの更新に伴ってプレビューも更新されます。

![Preview](docimg2.png)

プレビューの表示中は、VSCodeのターミナルに「Up and running([ctrl+c] to quit)」と表示されています。ターミナルにカーソルがある状態でCtrl+Cキーを押すとプレビューを終了します。

プレビューが終了するまで他のコマンドは実行できません。

## Release Notes
### 0.0.1

Initial release of ...

