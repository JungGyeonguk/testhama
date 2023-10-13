import * as vscode from 'vscode';

import { searchLlama } from './utils/searchLlama';
// import { search } from './utils/search';
import { matchSearchPhrase } from './utils/matchSearchPhrase';

export function activate(_: vscode.ExtensionContext) {

    const provider: vscode.CompletionItemProvider = {
        // @ts-ignore
        provideInlineCompletionItems: async (document, position, context, token) => {

            const textBeforeCursor = document.getText(
                new vscode.Range(position.with(undefined, 0), position)
            );
            console.log(textBeforeCursor, "지금 텍스트!!!!!!");

            const match = matchSearchPhrase(textBeforeCursor);
            let items: any[] = [];

            if (match) {
                let rs;
                try {
                    rs = await searchLlama(match.searchPhrase);
                    // console.log("rs 결과들 ===", rs?.results);
                    if (rs) {
                        items = rs.map(item => {
                            const output = `\n${item.code}`;
                            return {
                                text: output,
                                insertText: output,
                                range: new vscode.Range(position.translate(0, output.length), position)
                            };
                        });
                    }
                } catch (err: any) {
                    vscode.window.showErrorMessage(err.toString());
                }
            }
            console.log("아이템들 = ", items);
            return {items};
        },
    };

    // @ts-ignore
    vscode.languages.registerInlineCompletionItemProvider({pattern: "**"}, provider);
}




// import * as vscode from 'vscode';

// import { search } from './utils/search';
// import { matchSearchPhrase } from './utils/matchSearchPhrase';

// export function activate(_: vscode.ExtensionContext) {

//     const provider: vscode.CompletionItemProvider = {
//         // @ts-ignore
//         provideInlineCompletionItems: async (document, position, context, token) => {

//             const textBeforeCursor = document.getText(
//                 new vscode.Range(position.with(undefined, 0), position)
//             );
//             console.log(textBeforeCursor, "지금 텍스트!!!!!!")

//             const match = matchSearchPhrase(textBeforeCursor);
//             let items: any[] = [];

//             if (match) {
//                 let rs;
//                 try {
//                     rs = await search(match.searchPhrase);
//                     if (rs) {
//                         items = rs.results.map(item => {
//                             const output = `\n${match.commentSyntax} Source: ${item.sourceURL} ${match.commentSyntaxEnd}\n${item.code}`;
//                             return {
//                                 text: output,
//                                 insertText: output,
//                                 range: new vscode.Range(position.translate(0, output.length), position)
//                             };
//                         });
//                     }
//                 } catch (err: any) {
//                     vscode.window.showErrorMessage(err.toString());
//                 }
//             }
//             return {items};
//         },
//     };

//     // @ts-ignore
//     vscode.languages.registerInlineCompletionItemProvider({pattern: "**"}, provider);
// }
