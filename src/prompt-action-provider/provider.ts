/**
 * @author WMXPY
 * @namespace Prompt_Action_Provider
 * @description Provider
 */

import * as vscode from "vscode";

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
        context: vscode.CodeActionContext,
        token: vscode.CancellationToken,
    ): vscode.ProviderResult<(vscode.CodeAction | vscode.Command)[]> {

        console.log(document, range, context, token);

        return [];
    }
}
