import type { AIEntryPointInterface } from "./interface";
import type { ChatProcessor } from "../ai/chat-processor";

export class CliEntryPoint implements AIEntryPointInterface {

    constructor(private readonly processor: ChatProcessor) {}

    run() {
        console.log("CLI mode started");
    }
};