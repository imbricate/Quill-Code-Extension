/**
 * @author WMXPY
 * @namespace LanguageService
 * @description Service
 */

export interface IQuillLanguageService {

    executePrompt(
        prompt: string,
    ): string;
}
