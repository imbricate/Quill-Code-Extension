/**
 * @author WMXPY
 * @namespace Command
 * @description Register
 */

import * as vscode from "vscode";
import { registerExecutePromptCommand } from "./commands/execute-prompt";
import { createQuillLanguageServices } from "./language-service/create";
import { IQuillLanguageService } from "./language-service/service";
import { PromptActionProvider } from "./prompt-action-provider/provider";
import { createQuillPrompts } from "./prompt/create";
import { IQuillPrompt } from "./prompt/prompt";

export const registerOperations = async (
    context: vscode.ExtensionContext,
): Promise<void> => {

    const languageServices: IQuillLanguageService[] = createQuillLanguageServices();
    const prompts: IQuillPrompt[] = createQuillPrompts();

    const actionProvider = PromptActionProvider.create(
        languageServices,
        prompts,
    );

    const promptActionProvider = vscode.languages.registerCodeActionsProvider(
        "markdown",
        actionProvider,
        {
            providedCodeActionKinds: PromptActionProvider.providedCodeActionKinds,
        },
    );
    context.subscriptions.push(promptActionProvider);

    const executePromptDisposable = registerExecutePromptCommand();
    context.subscriptions.push(executePromptDisposable);
};
