/**
 * @author WMXPY
 * @namespace Command
 * @description Execute Prompt
 */

import * as vscode from "vscode";
import { IQuillLanguageService } from "../language-service/service";
import { IQuillPrompt } from "../prompt/prompt";

export const ExecutePromptCommand: string = "quill.prompt.execute";

export const registerExecutePromptCommand = (): vscode.Disposable => {

    const disposable = vscode.commands.registerCommand(ExecutePromptCommand, async (
        languageService: IQuillLanguageService,
        prompt: IQuillPrompt,
        range: vscode.Range,
        replace: boolean,
    ) => {

        const editor: vscode.TextEditor | undefined =
            vscode.window.activeTextEditor;

        if (!editor) {
            return;
        }

        const document: vscode.TextDocument = editor.document;

        const inputText: string = document.getText(range).trim();
        const promptText: string = prompt.getPrompt(inputText);

        const output: string = await languageService.executePrompt(promptText);

        if (replace) {
            editor.edit((builder: vscode.TextEditorEdit) => {
                builder.replace(range, output);
            });
            return;
        }

        const newLineOutput: string = `\n${output}\n`;
        const lines: string[] = newLineOutput.split("\n");

        const newSelectionStart: vscode.Position = new vscode.Position(
            range.end.line + 1,
            0,
        );

        const newRange: vscode.Range = new vscode.Range(
            newSelectionStart,
            range.end.translate(lines.length - 1),
        );

        const newSelection = new vscode.Selection(
            newRange.start.line,
            newRange.start.character,
            newRange.end.line,
            newRange.end.character,
        );

        editor.edit((builder: vscode.TextEditorEdit) => {

            builder.insert(
                range.end,
                newLineOutput,
            );
        });

        editor.selection = newSelection;
    });

    return disposable;
};
