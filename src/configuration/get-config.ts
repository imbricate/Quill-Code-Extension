/**
 * @author WMXPY
 * @namespace Configuration
 * @description Get Config
 */

import * as vscode from "vscode";

export enum CONFIG_KEY {

    GOOGLE_API_KEY = "apiKey.google",
    GOOGLE_MODEL = "model.google",
}

export const getConfiguration = (configKey: CONFIG_KEY): string => {

    const configuration: vscode.WorkspaceConfiguration =
        vscode.workspace.getConfiguration("imbricateQuill");

    const result: string | undefined = configuration.get(configKey);

    if (typeof result === "string") {
        return result;
    }

    return "";
};
