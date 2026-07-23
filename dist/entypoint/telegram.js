"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelegramEntryPoint = void 0;
class TelegramEntryPoint {
    constructor(processor) {
        this.processor = processor;
    }
    run() {
        console.log("Telegram mode started");
    }
}
exports.TelegramEntryPoint = TelegramEntryPoint;
;
