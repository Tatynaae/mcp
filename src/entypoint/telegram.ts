import type { AIEntryPointInterface } from "./interface";
import { ChatProcessor } from "../ai/chat-processor";

export class TelegramEntryPoint implements AIEntryPointInterface {

    constructor(private readonly processor: ChatProcessor) {}
    
    run() {
        console.log("Telegram mode started");
    }
};
