"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatProcessor = void 0;
class ChatProcessor {
    constructor() { }
    async processMessage(sessionId, text) {
        return {
            message: `Echo: ${sessionId}: ${text}`,
            tools: []
        };
    }
}
exports.ChatProcessor = ChatProcessor;
;
