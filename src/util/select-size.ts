/**
 * @author WMXPY
 * @namespace Util
 * @description Select Size
 */

import * as vscode from "vscode";

export const calculateSelectedSize = (
    document: vscode.TextDocument,
    range: vscode.Range | vscode.Selection,
): number => {

    let length: number = 0;

    for (let i = range.start.line; i <= range.end.line; i++) {

        if (i === range.start.line && i === range.end.line) {

            length += document.lineAt(i).text.slice(
                range.start.character,
                range.end.character,
            ).length;
            continue;
        }

        if (i === range.start.line) {
            length += document.lineAt(i).text.slice(
                range.start.character,
            ).length;
            continue;
        }

        if (i === range.end.line) {
            length += document.lineAt(i).text.slice(
                0,
                range.end.character,
            ).length;
            continue;
        }

        length += document.lineAt(i).text.length;
    }

    return length;
};
