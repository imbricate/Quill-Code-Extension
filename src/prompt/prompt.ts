/**
 * @author WMXPY
 * @namespace Prompt
 * @description Prompt
 */

export interface IQuillPrompt {

    readonly actionName: string;

    getPrompt(
        inputText: string,
    ): string;
}
