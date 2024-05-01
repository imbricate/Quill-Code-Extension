/**
 * @author WMXPY
 * @namespace LanguageService
 * @description Service
 */

export interface IQuillLanguageService {

    readonly serviceName: string;

    executePrompt(
        prompt: string,
    ): Promise<string>;
}
