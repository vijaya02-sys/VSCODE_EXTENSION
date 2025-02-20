
const vscode = require('vscode');
const axios = require('axios');
const { XMLParser } = require("fast-xml-parser");

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 * 
 * PUBLISHER ID: 
 TEMPVSCODEEXTENSION
 * 
 * PERSONAL ACCESS TOKEN
 7FK5uWhwrG1OqiUForiw9IC69ovLEchteTJ6fvaEPflRrCUBbtX7JQQJ99BBACAAAAAAAAAAAAASAZDO2aDr
 */
async function activate(context) {

    const res = await axios.get("https://blog.webdevsimplified.com/rss.xml");
	const parser = new XMLParser();
	const articles = parser.parse(res.data).rss.channel.item.map
		(article => {
		return {
			label: article.title,
			detail: article.description,
			link: article.link,
	       }
		});
    console.log(articles);
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('tempo-extension.googleLogin',
		async function () {
			const article = await vscode.window.showQuickPick(articles, {
				matchOnDetail: true
			})

			if (article == null) return
			vscode.env.openExternal(article.link)
		}
	);

    context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
}