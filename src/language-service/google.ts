/**
 * @author WMXPY
 * @namespace LanguageService
 * @description Google
 */

import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import { IQuillLanguageService } from "./service";

export class GoogleLanguageService implements IQuillLanguageService {

    public static create(
        apiKey: string,
    ): GoogleLanguageService {

        return new GoogleLanguageService(apiKey);
    }

    public readonly serviceName: string = "Google";

    private readonly _apiKey: string;

    private constructor(
        apiKey: string,
    ) {

        this._apiKey = apiKey;
    }

    public async executePrompt(
        prompt: string,
    ): Promise<string> {

        const ai = new GoogleGenerativeAI(this._apiKey);
        const model = ai.getGenerativeModel({
            model: "gemini-1.5-pro",
        });

        const generationConfig = {
            temperature: 1,
            topK: 0,
            topP: 0.95,
            maxOutputTokens: 8192,
        };

        const safetySettings = [
            {
                category: HarmCategory.HARM_CATEGORY_HARASSMENT,
                threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
            },
            {
                category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
                threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
            },
            {
                category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
                threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
            },
            {
                category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
                threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
            },
        ];

        const chat = model.startChat({
            generationConfig,
            safetySettings,
            history: [],
        });

        const result = await chat.sendMessage(prompt);
        const response = result.response;

        return response.text();
    }
}
