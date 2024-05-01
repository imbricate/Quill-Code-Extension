/**
 * @author WMXPY
 * @namespace LanguageService
 * @description Create
 */

import * as vscode from "vscode";
import { GoogleLanguageService } from "./google";
import { IQuillLanguageService } from "./service";

export const createQuillLanguageServices = (): IQuillLanguageService[] => {

    const services: IQuillLanguageService[] = [];

    const configuration: vscode.WorkspaceConfiguration =
        vscode.workspace.getConfiguration("imbricateQuill");

    const googleApiKey: string | undefined = configuration.get("apiKey.google");
    if (typeof googleApiKey === "string" && googleApiKey.length > 0) {
        services.push(
            GoogleLanguageService.create(
                googleApiKey,
            ),
        );
    }

    return services;
};
