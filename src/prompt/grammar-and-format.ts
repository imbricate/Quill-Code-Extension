/**
 * @author WMXPY
 * @namespace Prompt
 * @description Grammar and Format
 */

export const createGrammarAndFormatPrompt = (
    originalText: string,
): string => {

    return [
        "Response only with markdown result without any other text.",
        "Improve grammar and format to the following format. To make them more readable, and easier to understand.",
        originalText,
    ].join("\n");
};
