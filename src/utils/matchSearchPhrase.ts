import CSConfig from "../config";
import { window } from "vscode";


type SearchMatchResult = {
    commentSyntax: string,
    commentSyntaxEnd: string,
    searchPhrase: string,
}

/**
 * Match the giving string with search pattern
 * @param {string} input
 * @returns {SearchMatchResult | undefined} if found, return the search phrase, comment's opening and closing syntax
 */
export function matchSearchPhrase(input: string): SearchMatchResult | undefined {
    const match = CSConfig.SEARCH_PATTERN.exec(input);
    console.log("match == ", match)
    if (match && match.length > 2) {
        // ['// find binary search by javascript.', '//', 'binary search by javascript', '.', index: 0, input: '// find binary search by javascript.', groups: undefined]
        const [_, commentSyntax, searchPhrase, commentSyntaxEnd] = match;

        // @ts-ignore
        let fileType = window.activeTextEditor.document.languageId;
        console.log("파일 타입 = ", fileType);

        if (fileType === "plaintext") {
            fileType = ""
        }
        
        return {
            commentSyntax,
            commentSyntaxEnd,
            searchPhrase: `${searchPhrase} ${fileType}`
        };
    }

    return undefined;
}