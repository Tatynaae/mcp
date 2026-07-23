"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectEntryPoint = selectEntryPoint;
const cli_1 = require("./cli");
const telegram_1 = require("./telegram");
const chat_processor_1 = require("../ai/chat-processor");
function selectEntryPoint() {
    const args = process.argv.slice(2);
    const processor = new chat_processor_1.ChatProcessor();
    if (args.includes('--cli')) {
        return new cli_1.CliEntryPoint(processor);
    }
    else if (args.includes('--telegram')) {
        return new telegram_1.TelegramEntryPoint(processor);
    }
    else {
        throw new Error('Usage: node dist/index.js --cli | --telegram');
    }
}
;
