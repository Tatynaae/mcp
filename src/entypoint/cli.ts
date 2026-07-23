import type { AIEntryPointInterface } from "./interface";
import type { ChatProcessor } from "../ai/chat-processor";
import * as readline from "node:readline/promises";

export class CliEntryPoint implements AIEntryPointInterface {

    constructor(private readonly processor: ChatProcessor) {}

    async run() {
        const SESSION_ID = 'cli-session';
        console.log("CLI mode started");

        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        while (true) {
            const query = await rl.question('\nYou: ');

            if(query.trim().toLowerCase() === 'exit') {
                console.log('Bye!');
                rl.close();
                process.exit(0);
            }

            const start = Date.now();
            console.log('Thinking...');

            const response = await this.processor.processMessage(SESSION_ID, query);
            const end = Date.now();
            const durationSec = ((end - start) / 1000).toFixed(2);

            console.log(`\nAI (${durationSec} sec):\n${response.message}`);
            if(response.tools.length > 0) {
                console.log('\nTools:');

                response.tools.forEach((tool, i) => {
                    console.log(`${i+1}. ${tool.name} ${JSON.stringify(tool.arguments)}`);
                });
            }
        }
    }
};