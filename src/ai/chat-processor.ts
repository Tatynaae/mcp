export class ChatProcessor {
    constructor() {}

    async processMessage(sessionId: string, text: string): Promise<{
        message: string;
        tools: {
            name: string;
            arguments: Record<string, unknown>;
        } [];
    }> {
        return {
            message: `Echo: ${sessionId}: ${text}`,
            tools: []
        };
    }
};