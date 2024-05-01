/**
 * @author WMXPY
 * @namespace LanguageService
 * @description Google
 */

import { IQuillLanguageService } from "./service";

export class GoogleLanguageService implements IQuillLanguageService {

    public static create(
        apiKey: string,
    ): GoogleLanguageService {

        return new GoogleLanguageService(apiKey);
    }

    private readonly _apiKey: string;

    private constructor(
        apiKey: string,
    ) {

        this._apiKey = apiKey;
    }

    public executePrompt(
        prompt: string,
    ): string {

        return prompt;
    }
}
