/**
 * @author WMXPY
 * @namespace LanguageService
 * @description Create
 */

import { CONFIG_KEY, getConfiguration } from "../configuration/get-config";
import { GoogleLanguageService } from "./google";
import { IQuillLanguageService } from "./service";

export const createQuillLanguageServices = (): IQuillLanguageService[] => {

    const services: IQuillLanguageService[] = [];

    const googleApiKey: string = getConfiguration(CONFIG_KEY.GOOGLE_API_KEY);
    if (googleApiKey.length > 0) {
        services.push(
            GoogleLanguageService.create(
                googleApiKey,
            ),
        );
    }

    return services;
};
