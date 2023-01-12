// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  let disposable = vscode.commands.registerCommand("vivliostyle-cli-helper.helloWorld", function () {
    // The code you place here will be executed every time your command is executed

    // Display a message box to the user
    vscode.window.showInformationMessage("Hello World from vivliostyle-cli-helper!");
    // callShell('ls');
    // callShell('vivliostyle');
    // callShell('npm list @vivliostyle/cli')
  });
  context.subscriptions.push(disposable);

  context.subscriptions.push(
    vscode.commands.registerCommand("vivliostyle-cli-helper.installCLI", function () {
      console.log(vscode.env.shell);
      if (vscode.env.shell.startsWith("C:\\")) {
        callShell("npm install -g @vivliostyle/cli");
      } else {
        callShell("sudo npm install -g @vivliostyle/cli");
      }
    })
  );
  context.subscriptions.push(
    vscode.commands.registerCommand("vivliostyle-cli-helper.previewByConfig", function () {
      callShell("vivliostyle preview");
    })
  );
  context.subscriptions.push(
    vscode.commands.registerCommand("vivliostyle-cli-helper.buildByConfig", function () {
      callShell("vivliostyle build");
    })
  );

  // このファイルをプレビュー
  context.subscriptions.push(
    vscode.commands.registerCommand("vivliostyle-cli-helper.previewThis", function () {
      const editor = vscode.window.activeTextEditor;
      if (checkEditorPath(editor) === false) return;
      // プレビューしたいパスやVSmodeを設定
      const contentpath = editor.document.fileName.replace(/^[a-z]:/, (d) => d.toUpperCase());
      console.log(contentpath);
      callShell(`vivliostyle preview "${contentpath}"`);
    })
  );

  // このファイルをビルド
  context.subscriptions.push(
    vscode.commands.registerCommand("vivliostyle-cli-helper.buildThis", function () {
      const editor = vscode.window.activeTextEditor;
      if (checkEditorPath(editor) === false) return;
      // ビルドしたいパスやVSmodeを設定
      const contentpath = editor.document.fileName;
      console.log(contentpath);
      const outputpath = contentpath.replace(/.(md|html)$/, ".pdf");
      callShell(`vivliostyle build "${contentpath}" -o "${outputpath}"`);
    })
  );

  function callShell(shellcommand) {
    const term = vscode.window.activeTerminal?.name === "vivliostyle-cli-helper" ? vscode.window.activeTerminal : vscode.window.createTerminal("vivliostyle-cli-helper");
    term.show();
    // PowerShellかつvivliostyleスクリプトの実行時のみ許可が必要
    if (vscode.env.shell.includes("powershell") && shellcommand.indexOf("vivliostyle") === 0) {
      term.sendText(`PowerShell -ExecutionPolicy RemoteSigned ${shellcommand}`);
    } else {
      term.sendText(shellcommand);
    }
  }

  function checkEditorPath(editor) {
    if (editor === null || editor === undefined) return false;
    const path = editor.document.fileName;
    if (!path) {
      vscode.window.showWarningMessage("ファイルを保存してから実行してください");
      return false;
    }
    if (!(path.endsWith(".md") || path.endsWith(".html"))) {
      vscode.window.showWarningMessage("MarkdownファイルやHTMLファイルではありません");
      return false;
    }
    return true;
  }
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
