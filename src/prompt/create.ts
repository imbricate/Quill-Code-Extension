/**
 * @author WMXPY
 * @namespace Prompt
 * @description Create
 */

import { GrammarAndFormatPrompt } from "./grammar-and-format";
import { IQuillPrompt } from "./prompt";

export const createQuillPrompts = (): IQuillPrompt[] => {

    const prompts: IQuillPrompt[] = [];

    prompts.push(GrammarAndFormatPrompt.create());

    return prompts;
};
