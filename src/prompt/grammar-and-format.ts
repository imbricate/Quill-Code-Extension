/**
 * @author WMXPY
 * @namespace Prompt
 * @description Grammar and Format
 */

import { IQuillPrompt } from "./prompt";

export class GrammarAndFormatPrompt implements IQuillPrompt {

    public static create(): GrammarAndFormatPrompt {

        return new GrammarAndFormatPrompt();
    }

    public readonly actionName: string = "Grammar and Format";

    private constructor() {
    }

    public getPrompt(inputText: string) {

        return [
            "Response only with markdown result without any other text.",
            "Improve grammar and format to the following format. To make them more readable, and easier to understand.",
            inputText,
        ].join("\n");
    }
}
