/**
 * @author WMXPY
 * @namespace PromptActionProvider
 * @description Provider
 */

import * as vscode from "vscode";
import { calculateSelectedSize } from "../util/select-size";

export class PromptActionProvider implements vscode.CodeActionProvider {

    public static readonly providedCodeActionKinds = [
        vscode.CodeActionKind.QuickFix,
    ];

    public static create(): PromptActionProvider {

        return new PromptActionProvider();
    }

    private constructor() {

    }

    public provideCodeActions(
        document: vscode.TextDocument,
        range: vscode.Range | vscode.Selection,
        _context: vscode.CodeActionContext,
        _token: vscode.CancellationToken,
    ): vscode.ProviderResult<(vscode.CodeAction | vscode.Command)[]> {

        const length: number = calculateSelectedSize(document, range);

        if (length <= 2) {
            return;
        }

        const actions: vscode.CodeAction[] = [
            this._createQuickFixAction(document, range),
        ];

        return actions;
    }

    private _createQuickFixAction(
        document: vscode.TextDocument,
        range: vscode.Range,
    ): vscode.CodeAction {

        const action = new vscode.CodeAction(
            "Imbricate Quill",
            vscode.CodeActionKind.QuickFix,
        );
        action.edit = new vscode.WorkspaceEdit();
        action.edit.replace(
            document.uri,
            range,
            "Imbricate Quill",
        );

        return action;
    }
}
