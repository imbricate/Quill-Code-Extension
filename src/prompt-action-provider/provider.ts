/**
 * @author WMXPY
 * @namespace PromptActionProvider
 * @description Provider
 */

import * as vscode from "vscode";
import { ExecutePromptCommand } from "../commands/execute-prompt";
import { IQuillLanguageService } from "../language-service/service";
import { IQuillPrompt } from "../prompt/prompt";
import { calculateSelectedSize } from "../util/select-size";

export class PromptActionProvider implements vscode.CodeActionProvider {

    public static readonly providedCodeActionKinds = [
        vscode.CodeActionKind.QuickFix,
    ];

    public static create(
        languageServices: IQuillLanguageService[],
        prompts: IQuillPrompt[],
    ): PromptActionProvider {

        return new PromptActionProvider(languageServices, prompts);
    }

    private readonly _languageServices: IQuillLanguageService[];
    private readonly _prompts: IQuillPrompt[];

    private constructor(
        languageServices: IQuillLanguageService[],
        prompts: IQuillPrompt[],
    ) {

        this._languageServices = languageServices;
        this._prompts = prompts;
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
            this._createQuickFixAction(
                document,
                range,
                this._languageServices[0],
                this._prompts[0],
            ),
        ];

        return actions;
    }

    private _createQuickFixAction(
        document: vscode.TextDocument,
        range: vscode.Range,
        languageService: IQuillLanguageService,
        prompt: IQuillPrompt,
    ): vscode.CodeAction {

        const action = new vscode.CodeAction(
            `${prompt.actionName} (${languageService.serviceName})`,
            vscode.CodeActionKind.QuickFix,
        );

        action.isPreferred = true;

        action.command = {
            command: ExecutePromptCommand,
            title: "Prompt",
            arguments: [
                languageService,
                prompt,
                document.getText(range),
            ],
        };

        return action;
    }
}
