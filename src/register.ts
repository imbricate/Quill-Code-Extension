/**
 * @author WMXPY
 * @namespace Command
 * @description Register
 */

import * as vscode from "vscode";
import { PromptActionProvider } from "./prompt-action-provider/provider";

export const registerOperations = async (
    context: vscode.ExtensionContext,
): Promise<void> => {

    const promptActionProvider = vscode.languages.registerCodeActionsProvider(
        "markdown",
        PromptActionProvider.create(),
        {
            providedCodeActionKinds: PromptActionProvider.providedCodeActionKinds,
        },
    );
    context.subscriptions.push(promptActionProvider);
};
