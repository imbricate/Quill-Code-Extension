/**
 * @author WMXPY
 * @namespace Command
 * @description Register
 */

import * as vscode from "vscode";
import { createQuillLanguageServices } from "./language-service/create";
import { IQuillLanguageService } from "./language-service/service";
import { PromptActionProvider } from "./prompt-action-provider/provider";

export const registerOperations = async (
    context: vscode.ExtensionContext,
): Promise<void> => {

    const languageServices: IQuillLanguageService[] = createQuillLanguageServices();
    const actionProvider = PromptActionProvider.create(languageServices);

    const promptActionProvider = vscode.languages.registerCodeActionsProvider(
        "markdown",
        actionProvider,
        {
            providedCodeActionKinds: PromptActionProvider.providedCodeActionKinds,
        },
    );
    context.subscriptions.push(promptActionProvider);
};
