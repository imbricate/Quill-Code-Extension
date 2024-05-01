/**
 * @author WMXPY
 * @description Extension
 */

import * as vscode from "vscode";
import { registerOperations } from "./register";

export const activate = async (context: vscode.ExtensionContext) => {

	console.log("Imbricate Quill Activities");

	await registerOperations(
		context,
	);
};

export const deactivate = () => {

	console.log("Imbricate Quill Deactivated");
};
